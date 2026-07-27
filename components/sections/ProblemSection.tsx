'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, ArrowRight, ArrowDown } from 'lucide-react'

const PROBLEMS = [
  { n: '01', icon: '/icons/icon-x.png', title: 'Tu negocio cierra. La competencia no.', desc: 'Mientras duermes, un cliente pregunta por WhatsApp y nadie responde. Lo atendió otra empresa.', impacto: 'Impacto en ventas' },
  { n: '02', icon: '/icons/icon-globe.png', title: 'Una página web estática no vende.', desc: 'Tener presencia digital no es suficiente. Necesitas una web que convierta visitantes en clientes reales.', impacto: 'Impacto en crecimiento' },
  { n: '03', icon: '/icons/icon-user.png', title: 'Contratar personal es caro y lento.', desc: 'Un agente de IA hace el trabajo de 3 empleados a una fracción del costo, sin renunciar los lunes.', impacto: 'Impacto en costos' },
  { n: '04', icon: '/icons/icon-barchart.png', title: 'No sabes qué pasa con tus datos.', desc: 'Sin análisis en tiempo real, tomas decisiones a ciegas. Tus competidores ya saben lo que tú ignoras.', impacto: 'Impacto en decisiones' },
]

const CHEQUEOS = ['Web analysis', 'Communications', 'Process review', 'Data intelligence']

const ROJO = '#E53E3E'

/* Divide un titulo para pintar el punto final en rojo */
function TituloConPunto({ texto }: { texto: string }) {
  const sinPunto = texto.replace(/\.$/, '')
  return (
    <>
      {sinPunto}
      <span style={{ color: ROJO }}>.</span>
    </>
  )
}

function Radar() {
  const S = 104
  const C = S / 2
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: S,
        height: S,
        borderRadius: '50%',
        border: `1px solid ${ROJO}59`,
        background: 'radial-gradient(circle, rgba(229,62,62,0.07), rgba(6,6,6,0.9) 70%)',
      }}
    >
      {/* anillos y ejes, centrados de verdad */}
      <svg viewBox={`0 0 ${S} ${S}`} width={S} height={S} className="absolute inset-0">
        {[16, 30, 44].map((r) => (
          <circle key={r} cx={C} cy={C} r={r} fill="none" stroke={`${ROJO}33`} strokeWidth="1" />
        ))}
        <line x1={C} y1="6" x2={C} y2={S - 6} stroke={`${ROJO}26`} strokeWidth="1" />
        <line x1="6" y1={C} x2={S - 6} y2={C} stroke={`${ROJO}26`} strokeWidth="1" />
        <circle cx="70" cy="36" r="2" fill={ROJO} />
        <circle cx="36" cy="62" r="1.6" fill={ROJO} />
        <circle cx="64" cy="72" r="1.6" fill={ROJO} />
      </svg>

      {/* barrido: el borde redondeado recorta el cono a un sector circular */}
      <div
        className="absolute inset-0 animate-radar-sweep"
        style={{
          borderRadius: '50%',
          background: `conic-gradient(from 0deg, ${ROJO}80, ${ROJO}26 22deg, transparent 62deg)`,
        }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{ left: C - 2, top: C - 2, width: 4, height: 4, borderRadius: '50%', background: ROJO, boxShadow: `0 0 8px 2px ${ROJO}` }}
      />
    </div>
  )
}

