'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function StrikerWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy STRIKER, el agente de ventas de Blitz. ¿En qué puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error de conexión. Escríbenos por WhatsApp.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button — STRIKER logo coin */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 transition-transform hover:scale-105 active:scale-95"
        style={{
          width: 64,
          height: 64,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          filter: open ? 'none' : 'drop-shadow(0 0 16px rgba(229,62,62,0.5))',
        }}
        aria-label="Abrir chat con STRIKER"
      >
        {open ? (
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 64, height: 64, background: '#E53E3E', boxShadow: '0 0 24px rgba(229,62,62,0.5)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
        ) : (
          <Image
            src="/logos/striker.png"
            alt="STRIKER"
            width={64}
            height={64}
            className="rounded-full"
            style={{ objectFit: 'cover' }}
          />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-[88px] right-6 z-50 flex flex-col rounded-none overflow-hidden"
          style={{
            width: 'min(360px, calc(100vw - 48px))',
            height: 480,
            background: 'var(--black-2)',
            border: '1px solid var(--red)',
            boxShadow: '0 0 40px rgba(229,62,62,0.15)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ borderBottom: '1px solid var(--border)', background: 'var(--black)' }}
          >
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/logos/striker.png"
                alt="STRIKER"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-wide" style={{ color: 'var(--white)' }}>
                STRIKER
              </div>
              <div className="flex items-center gap-1.5">
                <span className="animate-pulse-dot rounded-full" style={{ width: 5, height: 5, background: '#22c55e', display: 'inline-block' }} />
                <span className="text-xs" style={{ color: 'var(--gray-1)' }}>Agente de ventas · En línea</span>
              </div>
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-display font-bold text-white transition-opacity hover:opacity-80"
              style={{ fontSize: 10, background: '#25D366', padding: '3px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              WhatsApp
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-3 py-2 text-sm leading-relaxed"
                  style={{
                    background: msg.role === 'user' ? 'var(--red)' : 'var(--black-3)',
                    color: 'var(--white)',
                    border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 flex gap-1" style={{ background: 'var(--black-3)', border: '1px solid var(--border)' }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="rounded-full" style={{ width: 6, height: 6, background: 'var(--gray-2)', display: 'inline-block', animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
              style={{ color: 'var(--white)' }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="shrink-0 flex items-center justify-center transition-opacity disabled:opacity-40"
              style={{ width: 32, height: 32, background: 'var(--red)', clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
