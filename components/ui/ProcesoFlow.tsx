'use client'

import type React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'

export interface ProcesoStep {
  icon: React.ReactNode
  title: string
  desc: string
}

const DURACION = 5200 // debe coincidir con proc-travel / proc-pulse en globals.css

export function ProcesoFlow({ steps, acento }: { steps: ProcesoStep[]; acento: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState(false)
  const [rail, setRail] = useState<{ left: number; width: number; top: number } | null>(null)
  const [delays, setDelays] = useState<number[]>([])

  /* Mide donde cae cada icono para que el riel los una y la luz los encienda al pasar */
  const medir = useCallback(() => {
    const wrap = wrapRef.current
    const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!wrap || icons.length < 2) return
    const w = wrap.getBoundingClientRect()
    const centros = icons.map((el) => {
      const r = el.getBoundingClientRect()
      return { x: r.left - w.left + r.width / 2, y: r.top - w.top + r.height / 2 }
    })
    // en movil se apilan: si no estan en la misma fila, no dibujamos riel horizontal
    const mismaFila = centros.every((c) => Math.abs(c.y - centros[0].y) < 8)
    if (!mismaFila) {
      setRail(null)
      setDelays([])
      return
    }
    const first = centros[0].x
    const last = centros[centros.length - 1].x
    const width = last - first
    setRail({ left: first, width, top: centros[0].y })
    setDelays(centros.map((c) => ((c.x - first) / width) * DURACION))
  }, [])

  useEffect(() => {
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [medir])

  /* Se dibuja al entrar en pantalla */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Ancla la luz y los destellos al mismo origen para que no se desfasen */
  useEffect(() => {
    if (!visible || !rail) return
    const t = setTimeout(() => {
      wrapRef.current?.querySelectorAll<HTMLElement>('.proc-anim').forEach((n) =>
        n.getAnimations().forEach((a) => {
          try {
            a.startTime = 0
          } catch {
            /* todavia no esta lista */
          }
        })
      )
    }, 60)
    return () => clearTimeout(t)
  }, [visible, rail, delays])

  return (
    <div ref={wrapRef} className="relative">
      {/* riel que une los pasos: se traza al entrar en pantalla */}
      {rail && (
        <>
          <span
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: rail.left,
              width: rail.width,
              top: rail.top,
              height: 1,
              background: `linear-gradient(90deg, ${acento}55, ${acento}22)`,
              transform: visible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left center',
              transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          {visible && (
            /* carril del ancho exacto: asi el 0%-100% de la luz equivale al recorrido real */
            <span
              aria-hidden
              className="absolute pointer-events-none"
              style={{ left: rail.left, width: rail.width, top: rail.top, height: 0 }}
            >
              <span
                className="absolute proc-anim animate-proc-travel"
                style={{
                  top: -3,
                  marginLeft: -3,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: acento,
                  boxShadow: `0 0 12px 3px ${acento}b0`,
                }}
              />
            </span>
          )}
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative flex gap-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 520ms ease ${i * 130}ms, transform 520ms cubic-bezier(0.16,1,0.3,1) ${i * 130}ms`,
            }}
          >
            <div
              ref={(el) => {
                iconRefs.current[i] = el
              }}
              className={`flex items-center justify-center flex-shrink-0 relative${visible && rail ? ' proc-anim animate-proc-pulse' : ''}`}
              style={{
                width: 38,
                height: 38,
                border: `1px solid ${acento}66`,
                borderRadius: 12,
                background: `${acento}1a`,
                zIndex: 1,
                animationDelay: delays[i] !== undefined ? `${delays[i]}ms` : undefined,
                ['--proc-glow' as string]: `${acento}cc`,
              }}
            >
              {step.icon}
            </div>
            <div className="min-w-0">
              <div className="font-display font-black mb-0.5" style={{ fontSize: 11, color: acento }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-display font-bold uppercase mb-1" style={{ fontSize: 11.5, color: 'var(--white)' }}>
                {step.title}
              </div>
              <p style={{ fontSize: 10.5, color: 'var(--gray-2)', lineHeight: 1.45 }}>{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight
                size={13}
                color={acento}
                className="hidden lg:block absolute"
                style={{ right: -16, top: 12, opacity: 0.6 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
