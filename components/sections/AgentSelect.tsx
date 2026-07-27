'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AGENTS } from '@/lib/agents'

/* ══════════════════════════════════════════════════════════════════
   OPERADORES — pantalla de selección de agente.
   El HUD es siempre rojo BLITZ: lo que cambia entre operadores es el
   escenario de fondo, no la paleta.
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

/** Descompone y recompone el texto letra por letra, como los menús de consola. */
function useScramble(text: string, trigger: number, enabled: boolean) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (!enabled) {
      setOut(text)
      return
    }
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/\\<>*'
    let frame = 0
    const total = 16
    const id = window.setInterval(() => {
      frame++
      const progress = frame / total
      setOut(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < progress * text.length) return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )
      if (frame >= total) {
        window.clearInterval(id)
        setOut(text)
      }
    }, 28)
    return () => window.clearInterval(id)
  }, [text, trigger, enabled])
  return out
}

/* ── Campo de brasas (solo desktop) ──────────────────────────────── */

function EmberField({ accent, active }: { accent: string; active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const accentRef = useRef(accent)
  accentRef.current = accent

  useEffect(() => {
    if (!active) return
    const cv = ref.current
    if (!cv) return
    const cx = cv.getContext('2d')
    if (!cx) return

    let w = 0
    let h = 0
    // El dpr no se sube de 1.5: este canvas se limpia entero en cada fotograma
    // y a dpr 2 en pantalla ancha eso son millones de píxeles por frame.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    function resize() {
      if (!cv) return
      w = cv.offsetWidth
      h = cv.offsetHeight
      cv.width = w * dpr
      cv.height = h * dpr
      cx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    type P = { x: number; y: number; vy: number; vx: number; r: number; a: number; life: number }
    const COUNT = 30
    const particles: P[] = Array.from({ length: COUNT }, () => spawn(true))

    function spawn(initial = false): P {
      return {
        x: w * (0.06 + Math.random() * 0.88),
        y: initial ? Math.random() * h : h + 10,
        vy: -(0.18 + Math.random() * 0.5),
        vx: (Math.random() - 0.5) * 0.22,
        r: 0.6 + Math.random() * 1.7,
        a: 0.15 + Math.random() * 0.5,
        life: 0,
      }
    }

    let raf = 0
    let running = true

    function tick() {
      if (!running) return
      cx!.clearRect(0, 0, w, h)
      cx!.fillStyle = accentRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.y += p.vy
        p.x += p.vx + Math.sin((p.life + i) * 0.02) * 0.2
        p.life++
        // se apagan conforme suben
        const fade = Math.max(0, 1 - (h - p.y) / (h * 0.85))
        cx!.globalAlpha = p.a * fade
        cx!.beginPath()
        cx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        cx!.fill()
        if (p.y < -12 || fade <= 0.01) particles[i] = spawn()
      }
      cx!.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    tick()

    // Pausar fuera de pantalla y con la pestaña oculta: sin esto el canvas
    // sigue quemando fotogramas mientras el usuario lee más abajo.
    const onVis = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        tick()
      }
    }
    document.addEventListener('visibilitychange', onVis)

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running && !document.hidden) {
          running = true
          tick()
        } else if (!e.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 }
    )
    io.observe(cv)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [active])

  if (!active) return null
  // Acotado a la franja central: las brasas nacen del podio, no de los bordes,
  // y limpiar un canvas a pantalla completa cada fotograma era el mayor coste.
  return (
    <canvas
      ref={ref}
      className="absolute pointer-events-none"
      style={{ zIndex: 2, left: '50%', transform: 'translateX(-50%)', bottom: '14%', width: 'min(46vw, 620px)', height: 'min(52vh, 460px)' }}
      aria-hidden
    />
  )
}

/* ── Corchetes de encuadre del HUD ───────────────────────────────── */

