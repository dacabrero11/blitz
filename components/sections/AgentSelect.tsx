'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AGENTS } from '@/lib/agents'

/* ══════════════════════════════════════════════════════════════════
   OPERADORES — selección de operador.

   La ilustración manda. Cada una trae personaje, escenario, luz y
   composición ya resueltos, así que aquí no se dibuja ningún decorado:
   se deja respirar la imagen y se le apoya encima un HUD mínimo.
   ══════════════════════════════════════════════════════════════════ */

const ACCENT = '#E53E3E'

/* ── Hooks ───────────────────────────────────────────────────────── */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

/* ── HUD: piezas pequeñas, nunca por encima del personaje ─────────── */

/** Esquinas de encuadre, finas y cortas. */
function ScanCorners({ size = 28, opacity = 0.42 }: { size?: number; opacity?: number }) {
  const base: React.CSSProperties = { position: 'absolute', width: size, height: size, opacity }
  return (
    <>
      <span aria-hidden style={{ ...base, top: 0, left: 0, borderTop: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}` }} />
      <span aria-hidden style={{ ...base, top: 0, right: 0, borderTop: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}` }} />
      <span aria-hidden style={{ ...base, bottom: 0, left: 0, borderBottom: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}` }} />
      <span aria-hidden style={{ ...base, bottom: 0, right: 0, borderBottom: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}` }} />
    </>
  )
}

