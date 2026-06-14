import { NextRequest, NextResponse } from 'next/server'
import { processMessage, isRateLimited } from '@/lib/striker/engine'
import { getConfig } from '@/lib/striker/config'
import { IncomingMessage } from '@/lib/striker/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, sessionId } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages requerido' }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json({ error: 'último mensaje debe ser del usuario' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const sid = sessionId || `web_${ip}_${Date.now()}`

    const config = getConfig('blitz')
    if (!config) {
      return NextResponse.json({ error: 'configuración no encontrada' }, { status: 500 })
    }

    if (isRateLimited(`chat:${sid}`)) {
      return NextResponse.json(
        { content: 'Muchos mensajes seguidos. Esperá un momento o escribinos directo al +503 7910 2453.' },
        { status: 200 }
      )
    }

    const incomingMsg: IncomingMessage = {
      channel: 'web',
      senderId: sid,
      text: lastMessage.content,
      messageId: `web_${Date.now()}`,
      clientId: 'blitz',
    }

    const reply = await processMessage(incomingMsg, config)
    return NextResponse.json({ content: reply })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { content: 'Hubo un error. Escribinos directo al +503 7910 2453.' },
      { status: 200 }
    )
  }
}