function Brackets({ accent, size = 26 }: { accent: string; size?: number }) {
  const corners = [
    { top: 0, left: 0, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
    { top: 0, right: 0, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
    { bottom: 0, left: 0, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` },
    { bottom: 0, right: 0, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` },
  ]
  return (
    <>
      {corners.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute pointer-events-none"
          style={{ width: size, height: size, transition: 'border-color 500ms ease', ...c }}
        />
      ))}
    </>
  )
}

/* ── Sección ─────────────────────────────────────────────────────── */

export function AgentSelect() {
  const [active, setActive] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [ready, setReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)

  /* Parallax + push de cámara, escritos directo sobre el nodo: si esto pasara
     por estado, cada píxel de movimiento del mouse re-renderizaría la sección. */
  const cam = useRef({ x: 0, y: 0, scale: 1 })
  const paintCam = useCallback(() => {
    const el = bgRef.current
    if (!el) return
    const { x, y, scale } = cam.current
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  }, [])

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  /* Portátiles de 768–800px de alto: la ficha del operador es más alta que
     el escenario y empuja el roster fuera de pantalla. En esos casos se
     compactan paddings y tipografía en vez de encoger las cards. */
  const short = useMediaQuery('(max-height: 880px)')
  const rich = isDesktop && !reduced

  const agent = AGENTS[active]
  const accent = ACCENT
  const name = useScramble(agent.name, swaps, !reduced)

  /* Reveal de entrada */
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 40)
    return () => window.clearTimeout(t)
  }, [])

  /* Un solo punto de cambio de agente. Sin setState anidado: React 19 puede
     reejecutar el updater y duplicaría los efectos secundarios. */
  const select = useCallback(
    (next: number, scrollToStage = false) => {
      const target = ((next % AGENTS.length) + AGENTS.length) % AGENTS.length
      if (target === activeRef.current) return
      activeRef.current = target
      setActive(target)
      setSwaps((s) => s + 1)

      // Empujón de cámara: el fondo entra con un golpe de zoom y se asienta
      const el = bgRef.current
      if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.style.transition = 'none'
        cam.current.scale = 1.07
        paintCam()
        requestAnimationFrame(() => {
          el.style.transition = 'transform 1100ms cubic-bezier(0.16,1,0.3,1)'
          cam.current.scale = 1
          paintCam()
        })
      }

      // En móvil las cards viven al fondo: al tocar una, subir al escenario
      if (scrollToStage && stageRef.current && window.innerWidth < 1024) {
        stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    [paintCam]
  )

  /* Parallax con el mouse — solo desktop, y sin re-render */
  useEffect(() => {
    if (!rich) return
    const el = sectionRef.current
    if (!el) return
    let raf = 0
    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        cam.current.x = -nx * 26
        cam.current.y = -ny * 16
        paintCam()
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [rich, paintCam])

  /* Estable: lee el índice del ref, no del estado, para no recrearse en cada cambio */
  const step = useCallback((delta: number) => select(activeRef.current + delta), [select])

  /* ¿La sección está en pantalla? Se registra una sola vez: si el observer se
     recreara en cada cambio de agente, volvería a arrancar en false y se
     comerían las pulsaciones hechas durante esa ventana. */
  const inViewRef = useRef(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        inViewRef.current = e.intersectionRatio > 0.3
      },
      { threshold: [0, 0.3, 1] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Flechas del teclado — también se registra una sola vez */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!inViewRef.current) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowLeft') {
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

  /* "Conecta. Persuade. Cierra." → tres líneas, la del medio en acento */
  const taglineLines = (agent.taglineShort ?? agent.tagline)
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)

  const reveal = (delay: number): React.CSSProperties =>
    reduced ? {} : { animation: `sel-reveal 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms backwards` }

  return (
    <section
      ref={sectionRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative overflow-hidden"
      style={{
        paddingTop: 'var(--nav-h)',
        minHeight: '100svh',
        background: '#050505',
        // @ts-expect-error — variable CSS propia
        '--acc': accent,
      }}
      aria-roledescription="Selector de agente"
    >
      {/* ── Capas de fondo ──────────────────────────────────────── */}

      {/* Escenario del agente activo, con crossfade + parallax + push de cámara */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, willChange: 'transform' }}>
        {AGENTS.map((a, i) => (
          <div
            key={a.id}
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: '-4%',
              opacity: i === active ? 0.62 : 0,
              transition: 'opacity 720ms ease',
            }}
          >
            {a.stageBg && (
              <Image
                src={a.stageBg}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.82) saturate(1.1)' }}
                priority={i === 0}
              />
            )}
          </div>
        ))}
      </div>

      {/* Degradado inferior para asentar las cards sobre el fondo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: 'linear-gradient(180deg, rgba(5,5,5,0.55) 0%, transparent 22%, transparent 58%, rgba(5,5,5,0.9) 100%)' }}
      />

      {/* Retícula con deriva. La máscara vive en el padre estático y solo el
          hijo se mueve, así el navegador compone en vez de repintar. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex: 1,
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 55%, #000 20%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 55%, #000 20%, transparent 78%)',
        }}
      >
        <div
          className={rich ? 'animate-sel-drift' : ''}
          style={{
            position: 'absolute',
            inset: -72,
            backgroundImage: `linear-gradient(${accent}0f 1px, transparent 1px), linear-gradient(90deg, ${accent}0f 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            willChange: rich ? 'transform' : undefined,
          }}
        />
      </div>

      {/* Halo de acento tras el personaje */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `radial-gradient(ellipse 42% 55% at 50% 62%, ${accent}2e, transparent 68%)`,
          transition: 'background 650ms ease',
        }}
      />

      {/* Brasas */}
      <EmberField accent={accent} active={rich} />

      {/* Líneas de escaneo del monitor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Viñeta */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3, background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(5,5,5,0.85) 100%)' }}
      />

      {/* Destello al cambiar de agente */}
      {swaps > 0 && !reduced && (
        <div
          key={swaps}
          aria-hidden
          className="absolute inset-0 pointer-events-none animate-sel-flash"
          style={{ zIndex: 4, background: `radial-gradient(ellipse 40% 45% at 50% 60%, ${accent}55, transparent 70%)` }}
        />
      )}

      {/* ── Contenido ───────────────────────────────────────────── */}

      <div
        className="relative flex flex-col"
        style={{ zIndex: 5, minHeight: 'calc(100svh - var(--nav-h))', padding: `${short ? 16 : 40}px var(--section-px) 0` }}
      >
        <div
          className="w-full mx-auto flex-1 grid items-center gap-x-8"
          style={{
            maxWidth: 1500,
            gridTemplateColumns: isDesktop ? 'minmax(210px,0.85fr) minmax(0,1.5fr) minmax(250px,0.95fr)' : '1fr',
          }}
        >
          {/* ── Columna izquierda: título ── */}
          <div className={isDesktop ? '' : 'text-center'} style={ready ? reveal(60) : { opacity: 0 }}>
            <p className="text-label mb-3" style={{ color: accent, transition: 'color 500ms ease' }}>
              División IA
            </p>
            <h1 className="text-d1" style={{ lineHeight: 0.86 }}>
              Operadores
            </h1>
            <p
              className="font-display font-bold uppercase mt-1"
              style={{ fontSize: 'clamp(18px,2.2vw,30px)', letterSpacing: '0.04em', color: 'var(--gray-1)' }}
            >
              Elige tu agente
            </p>
            <p className="mt-5" style={{ color: 'var(--gray-1)', fontSize: 14, maxWidth: 300, marginInline: isDesktop ? undefined : 'auto' }}>
              Cinco inteligencias especializadas.
              <br />
              Un solo objetivo: hacer crecer tu negocio.
            </p>

            {/* Contador de operadores */}
            <div className={`mt-7 flex items-center gap-2.5 ${isDesktop ? '' : 'justify-center'}`}>
              <span
                className={reduced ? '' : 'animate-sel-online'}
                style={{ width: 7, height: 7, borderRadius: '50%', background: accent, color: accent, transition: 'background 500ms ease' }}
              />
              <span className="font-display font-bold uppercase" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--gray-1)' }}>
                {AGENTS.length} operadores disponibles
              </span>
            </div>

            {/* Barra de progreso segmentada */}
            <div className={`mt-3 flex gap-1.5 ${isDesktop ? '' : 'justify-center'}`}>
              {AGENTS.map((a, i) => (
                <span
                  key={a.id}
                  style={{
                    width: i === active ? 34 : 18,
                    height: 3,
                    background: i === active ? accent : 'var(--gray-3)',
                    transition: 'width 400ms var(--ease-out), background 400ms ease',
                  }}
                />
              ))}
            </div>

            {/* Pista de teclado */}
            {isDesktop && (
              <p className="mt-6 font-display uppercase" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--gray-2)' }}>
                <kbd style={{ border: '1px solid var(--gray-3)', padding: '1px 5px', marginRight: 4 }}>←</kbd>
                <kbd style={{ border: '1px solid var(--gray-3)', padding: '1px 5px', marginRight: 8 }}>→</kbd>
                para cambiar de operador
              </p>
            )}
          </div>

          {/* ── Columna central: escenario ── */}
          <div
            ref={stageRef}
            className="relative flex items-end justify-center"
            style={{ height: isDesktop ? (short ? 'min(40vh, 330px)' : 'min(42vh, 400px)') : 'min(38vh, 330px)', marginTop: isDesktop ? 0 : 24 }}
          >
            {/* Encuadre HUD */}
            <div className="absolute pointer-events-none" style={{ inset: '-2% 6% 4% 6%' }}>
              <Brackets accent={`${accent}88`} size={isDesktop ? 28 : 18} />
            </div>

            {/* Haz de luz cenital sobre el operador */}
            {!reduced && (
              <span
                aria-hidden
                className="absolute animate-sel-spot pointer-events-none"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '-6%',
                  width: 'min(58%, 300px)',
                  height: '86%',
                  background: `linear-gradient(180deg, ${accent}3a 0%, ${accent}22 28%, ${accent}12 52%, ${accent}08 72%, transparent 92%)`,
                  clipPath: 'polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)',
                }}
              />
            )}

            {/* Chispas cayendo dentro del haz */}
            {rich &&
              [0, 1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute animate-sel-spark pointer-events-none"
                  style={{
                    left: `${40 + ((i * 37) % 22)}%`,
                    top: '8%',
                    width: 2,
                    height: 2,
                    borderRadius: '50%',
                    background: accent,
                    boxShadow: `0 0 6px ${accent}`,
                    animationDelay: `${i * 430}ms`,
                  }}
                />
              ))}

            {/* Onda de choque al seleccionar */}
            {swaps > 0 && !reduced && (
              <span
                key={`shock-${swaps}`}
                aria-hidden
                className="absolute animate-sel-shock pointer-events-none"
                style={{
                  left: '50%',
                  bottom: -20,
                  width: 'min(78%, 400px)',
                  aspectRatio: '3.4 / 1',
                  borderRadius: '50%',
                  border: `2px solid ${accent}`,
                  boxShadow: `0 0 26px ${accent}70`,
                }}
              />
            )}

            {/* Anillos del podio */}
            {!reduced &&
              [0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute animate-sel-ring"
                  style={{
                    left: '50%',
                    bottom: 6,
                    width: 'min(88%, 460px)',
                    aspectRatio: '3.4 / 1',
                    borderRadius: '50%',
                    border: `1px solid ${accent}`,
                    animationDelay: `${i * 1.06}s`,
                    transition: 'border-color 500ms ease',
                  }}
                />
              ))}

            {/* Disco del podio */}
            <span
              aria-hidden
              className={`absolute ${reduced ? '' : 'animate-sel-podium'}`}
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: 0,
                width: 'min(72%, 380px)',
                height: 74,
                borderRadius: '50%',
                background: `radial-gradient(ellipse at 50% 50%, ${accent}66, ${accent}18 45%, transparent 72%)`,
                transition: 'background 600ms ease',
              }}
            />

            {/* Resplandor tras el operador — hermano estático en vez de una
                segunda drop-shadow, que se recalcularía en cada fotograma
                porque el personaje flota */}
            <span
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                bottom: '4%',
                transform: 'translateX(-50%)',
                width: 'min(70%, 340px)',
                height: '62%',
                background: `radial-gradient(ellipse at 50% 55%, ${accent}34, ${accent}12 42%, transparent 72%)`,
                zIndex: 1,
              }}
            />

            {/* Personaje activo */}
            <div
              key={agent.id}
              className={`relative flex items-end justify-center ${reduced ? '' : 'animate-sel-enter'}`}
              style={{ height: '96%', zIndex: 2 }}
            >
              <div className={rich ? 'animate-sel-float' : ''} style={{ height: '100%', position: 'relative' }}>
                <Image
                  src={agent.image}
                  alt={`${agent.name} — ${agent.role}`}
                  width={620}
                  height={930}
                  priority
                  sizes="(max-width: 1023px) 70vw, 40vw"
                  className="object-contain object-bottom"
                  style={{
                    height: '100%',
                    width: 'auto',
                    maxWidth: '100%',
                    filter: `drop-shadow(0 18px 34px ${accent}55)`,
                  }}
                />
                {/* Barrido de escaneo al seleccionar */}
                {!reduced && (
                  <span
                    key={swaps}
                    aria-hidden
                    className="absolute inset-x-0 animate-sel-scan"
                    style={{
                      top: 0,
                      height: '18%',
                      background: `linear-gradient(180deg, transparent, ${accent}40 45%, ${accent}90 50%, ${accent}40 55%, transparent)`,
                      mixBlendMode: 'screen',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Flechas de navegación */}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Operador anterior"
              className="absolute group"
              style={{ left: 0, top: '48%', zIndex: 3, width: 46, height: 46, borderRadius: '50%', border: '1px solid var(--gray-3)', background: 'rgba(8,8,8,0.55)', backdropFilter: 'blur(6px)', transition: 'all 260ms var(--ease-out)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent
                e.currentTarget.style.boxShadow = `0 0 22px ${accent}60`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span className="block" style={{ fontSize: 19, lineHeight: '44px', color: 'var(--white)' }}>←</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Operador siguiente"
              className="absolute"
              style={{ right: 0, top: '48%', zIndex: 3, width: 46, height: 46, borderRadius: '50%', border: '1px solid var(--gray-3)', background: 'rgba(8,8,8,0.55)', backdropFilter: 'blur(6px)', transition: 'all 260ms var(--ease-out)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent
                e.currentTarget.style.boxShadow = `0 0 22px ${accent}60`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span className="block" style={{ fontSize: 19, lineHeight: '44px', color: 'var(--white)' }}>→</span>
            </button>
          </div>

          {/* ── Columna derecha: ficha del operador ── */}
          <div
            className={isDesktop ? 'relative' : 'relative text-center mt-8'}
            style={ready ? reveal(160) : { opacity: 0 }}
          >
            <div key={agent.id} style={reduced ? {} : { animation: 'sel-reveal 520ms cubic-bezier(0.16,1,0.3,1) backwards' }}>
              <p className="font-display font-bold uppercase" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--gray-1)' }}>
                {agent.unitCode}
              </p>
              <p className="text-label mt-1" style={{ color: accent, transition: 'color 500ms ease' }}>
                {agent.role}
              </p>

              <h2 className="text-d2 mt-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {name}
              </h2>

              <div className={`flex items-center gap-2 mt-2 ${isDesktop ? '' : 'justify-center'}`}>
                <span
                  className={reduced ? '' : 'animate-sel-online'}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: agent.classification === 'elite' ? accent : '#3ECF6B',
                    color: agent.classification === 'elite' ? accent : '#3ECF6B',
                  }}
                />
                <span className="font-display font-bold uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--gray-1)' }}>
                  {agent.classification === 'elite' ? 'Élite' : 'Online'}
                </span>
              </div>

              <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}, transparent)`, margin: short ? '11px 0 12px' : '18px 0 20px', transition: 'background 500ms ease' }} />

              {/* Lema en tres tiempos */}
              <div className="font-display font-black uppercase" style={{ fontSize: short ? 'clamp(17px,1.6vw,21px)' : 'clamp(20px,2vw,27px)', lineHeight: 1.08 }}>
                {taglineLines.map((line, i) => (
                  <div
                    key={line}
                    style={{
                      color: i === 1 ? accent : 'var(--white)',
                      transition: 'color 500ms ease',
                      ...(reduced ? {} : { animation: `sel-reveal 500ms cubic-bezier(0.16,1,0.3,1) ${i * 90}ms backwards` }),
                    }}
                  >
                    {line}.
                  </div>
                ))}
              </div>

              <p style={{ marginTop: short ? 10 : 20, color: 'var(--gray-1)', fontSize: short ? 13 : 14, lineHeight: 1.5, maxWidth: 330, marginInline: isDesktop ? undefined : 'auto' }}>
                {agent.description}
              </p>

              <Link
                href={`/agentes/${agent.id}`}
                className="btn-clip inline-flex items-center gap-2.5 font-display font-bold uppercase"
                style={{
                  marginTop: short ? 14 : 28,
                  background: accent,
                  color: '#fff',
                  padding: short ? '11px 22px' : '14px 26px',
                  fontSize: 13,
                  letterSpacing: '0.13em',
                  transition: 'background 500ms ease, box-shadow 260ms ease, transform 260ms var(--ease-out)',
                  boxShadow: `0 12px 34px -12px ${accent}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = `0 18px 42px -10px ${accent}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = `0 12px 34px -12px ${accent}`
                }}
              >
                Activar agente <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Indicadores verticales */}
            {isDesktop && (
              <div className="absolute flex flex-col gap-3" style={{ right: -26, top: '50%', transform: 'translateY(-50%)' }}>
                {AGENTS.map((a, i) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`Seleccionar ${a.name}`}
                    aria-current={i === active}
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      border: `1px solid ${i === active ? accent : 'var(--gray-2)'}`,
                      background: i === active ? accent : 'transparent',
                      boxShadow: i === active ? `0 0 10px ${accent}` : 'none',
                      transition: 'all 350ms var(--ease-out)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Fila de cards ───────────────────────────────────────── */}
        <div
          className="w-full mx-auto"
          style={{ maxWidth: 1500, marginTop: short ? 14 : 'clamp(20px,3vh,38px)', ...(ready ? reveal(260) : { opacity: 0 }) }}
        >
          <div
            className="flex gap-3 lg:grid"
            style={{
              gridTemplateColumns: 'repeat(5, minmax(0,1fr))',
              overflowX: isDesktop ? undefined : 'auto',
              scrollSnapType: isDesktop ? undefined : 'x mandatory',
              paddingBottom: isDesktop ? 0 : 6,
              scrollbarWidth: 'none',
            }}
          >
            {AGENTS.map((a, i) => {
              const on = i === active
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => select(i, true)}
                  aria-label={`${a.name}, ${a.role}`}
                  aria-current={on}
                  className="group relative overflow-hidden shrink-0 lg:shrink text-left"
                  style={{
                    width: isDesktop ? '100%' : 176,
                    // 5/6 es la proporción exacta de los roster-*.jpg, así que
                    // object-cover no recorta nada. El tope de alto evita que en
                    // pantallas anchas y bajas las cards empujen al HUD fuera.
                    aspectRatio: '5 / 6',
                    maxHeight: isDesktop ? (short ? 'min(31vh, 260px)' : 'min(34vh, 340px)') : undefined,
                    scrollSnapAlign: 'center',
                    border: `1px solid ${on ? accent : 'var(--border)'}`,
                    background: '#0a0a0a',
                    transform: on ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: on ? `0 18px 38px -18px ${accent}, inset 0 0 34px -16px ${accent}` : 'none',
                    transition: 'transform 380ms var(--ease-out), box-shadow 380ms ease, border-color 380ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!on) e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    if (!on) e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {(a.rosterImage ?? a.cardImage) && (
                    <Image
                      src={(a.rosterImage ?? a.cardImage)!}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) 180px, 20vw"
                      className="object-cover"
                      style={{
                        // Cuando el tope de alto obliga a recortar, que se pierda
                        // torso y no cabeza
                        objectPosition: 'center 28%',
                        filter: on ? 'saturate(1.15) brightness(0.95)' : 'grayscale(0.75) brightness(0.5)',
                        transform: on ? 'scale(1.05)' : 'scale(1)',
                        transition: 'filter 450ms ease, transform 600ms var(--ease-out)',
                      }}
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.5) 0%, transparent 32%, rgba(8,8,8,0.55) 68%, rgba(8,8,8,0.95) 100%)' }}
                  />

                  {/* Barra de energía recorriendo la card activa */}
                  {on && !reduced && (
                    <span
                      aria-hidden
                      className="absolute animate-sel-beam"
                      style={{
                        top: 0,
                        left: 0,
                        width: '35%',
                        height: 2,
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                      }}
                    />
                  )}

                  {on && <Brackets accent={accent} size={14} />}

                  <span
                    className="absolute font-display font-bold uppercase"
                    style={{
                      top: 8,
                      left: 8,
                      fontSize: 9,
                      letterSpacing: '0.14em',
                      color: on ? accent : 'var(--gray-1)',
                      transition: 'color 380ms ease',
                    }}
                  >
                    {a.unitCode}
                  </span>

                  <span className="absolute" style={{ left: 12, right: 12, bottom: 12 }}>
                    <span className="block font-display font-black uppercase" style={{ fontSize: 20, lineHeight: 1 }}>
                      {a.name}
                    </span>
                    <span
                      className="block font-display font-bold uppercase mt-1"
                      style={{ fontSize: 10, letterSpacing: '0.12em', color: on ? accent : 'var(--gray-1)', transition: 'color 380ms ease' }}
                    >
                      {a.role}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Barra HUD inferior ──────────────────────────────────── */}
        <div
          className="w-full mx-auto flex items-center gap-3"
          style={{ maxWidth: 1500, padding: short ? '10px 0 12px' : 'clamp(14px,2vh,22px) 0 clamp(16px,2.4vh,26px)' }}
          aria-hidden
        >
          <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${accent}55)`, transition: 'background 500ms ease' }} />
          <span className="hidden sm:flex gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={reduced ? '' : 'animate-sel-tick'}
                style={{ width: 2, height: i % 3 === 0 ? 9 : 5, background: accent, animationDelay: `${i * 105}ms`, transition: 'background 500ms ease' }}
              />
            ))}
          </span>
          <span
            className="font-display font-bold uppercase whitespace-nowrap"
            style={{ fontSize: 10, letterSpacing: '0.34em', color: 'var(--gray-2)' }}
          >
            Blitz AI Division
          </span>
          <span className="hidden sm:flex gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={reduced ? '' : 'animate-sel-tick'}
                style={{ width: 2, height: i % 3 === 0 ? 9 : 5, background: accent, animationDelay: `${(13 - i) * 105}ms`, transition: 'background 500ms ease' }}
              />
            ))}
          </span>
          <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accent}55, transparent)`, transition: 'background 500ms ease' }} />
        </div>
      </div>
    </section>
  )
}