export function ProblemSection() {
  const panelRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)
  const [arrancado, setArrancado] = useState(false)
  const [hover, setHover] = useState<number | null>(null)

  /* El escaneo corre cuando el panel entra en pantalla */
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArrancado(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!arrancado) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPct(100)
      return
    }
    // se calcula por tiempo transcurrido: si el navegador ralentiza la pestaña,
    // al volver retoma el valor correcto en vez de quedarse a medias
    const DURACION = 1400
    const t0 = performance.now()
    let raf = 0
    const tick = (ahora: number) => {
      const p = Math.min(100, Math.round(((ahora - t0) / DURACION) * 100))
      setPct(p)
      if (p < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [arrancado])

  const listos = Math.min(CHEQUEOS.length, Math.floor((pct / 100) * (CHEQUEOS.length + 0.5)))

  return (
    <section className="section-padding relative overflow-hidden" style={{ borderBottom: '1px solid var(--border-2)', background: '#050505' }}>
      <Image src="/hero-bg.jpg" alt="" fill className="pointer-events-none" style={{ objectFit: 'cover', objectPosition: 'center 20%', zIndex: 0, opacity: 0.4 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(229,62,62,0.16), transparent 70%)', zIndex: 1 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.95) 40%, rgba(5,5,5,0.8) 100%)', zIndex: 1 }} />

      <div className="container relative" style={{ zIndex: 3 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14">
          {/* ── Columna izquierda: titulo + diagnostico ── */}
          <div>
            <p className="text-label mb-3">El problema</p>
            <h2 className="text-d2 mb-5">
              Tu negocio tiene
              <span style={{ color: ROJO, display: 'block' }}>fugas.</span>
            </h2>
            <p className="mb-8" style={{ fontSize: 14, color: 'var(--gray-1)', lineHeight: 1.75, maxWidth: 430 }}>
              Mientras tú te enfocas en crecer, estos problemas están frenando tus resultados todos los días.
            </p>

            {/* Ventana de diagnostico */}
            <div ref={panelRef} style={{ border: `1px solid ${ROJO}40`, background: 'rgba(8,8,8,0.82)' }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${ROJO}2b`, background: 'rgba(229,62,62,0.06)' }}>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black" style={{ fontSize: 11, color: ROJO, letterSpacing: '0.06em' }}>///</span>
                  <span className="font-display font-bold uppercase" style={{ fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--gray-1)' }}>
                    Sistema de diagnóstico BLITZ
                  </span>
                </div>
                <div className="flex items-center gap-2" style={{ color: 'var(--gray-3)' }}>
                  <span style={{ width: 9, height: 1, background: 'currentColor', display: 'block' }} />
                  <span style={{ fontSize: 11, lineHeight: 1 }}>✕</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-end justify-between mb-2">
                  <span className="font-display uppercase" style={{ fontSize: 11.5, color: 'var(--gray-1)', letterSpacing: '0.06em' }}>
                    Escaneando tu negocio...
                  </span>
                  <span className="font-display font-black" style={{ fontSize: 22, color: ROJO, lineHeight: 1 }}>
                    {pct}%
                  </span>
                </div>

                {/* barra segmentada */}
                <div className="flex gap-[3px] mb-4">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        flex: 1,
                        height: 12,
                        background: i < Math.round((pct / 100) * 28) ? ROJO : 'rgba(229,62,62,0.13)',
                        transition: 'background 160ms linear',
                      }}
                    />
                  ))}
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    {CHEQUEOS.map((c, i) => {
                      const ok = i < listos
                      return (
                        <div key={c} className="flex items-center gap-2" style={{ opacity: ok ? 1 : 0.35, transition: 'opacity 260ms ease' }}>
                          <span className="font-display" style={{ fontSize: 10, color: 'var(--gray-2)' }}>
                            [{String(i + 1).padStart(2, '0')}]
                          </span>
                          <span className="font-display uppercase" style={{ fontSize: 10, color: 'var(--gray-1)', letterSpacing: '0.05em' }}>
                            {c}
                          </span>
                          <span className="flex-1" style={{ borderBottom: '1px dotted rgba(255,255,255,0.14)', minWidth: 10 }} />
                          <span className="font-display font-bold" style={{ fontSize: 10, color: ok ? '#4ade80' : 'var(--gray-3)' }}>
                            {ok ? 'OK' : '··'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <Radar />
                </div>
              </div>
            </div>

            {/* Diagnostico completado */}
            <div
              className="mt-4 p-5 flex items-start gap-4"
              style={{
                border: `1px solid ${ROJO}66`,
                background: 'rgba(229,62,62,0.07)',
                opacity: pct >= 100 ? 1 : 0.35,
                transform: pct >= 100 ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <AlertTriangle size={30} color={ROJO} strokeWidth={1.6} className="flex-shrink-0" />
              <div>
                <div className="font-display font-bold uppercase" style={{ fontSize: 12.5, color: 'var(--white)', letterSpacing: '0.06em' }}>
                  Diagnóstico completado
                </div>
                <div className="font-display font-black uppercase my-1" style={{ fontSize: 19, color: 'var(--white)', lineHeight: 1.1 }}>
                  4 problemas críticos detectados
                </div>
                <div className="font-display uppercase" style={{ fontSize: 11, color: 'var(--gray-1)', letterSpacing: '0.06em' }}>
                  Recomendación: <span style={{ color: ROJO, fontWeight: 700 }}>Activar ecosistema BLITZ</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Columna derecha: problemas detectados ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span style={{ width: 9, height: 9, background: ROJO, flexShrink: 0 }} />
              <span className="font-display font-bold uppercase whitespace-nowrap" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--gray-1)' }}>
                Problemas detectados
              </span>
              <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${ROJO}80, ${ROJO}14)` }} />
              <span className="flex gap-[3px] flex-shrink-0">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} style={{ width: 3, height: 11, background: i < 3 ? ROJO : `${ROJO}40` }} />
                ))}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROBLEMS.map(({ n, icon, title, desc, impacto }, idx) => {
                const detectado = idx < listos
                const on = hover === idx
                return (
                  <div
                    key={n}
                    onMouseEnter={() => setHover(idx)}
                    onMouseLeave={() => setHover(null)}
                    className="relative p-5"
                    style={{
                      border: `1px solid ${on ? ROJO : `${ROJO}4d`}`,
                      background: on ? 'rgba(20,10,10,0.86)' : 'rgba(10,10,10,0.72)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                      opacity: detectado ? 1 : 0,
                      transform: detectado ? `translateY(${on ? -3 : 0}px)` : 'translateY(12px)',
                      boxShadow: on ? `0 18px 40px -18px ${ROJO}99` : 'none',
                      transition:
                        'opacity 420ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1), border-color 240ms ease, background 240ms ease, box-shadow 300ms ease',
                    }}
                  >
                    {/* destello al momento de detectarse */}
                    {detectado && (
                      <span
                        aria-hidden
                        className="absolute inset-0 pointer-events-none animate-detect-flash"
                        style={{ background: `radial-gradient(ellipse at 50% 0%, ${ROJO}59, transparent 70%)` }}
                      />
                    )}

                    {/* esquinas HUD que se dibujan al aparecer */}
                    <span className="absolute pointer-events-none" style={{ top: 0, left: 0, width: detectado ? 14 : 0, height: 2, background: ROJO, transition: 'width 420ms ease 160ms' }} />
                    <span className="absolute pointer-events-none" style={{ top: 0, left: 0, width: 2, height: detectado ? 14 : 0, background: ROJO, transition: 'height 420ms ease 160ms' }} />
                    <span className="absolute pointer-events-none" style={{ bottom: 0, right: 0, width: detectado ? 14 : 0, height: 2, background: ROJO, transition: 'width 420ms ease 260ms' }} />
                    <span className="absolute pointer-events-none" style={{ bottom: 0, right: 0, width: 2, height: detectado ? 14 : 0, background: ROJO, transition: 'height 420ms ease 260ms' }} />

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display font-black" style={{ fontSize: 30, color: ROJO, lineHeight: 1 }}>{n}</span>
                        <span
                          className={`font-display font-bold uppercase${detectado ? ' animate-critical' : ''}`}
                          style={{
                            fontSize: 8, letterSpacing: '0.12em', color: ROJO,
                            border: `1px solid ${ROJO}66`, padding: '2px 6px',
                            animationDelay: `${idx * 240}ms`,
                          }}
                        >
                          Critical
                        </span>
                      </div>
                      <div
                        className="relative flex-shrink-0"
                        style={{ width: 44, height: 44, transform: on ? 'scale(1.12)' : 'scale(1)', transition: 'transform 320ms cubic-bezier(0.16,1,0.3,1)' }}
                      >
                        <Image src={icon} alt="" fill style={{ objectFit: 'contain' }} />
                      </div>
                    </div>

                    <h3 className="font-display font-black uppercase mb-2" style={{ fontSize: 16, color: 'var(--white)', lineHeight: 1.15 }}>
                      <TituloConPunto texto={title} />
                    </h3>
                    <p className="mb-4" style={{ fontSize: 11.5, color: 'var(--gray-1)', lineHeight: 1.6 }}>{desc}</p>

                    <div
                      className="flex items-center justify-between gap-2 px-3 py-2"
                      style={{ border: `1px solid ${on ? `${ROJO}80` : `${ROJO}33`}`, background: 'rgba(229,62,62,0.05)', transition: 'border-color 240ms ease' }}
                    >
                      <span className="font-display uppercase" style={{ fontSize: 8.5, letterSpacing: '0.1em', color: 'var(--gray-2)' }}>
                        {impacto}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-display font-bold uppercase" style={{ fontSize: 9, color: ROJO }}>Alto</span>
                        {/* el medidor se llena barra por barra al detectarse */}
                        <span className="flex gap-[3px]">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <span
                              key={i}
                              style={{
                                width: 8, height: 9, background: ROJO,
                                opacity: detectado ? 1 : 0.12,
                                transform: detectado ? 'scaleY(1)' : 'scaleY(0.4)',
                                transition: `opacity 260ms ease ${320 + i * 90}ms, transform 260ms cubic-bezier(0.16,1,0.3,1) ${320 + i * 90}ms`,
                              }}
                            />
                          ))}
                        </span>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Barra inferior ── */}
        <div
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 px-6 py-5"
          style={{ border: `1px solid ${ROJO}40`, background: 'rgba(10,10,10,0.6)' }}
        >
          <AlertTriangle size={26} color={ROJO} strokeWidth={1.6} className="flex-shrink-0" />
          <div className="flex-1" style={{ minWidth: 260 }}>
            <div style={{ fontSize: 12.5, color: 'var(--gray-1)' }}>Estos problemas te cuestan tiempo, dinero y oportunidades.</div>
            <div className="font-display font-black uppercase" style={{ fontSize: 15, color: 'var(--white)' }}>
              BLITZ existe para <span style={{ color: ROJO }}>eliminarlos.</span>
            </div>
          </div>
          <span className="font-display uppercase hidden xl:block" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--gray-2)' }}>
            La solución está a un click
          </span>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 font-display font-bold uppercase transition-opacity hover:opacity-85 flex-shrink-0"
            style={{ fontSize: 11.5, letterSpacing: '0.08em', color: ROJO, border: `1px solid ${ROJO}`, padding: '11px 20px' }}
          >
            Ver cómo lo hacemos
            <ArrowRight size={14} />
          </Link>
          <div className="hidden xl:flex flex-col items-center gap-1 flex-shrink-0" style={{ borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: 20 }}>
            <span className="font-display uppercase text-center" style={{ fontSize: 8.5, letterSpacing: '0.1em', color: 'var(--gray-2)', lineHeight: 1.4 }}>
              Scroll<br />para descubrir
            </span>
            <ArrowDown size={13} color={ROJO} />
          </div>
        </div>
      </div>
    </section>
  )
}
