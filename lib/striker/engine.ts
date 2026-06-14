import Anthropic from '@anthropic-ai/sdk'
import { StrikerConfig, ConversationState, LeadStage, IncomingMessage } from './types'

const client = new Anthropic()

const memory = new Map<string, ConversationState>()

function memKey(msg: IncomingMessage) {
  return `${msg.clientId}:${msg.channel}:${msg.senderId}`
}

function getOrCreate(msg: IncomingMessage): ConversationState {
  const key = memKey(msg)
  if (!memory.has(key)) {
    memory.set(key, {
      clientId: msg.clientId,
      channel: msg.channel,
      history: [],
      stage: 'nuevo',
      cartItems: [],
      lastSeen: Date.now(),
      messageCount: 0,
      notificationSent: false,
    })
  }
  const state = memory.get(key)!
  state.lastSeen = Date.now()
  state.messageCount++
  return state
}

export function cleanMemory() {
  const cutoff = Date.now() - 48 * 60 * 60 * 1000
  for (const [key, state] of memory.entries()) {
    if (state.lastSeen < cutoff) memory.delete(key)
  }
}

function buildSystemPrompt(config: StrikerConfig, state: ConversationState): string {
  const toneGuide = {
    formal: 'Hablás de manera profesional y formal. Usás "usted".',
    casual: 'Hablás de manera amigable y cercana. Usás "vos".',
    salvadoreño: 'Hablás como salvadoreño — usás "vos", "mirá", "perfecto", "mae" cuando aplica. Directo y con energía.',
  }[config.tone]

  const availableProducts = config.products.filter((p) => p.available)
  const catalogText = availableProducts.length > 0
    ? `\nPRODUCTOS / SERVICIOS DISPONIBLES:\n${availableProducts.map((p) => `• ${p.name} — $${p.price} ${p.currency}\n  ${p.description}`).join('\n')}`
    : ''

  const upsellText = config.upsells.length > 0
    ? `\nUPSELLS (ofrecé estos cuando corresponda):\n${config.upsells.map((u) => {
        const trigger = config.products.find((p) => p.id === u.triggerProductId)?.name
        const suggest = config.products.find((p) => p.id === u.suggestProductId)?.name
        return `• Si mencionan ${trigger} → sugerí ${suggest}: "${u.message}"`
      }).join('\n')}`
    : ''

  const leadContext = [
    state.leadName ? `Nombre: ${state.leadName}` : null,
    state.leadBusiness ? `Negocio: ${state.leadBusiness}` : null,
    state.cartItems.length > 0 ? `Productos de interés: ${state.cartItems.join(', ')}` : null,
  ].filter(Boolean).join('\n')

  const stageGuide: Record<LeadStage, string> = {
    nuevo: 'Saludá con energía, presentate brevemente, preguntá el nombre y en qué podés ayudar.',
    explorando: 'Ya sabés su nombre. Identificá qué necesita exactamente — hacé preguntas concretas.',
    calificado: 'Sabés el problema. Presentá la solución exacta con precio. Un producto, un beneficio claro.',
    agendado: `Confirmá el contacto y cerrá positivo. Recordá el número: ${config.ownerWhatsApp}`,
    cerrado: 'La venta está cerrada. Si tienen más preguntas, atendé con positivismo.',
  }

  return `Sos ${config.agentName}, el agente de atención de ${config.businessName}.

${toneGuide}

SOBRE EL NEGOCIO:
${config.about}
${config.location ? `Ubicación: ${config.location}` : ''}
${config.hours ? `Horario: ${config.hours}` : ''}
${catalogText}
${upsellText}

ETAPA ACTUAL DEL CLIENTE: ${state.stage}
INSTRUCCIÓN PARA ESTA ETAPA: ${stageGuide[state.stage]}
${leadContext ? `\nINFO DEL CLIENTE:\n${leadContext}` : ''}

CUANDO EL CLIENTE QUIERA COMPRAR O AGENDAR:
Decí exactamente: "¡Perfecto! Escribinos al ${config.ownerWhatsApp} con 'quiero comprar/agendar' y te atendemos de inmediato."

REGLAS ABSOLUTAS:
✓ Máximo 3 oraciones por respuesta
✓ Terminá siempre con pregunta o llamado a acción
✓ Nunca inventés productos, precios o capacidades
✓ Si no sabés algo, decí "Déjame consultarlo con el equipo"
✓ Nunca pegués URLs largas
✓ Si preguntan precio, dalo directo sin rodeos`
}