/** Retícula de puntería, discreta y en giro lento. */
function Crosshair({ size = 26, reduced }: { size?: number; reduced: boolean }) {
  return (
    <span aria-hidden style={{ position: 'relative', display: 'inline-block', width: size, height: size, opacity: 0.55 }}>
      <span
        className={reduced ? '' : 'animate-op-spin'}
        style={{
          position: 'absolute',
          inset: 0,
          border: `1px solid ${ACCENT}`,
          borderRadius: '50%',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
      />
      <span style={{ position: 'absolute', left: '50%', top: 2, bottom: 2, width: 1, background: ACCENT, opacity: 0.5 }} />
      <span style={{ position: 'absolute', top: '50%', left: 2, right: 2, height: 1, background: ACCENT, opacity: 0.5 }} />
    </span>
  )
}

/* ── Sección ─────────────────────────────────────────────────────── */

export function AgentSelect() {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const activeRef = useRef(0)
  const inViewRef = useRef(false)

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const short = useMediaQuery('(max-height: 880px)')

  const agent = AGENTS[active]

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 40)
    return () => window.clearTimeout(t)
  }, [])

  const select = useCallback((next: number) => {
    const target = ((next % AGENTS.length) + AGENTS.length) % AGENTS.length
    if (target === activeRef.current) return
    activeRef.current = target
    setActive(target)
  }, [])

  const step = useCallback((delta: number) => select(activeRef.current + delta), [select])

  /* Observer y teclado: se registran una sola vez y leen el índice del ref,
     nunca del estado, para no recrearse en cada cambio de operador. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (inViewRef.current = e.intersectionRatio > 0.3), {
      threshold: [0, 0.3, 1],
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!inViewRef.current) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  /* Swipe en táctil */
  const touch = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
    touch.current = null
  }

  const taglineLines = (agent.taglineShort ?? agent.tagline)
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)

  const textIn = (delay: number): React.CSSProperties =>
    reduced ? {} : { animation: `op-text 620ms cubic-bezier(0.16,1,0.3,1) ${delay}ms backwards` }

  const hudCode = `${agent.unitCode} / ${String(active + 1).padStart(2, '0')}-${String(AGENTS.length).padStart(2, '0')}`

  return (
    <section
      ref={sectionRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative overflow-hidden"
      style={{ paddingTop: 'var(--nav-h)', minHeight: '100svh', background: '#040404' }}
      aria-roledescription="Selector de operador"
    >
      {/* ═══ LA ILUSTRACIÓN ═══════════════════════════════════════
          Sangra hasta el borde derecho y de arriba abajo. El flanco
          izquierdo se disuelve en negro: nunca debe leerse como tarjeta. */}
      <div
        className="absolute pointer-events-none"
        style={
          isDesktop
            ? { top: 0, right: 0, bottom: 0, width: '74%', zIndex: 0 }
            : { top: 'var(--nav-h)', left: 0, right: 0, height: '56svh', zIndex: 0 }
        }
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: isDesktop
              ? 'linear-gradient(90deg, transparent 0%, #000 28%, #000 100%)'
              : 'linear-gradient(180deg, #000 0%, #000 60%, transparent 100%)',
            WebkitMaskImage: isDesktop
              ? 'linear-gradient(90deg, transparent 0%, #000 28%, #000 100%)'
              : 'linear-gradient(180deg, #000 0%, #000 60%, transparent 100%)',
          }}
        >
          {/* Las cinco montadas desde el inicio: así el cambio es un fundido
              cruzado real y no un parpadeo en negro mientras carga la nueva.
              La transición vive en CSS, no en keyframes, para no remontar. */}
          {AGENTS.map((a, i) => {
            const on = i === active
            return (
              <div
                key={a.id}
                className="absolute inset-0"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? 'translate3d(0,0,0) scale(1)' : 'translate3d(18px,0,0) scale(1.045)',
                  transition: reduced
                    ? 'none'
                    : 'opacity 620ms ease, transform 900ms cubic-bezier(0.16,1,0.3,1)',
                  // Sin will-change: son cinco capas del tamaño de la pantalla y
                  // promoverlas todas a la vez cuesta más de lo que ahorra.
                }}
              >
                <Image
                  src={a.heroFull ?? a.heroBg ?? a.image}
                  alt={on ? `${a.name} — ${a.role}` : ''}
                  fill
                  sizes={isDesktop ? '74vw' : '100vw'}
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'eager'}
                  className="object-cover"
                />
              </div>
            )
          })}
        </div>

        {/* Asiento del texto: penumbra a la izquierda y abajo, sin caja */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: isDesktop
              ? 'linear-gradient(90deg, rgba(4,4,4,0.94) 0%, rgba(4,4,4,0.5) 20%, rgba(4,4,4,0.12) 40%, transparent 58%), linear-gradient(0deg, rgba(4,4,4,0.88) 0%, rgba(4,4,4,0.3) 24%, transparent 48%)'
              : 'linear-gradient(0deg, rgba(4,4,4,0.96) 0%, rgba(4,4,4,0.35) 38%, transparent 68%)',
          }}
        />
      </div>

      {/* Viñeta muy leve, solo para cerrar el cuadro */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: 'radial-gradient(ellipse 94% 90% at 64% 48%, transparent 56%, rgba(4,4,4,0.72) 100%)' }}
      />

      {/* ═══ CONTENIDO ════════════════════════════════════════════ */}
      <div
        className="relative"
        style={{
          zIndex: 2,
          minHeight: 'calc(100svh - var(--nav-h))',
          padding: isDesktop ? `${short ? 24 : 44}px var(--section-px)` : '0 var(--section-px) 44px',
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'minmax(270px, 29%) 1fr' : '1fr',
          alignItems: 'center',
          columnGap: 'clamp(20px, 3vw, 56px)',
        }}
      >
        {/* ── Columna izquierda: rótulo y roster ────────────────── */}
        <div
          style={
            !ready
              ? { opacity: 0 }
              : reduced
                ? {}
                : { animation: 'op-in 700ms cubic-bezier(0.16,1,0.3,1) 60ms backwards' }
          }
        >
          {!isDesktop && <div style={{ height: '50svh' }} />}

          <p className="text-label" style={{ color: ACCENT, marginBottom: 10 }}>
            División IA
          </p>
          <h1 className="text-d1" style={{ lineHeight: 0.84, marginBottom: 8 }}>
            Operadores
          </h1>
          <p
            className="font-display font-bold uppercase"
            style={{ fontSize: 'clamp(15px,1.5vw,20px)', letterSpacing: '0.05em', color: 'var(--gray-1)' }}
          >
            Elige tu agente.
          </p>
          <p style={{ marginTop: 12, color: 'var(--gray-2)', fontSize: 13.5, lineHeight: 1.55, maxWidth: 300 }}>
            Cinco inteligencias especializadas para diferentes áreas del negocio.
          </p>

          {/* Roster: solo nombres. Sin miniaturas, sin cajas. */}
          <div role="listbox" aria-label="Operadores" style={{ marginTop: short ? 20 : 32 }}>
            {AGENTS.map((a, i) => {
              const on = i === active
              return (
                <button
                  key={a.id}
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => select(i)}
                  className="block w-full text-left"
                  style={{
                    padding: short ? '8px 0 8px 16px' : '11px 0 11px 18px',
                    borderLeft: `2px solid ${on ? ACCENT : 'rgba(255,255,255,0.09)'}`,
                    background: on ? `linear-gradient(90deg, ${ACCENT}22 0%, transparent 76%)` : 'transparent',
                    transition: 'border-color 320ms ease, background 320ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!on) e.currentTarget.style.borderLeftColor = 'rgba(255,255,255,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    if (!on) e.currentTarget.style.borderLeftColor = 'rgba(255,255,255,0.09)'
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="font-display font-black uppercase"
                      style={{
                        fontSize: short ? 19 : 23,
                        lineHeight: 1,
                        color: on ? 'var(--white)' : 'var(--gray-1)',
                        transition: 'color 320ms ease',
                      }}
                    >
                      {a.name}
                    </span>
                    {on && (
                      <span
                        className={reduced ? '' : 'animate-op-pulse'}
                        aria-hidden
                        style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                      />
                    )}
                  </span>
                  <span
                    className="block font-display font-bold uppercase"
                    style={{
                      marginTop: 3,
                      fontSize: 9.5,
                      letterSpacing: '0.2em',
                      color: on ? ACCENT : 'var(--gray-2)',
                      transition: 'color 320ms ease',
                    }}
                  >
                    {a.rosterLabel ?? a.role}
                  </span>
                </button>
              )
            })}
          </div>

          {isDesktop && (
            <p className="font-display uppercase" style={{ marginTop: 20, fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--gray-3)' }}>
              ↑ ↓ para navegar el roster
            </p>
          )}
        </div>

        {/* ── Columna derecha: HUD mínimo + ficha sobre la imagen ── */}
        <div className="relative" style={{ minHeight: isDesktop ? '70vh' : undefined, marginTop: isDesktop ? 0 : 24 }}>
          {isDesktop && (
            <>
              <ScanCorners size={26} opacity={0.4} />

              {!reduced && (
                <span
                  aria-hidden
                  className="animate-op-scan"
                  style={{
                    position: 'absolute',
                    left: '8%',
                    right: 0,
                    top: 0,
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${ACCENT}55 45%, ${ACCENT}1a 82%, transparent)`,
                    // @ts-expect-error — variable CSS propia usada por el keyframe
                    '--scan-dist': '66vh',
                  }}
                />
              )}

              <div
                aria-hidden
                className="absolute flex items-center gap-3 font-display uppercase"
                style={{ top: 8, right: 36, fontSize: 9, letterSpacing: '0.22em', color: 'var(--gray-2)' }}
              >
                <span>13.6929°N 89.2182°W</span>
                <span style={{ width: 20, height: 1, background: 'var(--gray-3)' }} />
                <span style={{ color: ACCENT }}>{hudCode}</span>
                <Crosshair size={24} reduced={reduced} />
              </div>

              <div aria-hidden className="absolute flex flex-col gap-1.5" style={{ right: 8, top: '40%' }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: i === 4 ? 13 : 6,
                      height: 1,
                      background: i === 4 ? ACCENT : 'var(--gray-3)',
                      opacity: i === 4 ? 0.9 : 0.4,
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── Ficha del operador, apoyada sobre la imagen ─────── */}
          <div
            className={isDesktop ? 'absolute' : 'relative'}
            style={isDesktop ? { left: 0, bottom: short ? 4 : 16, maxWidth: 440 } : { maxWidth: 480 }}
          >
            <div key={`meta-${agent.id}`}>
              <p className="font-display font-bold uppercase" style={{ ...textIn(0), fontSize: 10, letterSpacing: '0.28em', color: 'var(--gray-1)' }}>
                {agent.unitCode}
              </p>
              <p className="text-label" style={{ ...textIn(50), color: ACCENT, marginTop: 5 }}>
                {agent.role}
              </p>

              <h2
                className="font-display font-black uppercase"
                style={{
                  ...textIn(90),
                  fontSize: short ? 'clamp(44px,5.2vw,72px)' : 'clamp(50px,6.2vw,94px)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.01em',
                  marginTop: 4,
                  textShadow: '0 6px 34px rgba(0,0,0,0.8)',
                }}
              >
                {agent.name}
              </h2>

              <div className="flex items-center gap-2" style={{ ...textIn(140), marginTop: 10 }}>
                <span
                  className={reduced ? '' : 'animate-op-pulse'}
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: agent.classification === 'elite' ? ACCENT : '#3ECF6B',
                    boxShadow: `0 0 8px ${agent.classification === 'elite' ? ACCENT : '#3ECF6B'}`,
                  }}
                />
                <span className="font-display font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.24em', color: 'var(--gray-1)' }}>
                  {agent.classification === 'elite' ? 'Élite' : 'Online'}
                </span>
              </div>

              <div
                className="font-display font-black uppercase"
                style={{
                  ...textIn(190),
                  marginTop: short ? 14 : 20,
                  fontSize: short ? 'clamp(17px,1.7vw,21px)' : 'clamp(19px,1.9vw,25px)',
                  lineHeight: 1.12,
                  textShadow: '0 4px 20px rgba(0,0,0,0.75)',
                }}
              >
                {taglineLines.map((line, i) => (
                  <span key={line} style={{ display: 'block', color: i === 1 ? ACCENT : 'var(--white)' }}>
                    {line}.
                  </span>
                ))}
              </div>

              <p
                style={{
                  ...textIn(240),
                  marginTop: short ? 10 : 16,
                  color: 'var(--gray-1)',
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  maxWidth: 400,
                  textShadow: '0 2px 14px rgba(0,0,0,0.85)',
                }}
              >
                {agent.description}
              </p>

              <div style={{ ...textIn(290), marginTop: short ? 16 : 24 }}>
                <Link
                  href={`/agentes/${agent.id}`}
                  className="btn-clip inline-flex items-center gap-2.5 font-display font-bold uppercase"
                  style={{
                    background: ACCENT,
                    color: '#fff',
                    padding: short ? '12px 24px' : '14px 28px',
                    fontSize: 12.5,
                    letterSpacing: '0.14em',
                    boxShadow: `0 14px 40px -14px ${ACCENT}`,
                    transition: 'transform 260ms var(--ease-out), box-shadow 260ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 20px 48px -12px ${ACCENT}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = `0 14px 40px -14px ${ACCENT}`
                  }}
                >
                  Activar agente <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
