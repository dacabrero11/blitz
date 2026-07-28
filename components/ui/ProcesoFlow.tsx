'use client'

import type React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'

export interface ProcesoStep {
  icon: React.ReactNode
  title: string
  desc: string
}

const DURACION = 5200 // debe coincidir con proc-travel / proc-pulse / proc-fill / proc-ring en globals.css
const ICONO = 44

export function ProcesoFlow({ steps, acento }: { steps: ProcesoStep[]; acento: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState(false)
  const [rail, setRail] = useState<{ left: number; width: number; top: number } | null>(null)
  const [delays, setDelays] = useState<number[]>([])

  /* Mide donde cae cada icono: el riel los une y la luz los enciende justo al pasar */
  const medir = useCallback(() => {
    const wrap = wrapRef.current
    const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!wrap || icons.length < 2) return
    const w = wrap.getBoundingClientRect()
    const centros = icons.map((el) => {
      const r = el.getBoundingClientRect()
      return { x: r.left - w.left + r.width / 2, y: r.top - w.top + r.height / 2 }
    })
    // en movil los pasos se apilan: sin fila comun no hay riel horizontal
    const mismaFila = centros.every((c) => Math.abs(c.y - centros[0].y) < 8)
    if (!mismaFila) {
      setRail(null)
      setDelays([])
      return
    }
    const first = centros[0].x
    const width = centros[centros.length - 1].x - first
    setRail({ left: first, width, top: centros[0].y })
    setDelays(centros.map((c) => ((c.x - first) / width) * DURACION))
  }, [])

  useEffect(() => {
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [medir, steps.length])

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

  /* Ancla todos los loops al mismo origen para que no se desfasen entre si */
  useEffect(() => {
    if (!visible || !rail) return
    const t = setTimeout(() => {
      wrapRef.current?.querySelectorAll<HTMLElement>('.proc-anim').forEach((n) =>
        n.getAnimations().forEach((a) => {
          try {
            a.startTime = 0
          } catch {
            /* aun no esta lista */
          }
        })
      )
    }, 60)
    return () => clearTimeout(t)
  }, [visible, rail, delays])

  return (
    <div ref={wrapRef} className="relative" style={{ paddingTop: ICONO / 2 + 6 }}>
      {rail && (
        <>
          {/* riel base: se traza al entrar en pantalla */}
          <span
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: rail.left,
              width: rail.width,
              top: rail.top,
              height: 2,
              borderRadius: 2,
              background: `${acento}30`,
              transform: visible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left center',
              transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          {/* barra de progreso que se llena detras de la luz */}
          {visible && (
            <span
              aria-hidden
              className="absolute pointer-events-none proc-anim animate-proc-fill"
              style={{
                left: rail.left,
                width: rail.width,
                top: rail.top,
                height: 2,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${acento}66, ${acento})`,
                boxShadow: `0 0 10px ${acento}80`,
                transformOrigin: 'left center',
              }}
            />
          )}
          {/* carril del ancho exacto para que el 0%-100% de la luz sea el recorrido real */}
          {visible && (
            <span
              aria-hidden
              className="absolute pointer-events-none"
              style={{ left: rail.left, width: rail.width, top: rail.top + 1, height: 0 }}
            >
              <span
                className="absolute proc-anim animate-proc-travel"
                style={{
                  top: -4,
                  marginLeft: -4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: `0 0 14px 4px ${acento}`,
                }}
              />
            </span>
          )}
        </>
      )}

      {/* El número de columnas sigue al de pasos: con un valor fijo, un
          proceso de 5 dejaba el último en una segunda fila y entonces no hay
          fila común, así que medir() descarta el riel y no se anima nada. */}
      <div className="proceso-grid" style={{ ['--pasos' as string]: steps.length }}>
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative text-center"
            style={{
              paddingTop: ICONO / 2 + 16,
              paddingBottom: 18,
              paddingLeft: 14,
              paddingRight: 14,
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.09)',
              background: 'rgba(14,14,14,0.55)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 520ms ease ${i * 130}ms, transform 520ms cubic-bezier(0.16,1,0.3,1) ${i * 130}ms`,
            }}
          >
            {/* nodo: el icono se apoya sobre el riel */}
            <div
              ref={(el) => {
                iconRefs.current[i] = el
              }}
              className={`absolute flex items-center justify-center${visible && rail ? ' proc-anim animate-proc-pulse' : ''}`}
              style={{
                top: -ICONO / 2,
                left: '50%',
                marginLeft: -ICONO / 2,
                width: ICONO,
                height: ICONO,
                border: `1px solid ${acento}80`,
                borderRadius: '50%',
                background: '#0d0d0d',
                zIndex: 2,
                animationDelay: delays[i] !== undefined ? `${delays[i]}ms` : undefined,
                ['--proc-glow' as string]: `${acento}cc`,
              }}
            >
              {step.icon}
              {/* anillo que se expande cuando la luz llega a este nodo */}
              {visible && rail && (
                <span
                  aria-hidden
                  className="absolute proc-anim animate-proc-ring"
                  style={{
                    inset: -1,
                    borderRadius: '50%',
                    border: `1px solid ${acento}`,
                    animationDelay: delays[i] !== undefined ? `${delays[i]}ms` : undefined,
                  }}
                />
              )}
            </div>

            <div className="font-display font-black mb-1" style={{ fontSize: 12, color: acento }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="font-display font-bold uppercase mb-1.5" style={{ fontSize: 12, color: 'var(--white)' }}>
              {step.title}
            </div>
            <p style={{ fontSize: 10.5, color: 'var(--gray-2)', lineHeight: 1.5 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
