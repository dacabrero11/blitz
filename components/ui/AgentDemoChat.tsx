'use client'

import { useEffect, useRef, useState } from 'react'
import type { AgentDemo } from '@/lib/agents'

/* ══════════════════════════════════════════════════════════════════
   Vista en acción — la conversación se escribe sola.

   Es la única prueba de producto de la página: un agente conversacional
   se demuestra viendo la conversación ocurrir, no con una captura.
   ══════════════════════════════════════════════════════════════════ */

const PAUSA_USUARIO = 700 // antes de que "llegue" un mensaje del cliente
const ESCRIBIENDO = 1100 // cuánto dura el indicador antes de la respuesta

export function AgentDemoChat({ demo }: { demo: AgentDemo }) {
  const total = demo.messages.length
  const [visibles, setVisibles] = useState(0)
  const [escribiendo, setEscribiendo] = useState(false)
  const [arrancado, setArrancado] = useState(false)
  const [reduced, setReduced] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* Arranca cuando la demo entra en pantalla, no al cargar la página */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArrancado(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Secuencia: mensaje del cliente directo; respuesta del agente precedida
     por el indicador de "escribiendo…" */
  useEffect(() => {
    if (!arrancado) return
    if (reduced) {
      setVisibles(total)
      return
    }
    if (visibles >= total) return

    const siguiente = demo.messages[visibles]
    const esAgente = siguiente.from === 'agent'

    if (esAgente) {
      setEscribiendo(true)
      const t1 = window.setTimeout(() => {
        setEscribiendo(false)
        setVisibles((v) => v + 1)
      }, ESCRIBIENDO)
      timers.current.push(t1)
      return () => window.clearTimeout(t1)
    }
    const t2 = window.setTimeout(() => setVisibles((v) => v + 1), PAUSA_USUARIO)
    timers.current.push(t2)
    return () => window.clearTimeout(t2)
  }, [arrancado, visibles, total, demo.messages, reduced])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  /* Seguir la conversación hacia abajo conforme crece */
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !arrancado) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [visibles, escribiendo, arrancado, reduced])

  const repetir = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setEscribiendo(false)
    setVisibles(0)
  }

  const completo = visibles >= total

  return (
    <div
      ref={rootRef}
      style={{ background: 'var(--black-2)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 460 }}
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1" aria-hidden>
            {['#E53E3E', '#3d3d3d', '#3d3d3d'].map((c, i) => (
              <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
            ))}
          </span>
          <span className="font-display font-bold uppercase" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--white)' }}>
            Conversaciones
          </span>
        </div>
        <div className="flex items-center gap-2">
          {completo && !reduced && (
            <button
              type="button"
              onClick={repetir}
              className="font-display font-bold uppercase"
              style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--gray-2)', padding: '3px 8px', border: '1px solid var(--border)' }}
            >
              Repetir
            </button>
          )}
          <span
            className="font-bold flex items-center justify-center"
            style={{
              fontSize: 10,
              color: 'var(--white)',
              background: 'var(--red)',
              width: 20,
              height: 20,
              borderRadius: '50%',
              transition: 'transform 260ms var(--ease-out)',
            }}
          >
            {demo.otherContacts.length + (completo ? 1 : 0)}
          </span>
        </div>
      </div>

      {/* Hilo activo */}
      <div className="px-4 pt-3 pb-2" style={{ borderBottom: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="flex items-center justify-center font-display font-bold"
            style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(229,62,62,0.16)', border: '1px solid rgba(229,62,62,0.4)', fontSize: 11, color: 'var(--red)' }}
            aria-hidden
          >
            {demo.contactName.charAt(0)}
          </span>
          <div>
            <div className="font-display font-bold" style={{ fontSize: 12, color: 'var(--white)', lineHeight: 1.1 }}>
              {demo.contactName}
            </div>
            <div style={{ fontSize: 9.5, color: 'var(--gray-2)' }}>{demo.contactNote}</div>
          </div>
        </div>

        <div ref={scrollRef} className="flex flex-col gap-2.5" style={{ overflowY: 'auto', flex: 1, minHeight: 190, scrollbarWidth: 'none' }}>
          {demo.messages.slice(0, visibles).map((m, i) => (
            <div
              key={i}
              className={m.from === 'agent' ? 'self-end text-right' : 'self-start'}
              style={{ maxWidth: '86%', animation: reduced ? undefined : 'demo-msg 420ms cubic-bezier(0.16,1,0.3,1) backwards' }}
            >
              <div
                className="px-3 py-2"
                style={{
                  fontSize: 12,
                  lineHeight: 1.55,
                  textAlign: 'left',
                  color: m.from === 'agent' ? 'var(--white)' : 'var(--gray-1)',
                  background: m.from === 'agent' ? 'rgba(229,62,62,0.18)' : 'var(--black)',
                  border: m.from === 'agent' ? '1px solid rgba(229,62,62,0.42)' : '1px solid var(--border)',
                  borderRadius: m.from === 'agent' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                }}
              >
                {m.text}
              </div>
              <div style={{ fontSize: 9, color: 'var(--gray-2)', marginTop: 3 }}>{m.time}</div>
            </div>
          ))}

          {escribiendo && (
            <div className="self-end" style={{ animation: reduced ? undefined : 'demo-msg 300ms ease backwards' }}>
              <div
                className="px-3 py-2.5 flex items-center gap-1.5"
                style={{ background: 'rgba(229,62,62,0.12)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '10px 10px 2px 10px' }}
                aria-label="El agente está escribiendo"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="animate-demo-dot"
                    style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Otros contactos */}
      <div className="px-4 py-2">
        {demo.otherContacts.map((c, i) => (
          <div
            key={c.name}
            className="flex items-center justify-between py-2"
            style={{ borderBottom: i < demo.otherContacts.length - 1 ? '1px solid var(--border)' : 'none' }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="flex items-center justify-center font-display font-bold"
                style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--black)', border: '1px solid var(--border)', fontSize: 10, color: 'var(--gray-1)' }}
                aria-hidden
              >
                {c.name.charAt(0)}
              </span>
              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-1)', lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-2)' }}>{c.note}</div>
              </div>
            </div>
            <span style={{ fontSize: 9, color: 'var(--gray-2)' }}>{c.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
