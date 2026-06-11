export async function POST(req: NextRequest) {
  try {
    const text = await req.text()
    console.log('Raw body:', text)
    
    if (!text || text.trim() === '') {
      return NextResponse.json({ status: 'empty body' }, { status: 200 })
    }

    const body = JSON.parse(text)
    
    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
    if (!message || message.type !== 'text') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const from = message.from
    const text2 = message.text.body
    const reply = await getStrikerResponse(text2, from)
    await sendWhatsAppMessage(from, reply)

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ status: 'error' }, { status: 200 })
  }
}
