import { NextRequest, NextResponse } from 'next/server'

interface OnboardingPayload {
  negocio: string
  rubro: string
  descripcion: string
  ubicacion?: string
  horario?: string
  agenteNombre: string
  tono: string
  tipoOferta: string
  productos: Array<{ name: string; price: string; available: string }>
  infoExtra?: string
  canales: string[]
  ownerWhatsApp: string
  ownerEmail: string
  notificaciones: string
  timestamp: string
}

function formatPayload(d: OnboardingPayload): string {
  const productos = d.productos.length > 0
    ? d.productos.map(p => `  • ${p.name} — $${p.price} (${p.available})`).join('\n')
    : '  (ninguno cargado)'
  return `🆕 NUEVO ONBOARDING STRIKER\n\nNEGOCIO\n• Nombre: ${d.negocio}\n• Rubro: ${d.rubro}\n• Descripción: ${d.descripcion}\n• Ubicación: ${d.ubicacion || '—'}\n• Horario: ${d.horario || '—'}\n\nAGENTE\n• Nombre: ${d.agenteNombre}\n• Tono: ${d.tono}\n\nPRODUCTOS (${d.productos.length})\n${productos}\n\nINFO EXTRA\n${d.infoExtra || '(ninguna)'}\n\nCANALES\n${d.canales.join(', ')}\n\nDUEÑO\n• WhatsApp: ${d.ownerWhatsApp}\n• Email: ${d.ownerEmail}\n• Notificaciones: ${d.notificaciones}\n\nRecibido: ${new Date(d.timestamp).toLocaleString('es-SV', { timeZone: 'America/El_Salvador' })}`
}

function generateConfigBlock(d: OnboardingPayload): string {
  const productsCode = d.productos.map((p, i) => `    { id: '${d.negocio.toLowerCase().replace(/\s+/g, '-')}-prod-${i + 1}', name: '${p.name}', description: '', price: ${parseFloat(p.price) || 0}, currency: 'USD', available: ${p.available === 'sí'} }`).join(',\n')
  return `{\n  clientId: '${d.negocio.toLowerCase().replace(/\s+/g, '-')}',\n  businessName: '${d.negocio}',\n  businessType: 'retail',\n  about: \`${d.descripcion}\`,\n  location: '${d.ubicacion || 'El Salvador'}',\n  hours: '${d.horario || 'Consultar'}',\n  agentName: '${d.agenteNombre}',\n  tone: '${d.tono}' as const,\n  language: 'es',\n  products: [\n${productsCode}\n  ],\n  upsells: [],\n  ownerWhatsApp: '${d.ownerWhatsApp}',\n  ownerEmail: '${d.ownerEmail}',\n  notificationMethod: '${d.notificaciones}' as const,\n  channels: ${JSON.stringify(d.canales)},\n  allowedDomains: ['localhost'],\n}`
}

export async function POST(req: NextRequest) {
  try {
    const data: OnboardingPayload = await req.json()
    if (!data.negocio || !data.ownerWhatsApp || !data.ownerEmail) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const textSummary = formatPayload(data)
    const configBlock = generateConfigBlock(data)

    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: 'STRIKER Onboarding <onboarding@blitzdigital.online>', to: process.env.BLITZ_OWNER_EMAIL || 'daniel@blitzdigital.online', subject: `⚡ Nuevo onboarding: ${data.negocio}`, text: `${textSummary}\n\nCONFIG.TS:\n\n${configBlock}` }),
        })
      } catch (e) { console.error('Email failed:', e) }
    }

    if (process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID) {
      try {
        await fetch(`https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ messaging_product: 'whatsapp', to: (process.env.BLITZ_OWNER_WHATSAPP || '50379102453').replace(/[^0-9]/g, ''), type: 'text', text: { body: `⚡ *Nuevo onboarding*\n\n*Negocio:* ${data.negocio}\n*Agente:* ${data.agenteNombre}\n*Canales:* ${data.canales.join(', ')}\n*WhatsApp:* ${data.ownerWhatsApp}` } }),
        })
      } catch (e) { console.error('WhatsApp failed:', e) }
    }

    console.log('=== NUEVO ONBOARDING ===\n', textSummary)
    console.log('=== CONFIG.TS ===\n', configBlock)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