function extractLeadInfo(text: string, state: ConversationState): void {
  if (!state.leadName) {
    const match = text.match(/(?:soy|me llamo|mi nombre es)\s+([A-ZÁÉÍÓÚ][a-záéíóú]+)/i)
    if (match) state.leadName = match[1]
  }
  if (!state.leadBusiness) {
    const match = text.match(/(?:tengo|trabajo en|dueño de|mi negocio|empresa de)\s+([^.,!?\n]+)/i)
    if (match) state.leadBusiness = match[1].trim()
  }
}

function detectStage(reply: string, current: LeadStage, config: StrikerConfig): LeadStage {
  if (current === 'agendado' || current === 'cerrado') return current
  const lower = reply.toLowerCase()
  if (lower.includes(config.ownerWhatsApp) || lower.includes('quiero comprar') || lower.includes('quiero agendar')) return 'agendado'
  if (lower.includes('$') || lower.includes('precio') || lower.includes('te recomiendo')) return 'calificado'
  if (lower.includes('qué necesitás') || lower.includes('contame') || lower.includes('cuéntame')) return 'explorando'
  return current
}

function detectCartItems(text: string, config: StrikerConfig, state: ConversationState): void {
  for (const product of config.products) {
    const nameLower = product.name.toLowerCase()
    if (text.toLowerCase().includes(nameLower) && !state.cartItems.includes(product.name)) {
      state.cartItems.push(product.name)
    }
  }
}

const rateLimits = new Map<string, number[]>()

export function isRateLimited(id: string, maxPerMinute = 10): boolean {
  const now = Date.now()
  const timestamps = (rateLimits.get(id) || []).filter((t) => now - t < 60_000)
  if (timestamps.length >= maxPerMinute) return true
  timestamps.push(now)
  rateLimits.set(id, timestamps)
  return false
}

async function notifyOwner(config: StrikerConfig, state: ConversationState): Promise<void> {
  if (state.notificationSent) return
  state.notificationSent = true

  const leadSummary = [
    state.leadName ? `Nombre: ${state.leadName}` : 'Nombre: desconocido',
    state.leadBusiness ? `Negocio: ${state.leadBusiness}` : '',
    state.cartItems.length > 0 ? `Interesado en: ${state.cartItems.join(', ')}` : '',
    `Canal: ${state.channel}`,
  ].filter(Boolean).join('\n')

  const message = `🔔 *Nuevo lead calificado — ${config.businessName}*\n\n${leadSummary}\n\n_STRIKER los está esperando en ${state.channel}_`

  if ((config.notificationMethod === 'whatsapp' || config.notificationMethod === 'both') && process.env.WHATSAPP_TOKEN) {
    try {
      await fetch(`https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messaging_product: 'whatsapp', to: config.ownerWhatsApp.replace(/[^0-9]/g, ''), type: 'text', text: { body: message } }),
      })
    } catch (err) { console.error('Error WhatsApp notif:', err) }
  }

  if ((config.notificationMethod === 'email' || config.notificationMethod === 'both') && process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'STRIKER <striker@blitzdigital.online>', to: config.ownerEmail, subject: `🔔 Nuevo lead — ${config.businessName}`, text: message.replace(/\*/g, '').replace(/_/g, '') }),
      })
    } catch (err) { console.error('Error email notif:', err) }
  }
}

export async function processMessage(msg: IncomingMessage, config: StrikerConfig): Promise<string> {
  const state = getOrCreate(msg)

  extractLeadInfo(msg.text, state)
  detectCartItems(msg.text, config, state)

  state.history.push({ role: 'user', content: msg.text })
  const recentHistory = state.history.slice(-20)

  let reply: string
  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 350,
      system: buildSystemPrompt(config, state),
      messages: recentHistory,
    })
    reply = response.content[0].type === 'text'
      ? response.content[0].text
      : `Disculpá, tuve un problema. Escribinos directo al ${config.ownerWhatsApp}.`
  } catch (err) {
    console.error('Error Claude:', err)
    reply = `Disculpá, tuve un problema técnico. Escribinos al ${config.ownerWhatsApp} y te atendemos de inmediato.`
  }

  state.history.push({ role: 'assistant', content: reply })
  state.stage = detectStage(reply, state.stage, config)

  if ((state.stage === 'calificado' || state.stage === 'agendado') && !state.notificationSent) {
    notifyOwner(config, state).catch(console.error)
  }

  if (Math.random() < 0.005) cleanMemory()

  return reply
}
