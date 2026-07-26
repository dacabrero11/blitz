'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Target, ClipboardList, Tv, Activity, Crown } from 'lucide-react'
import { AGENTS, type Agent } from '@/lib/agents'

const CARD_ICONS: Record<NonNullable<Agent['cardIcon']>, typeof Target> = {
  target: Target,
  clipboard: ClipboardList,
  tv: Tv,
  activity: Activity,
  crown: Crown,
}

const ACCENT = '#E53E3E'

export function AgentesGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState<string | null>(null)

  /* Entrada escalonada al entrar en pantalla */
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {AGENTS.map((agent, i) => {
        const Icon = CARD_ICONS[agent.cardIcon ?? 'target']
        const on = hover === agent.id
        return (
          <Link
            key={agent.id}
            href={`/agentes/${agent.id}`}
            onMouseEnter={() => setHover(agent.id)}
            onMouseLeave={() => setHover(null)}
            className="group relative flex flex-col"
            style={{
              background: '#0a0a0a',
              opacity: visible ? 1 : 0,
              transform: visible ? `translateY(${on ? -8 : 0}px)` : 'translateY(22px)',
              boxShadow: on ? `0 26px 52px -20px ${ACCENT}80` : '0 0 0 0 transparent',
              transition: visible
                ? 'transform 340ms cubic-bezier(0.16,1,0.3,1), box-shadow 340ms ease, opacity 300ms ease'
                : `opacity 560ms ease ${i * 110}ms, transform 560ms cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
            }}
          >
            {/* Retrato */}
            <div
              className="relative overflow-hidden transition-colors duration-300"
              style={{
                height: 340,
                background: '#050505',
                border: '1px solid rgba(229,62,62,0.3)',
                borderTop: `3px solid ${ACCENT}`,
              }}
            >
              <Image
                src={agent.cardImage ?? agent.image}
                alt={agent.name}
                fill
                className="transition-transform duration-700"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                  transform: on ? 'scale(1.09)' : 'scale(1)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 35%)' }}
              />
              {/* el retrato se aviva al enfocarlo */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 30%, ${ACCENT}26, transparent 68%)`,
                  opacity: on ? 1 : 0,
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{ border: `1px solid ${ACCENT}`, opacity: on ? 1 : 0, zIndex: 2 }}
              />

              <div
                className="absolute top-3 left-3 font-display font-black"
                style={{ fontSize: 14, color: ACCENT, zIndex: 3, letterSpacing: '0.05em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {agent.classification === 'elite' && (
                <div
                  className="absolute top-3 right-3 font-display font-bold text-white"
                  style={{ fontSize: 8, letterSpacing: '0.14em', background: ACCENT, padding: '2px 6px', zIndex: 3 }}
                >
                  ÉLITE
                </div>
              )}

              {/* Ficha del agente: aparece al pasar el mouse */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: 10,
                  right: 10,
                  bottom: 10,
                  zIndex: 4,
                  padding: '9px 11px',
                  borderRadius: 10,
                  border: `1px solid ${ACCENT}66`,
                  background: 'rgba(8,8,8,0.88)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  opacity: on ? 1 : 0,
                  transform: on ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 280ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <div className="flex items-center justify-between gap-2" style={{ marginBottom: 3 }}>
                  <span className="font-display" style={{ fontSize: 8, letterSpacing: '0.12em', color: 'var(--gray-2)' }}>
                    UNIDAD
                  </span>
                  <span className="font-display font-bold" style={{ fontSize: 10, color: 'var(--white)' }}>
                    {agent.unitCode}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2" style={{ marginBottom: 3 }}>
                  <span className="font-display" style={{ fontSize: 8, letterSpacing: '0.12em', color: 'var(--gray-2)' }}>
                    CLASE
                  </span>
                  <span className="font-display font-bold" style={{ fontSize: 10, color: 'var(--white)' }}>
                    {agent.classLabel ?? '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display" style={{ fontSize: 8, letterSpacing: '0.12em', color: 'var(--gray-2)' }}>
                    ESTADO
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="animate-pulse-dot rounded-full"
                      style={{ width: 5, height: 5, background: ACCENT, display: 'inline-block' }}
                    />
                    <span className="font-display font-bold" style={{ fontSize: 10, color: ACCENT }}>
                      ACTIVE
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div
              className="p-5 flex-1 flex flex-col"
              style={{ background: '#0a0a0a', border: '1px solid rgba(229,62,62,0.3)', borderTop: 'none' }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0 mb-3 transition-transform duration-300"
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(229,62,62,0.1)',
                  border: `1px solid ${ACCENT}`,
                  transform: on ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <Icon size={16} color={ACCENT} strokeWidth={2} />
              </div>
              <div className="font-display font-black uppercase mb-1" style={{ fontSize: 22, color: 'var(--white)', lineHeight: 1 }}>
                {agent.name}
              </div>
              <div className="font-display font-bold uppercase mb-3" style={{ fontSize: 12, color: ACCENT, letterSpacing: '0.05em' }}>
                {agent.role.replace('Agente de ', '').replace('Agente ', '')}
              </div>
              <p className="flex-1" style={{ fontSize: 12.5, color: 'var(--gray-1)', lineHeight: 1.6 }}>
                {agent.cardDesc}
              </p>
              <div
                className="font-display font-bold uppercase mt-4 transition-transform duration-300"
                style={{
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: '0.05em',
                  transform: on ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                Más info →
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
