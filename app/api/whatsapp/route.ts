import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'blitz_webhook_2025'
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || ''
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_ID || ''

const STRIKER_SYSTEM = `Eres STRIKER, el agente de ventas de Blitz. Tu misión es convertir visitantes en clientes agendando una llamada con el equipo.

SOBRE BLITZ:
Blitz es una empresa salvadoreña que construye páginas web con agentes de inteligencia artificial para negocios. No vendemos solo páginas web — vendemos sistemas que trabajan por el negocio las 24 horas.
WhatsApp: +503 7910 2453

CASO DE ÉXITO REAL:
Ferreterías Lemus — 20 sucursales en El Salvador. Les construimos su tienda en línea con Next.js 15, agente IA con Claude y pagos con Wompi.

LOS 5 AGENTES DE BLITZ:
- STRIKER: Atiende clientes y califica leads. Setup $200 + $45/mes
- HERALD: Secretario virtual, agenda citas. Setup $300 + $60/mes
- SIGNAL: Contenido para redes con IA. Setup $250 + $80/mes
- ORACLE: Dashboard y reportes. Setup $350 + $70/mes
- APEX: Todos los agentes integrados. Setup $800 + $250/mes

OBJECIONES COMUNES:
"Es muy caro": El agente reemplaza el costo de perder clientes. Si perdés 2 clientes al mes ya perdiste más de lo que cuesta.
"No sé si funciona": Si tenés clientes, funciona. Ferreterías Lemus con 20 sucursales ya lo usa.
"Ya tengo web": Una página estática no vende sola. Los agentes trabajan 24/7 convirtiendo visitantes en clientes.

TU PERSONALIDAD:
- Directo, confiado, casual salvadoreño
- Máximo 3 oraciones por respuesta
- Siempre termina invitando a agendar llamada
- NUNCA inventes capacidades que no existen
- NUNCA pegues URLs largas

OBJETIVO: Que el cliente agande una llamada. Cuando muestre interés decí:
"¡Perfecto! Escribinos al +503 7910 2453 con 'quiero agendar' y coordinamos. En 30 min te explicamos todo sin compromiso."`

const conversations = new Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>()

async function sendWhatsAppMessage(to: string, message: string) {
  const res = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    }),
  })
  if (!res.ok) throw new Error(`WhatsApp API error: ${res.status}`)
  return res.json()
}

async function getStrikerResponse(text: string, phone: string): Promise<string> {
  if (!conversations.has(phone)) conversations.set(phone, [])
  const history = conversations.get(phone)!
  history.push({ role: 'user', content: text })
  const recent = history.slice(-10)

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    system: STRIKER_SYSTEM,
    messages: recent,
  })

  const reply = response.content[0].type === 'text' ? response.content[0].text : 'Error.'
  history.push({ role: 'assistant', content: reply })
  return reply
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    console.log('Raw body:', rawBody)

    if (!rawBody || rawBody.trim() === '') {
      return NextResponse.json({ status: 'empty body' }, { status: 200 })
    }

    const body = JSON.parse(rawBody)

    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
    if (!message || message.type !== 'text') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const from = message.from
    const userText = message.text.body
    const reply = await getStrikerResponse(userText, from)
    await sendWhatsAppMessage(from, reply)

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ status: 'error' }, { status: 200 })
  }
}
