'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/* ══════════════════════════════════════════════════════════════════
   Fondo de "Tu negocio tiene fugas".

   No es una foto de adorno: es el centro de operaciones de BLITZ
   escaneando la ciudad. Todo lo que se mueve usa transform u opacity;
   el desenfoque y el ruido van HORNEADOS en el JPEG porque a pantalla
   completa son los dos filtros más caros que existen.
   ══════════════════════════════════════════════════════════════════ */

export function ProblemBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null)
  const capaRef = useRef<HTMLDivElement>(null)
  const lucesRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [entro, setEntro] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setDesktop(window.matchMedia('(min-width: 1024px)').matches)
  }, [])

  /* Entrada y pausa: nada se anima si la sección no está en pantalla */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.intersectionRatio > 0.02)
        if (e.isIntersecting) setEntro(true)
      },
      { threshold: [0, 0.02, 0.3] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Parallax pesado. Se escribe sobre el nodo, nunca por estado. La capa de
     luces va un poco más lejos: ese desfase es lo que da la profundidad. */
  useEffect(() => {
    if (reduced) return
    const el = rootRef.current
    if (!el) return
    let raf = 0
    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const c = capaRef.current
        const l = lucesRef.current
        if (c) {
          c.style.setProperty('--px', `${(-nx * 15).toFixed(1)}px`)
          c.style.setProperty('--py', `${(-ny * 10).toFixed(1)}px`)
        }
        if (l) l.style.transform = `translate3d(${(-nx * 23).toFixed(1)}px, ${(-ny * 16).toFixed(1)}px, 0)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  /* Partículas: poquísimas, lentas y oscuras. Nunca deben llamar la atención. */
  useEffect(() => {
    if (reduced || !visible || !desktop) return
    const cv = canvasRef.current
    if (!cv) return
    const cx = cv.getContext('2d')
    if (!cx) return

    let w = 0
    let h = 0
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

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const ps: P[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: rnd(-0.055, 0.055),
      vy: rnd(-0.075, -0.02),
      r: rnd(0.5, 1.3),
      a: rnd(0.05, 0.16),
    }))

    let raf = 0
    let corriendo = true
    function tick() {
      if (!corriendo) return
      cx!.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -5) {
          p.y = h + 5
          p.x = Math.random() * w
        }
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5
        cx!.fillStyle = `rgba(190,40,40,${p.a})`
        cx!.beginPath()
        cx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        cx!.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onVis = () => {
      if (document.hidden) {
        corriendo = false
        cancelAnimationFrame(raf)
      } else if (!corriendo) {
        corriendo = true
        tick()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      corriendo = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced, visible, desktop])

  /* En móvil solo respira y se oscurece: partículas, scanlines y barrido son
     capas animadas a pantalla completa y ahí no hay GPU que las absorba. */
  const mov = !reduced && visible
  const movCompleto = mov && desktop

  return (
    <div ref={rootRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* ── Capa 1: la ciudad. Entra con fade + zoom y luego respira ── */}
      <div
        ref={capaRef}
        className={`absolute ${mov && entro ? 'animate-ciudad-respira' : ''}`}
        style={{
          inset: -20,
          opacity: entro ? 1 : 0,
          transition: 'opacity 1400ms ease-out',
          transform: entro ? undefined : 'scale(1.03)',
        }}
      >
        <Image
          src="/problema-ciudad.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
      </div>

      {/* ── Capa 2: solo las luces, desfasadas y en screen. El desfase es lo
             que crea la profundidad, sin añadir un elemento visible más ── */}
      {desktop && (
      <div ref={lucesRef} className="absolute" style={{ inset: -28, transition: 'transform 220ms ease-out' }}>
        <div
          className="absolute inset-0"
          style={{ opacity: entro ? 0.1 : 0, transition: 'opacity 1600ms ease-out' }}
        >
          <Image src="/problema-ciudad-luces.jpg" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: 'center 35%' }} />
        </div>
      </div>
      )}

      {/* ── Capas 3+4+5+6 en una sola superficie ──────────────────────
             Glow ambiental, oscurecimiento, radial central y viñeta son
             todos gradientes estáticos. Apilados eran cuatro capas de
             composición a pantalla completa; en un solo background con
             varias paradas cuestan una. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: [
            // viñeta: izquierda, arriba y abajo cargadas
            'linear-gradient(to right, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.35) 22%, transparent 48%)',
            'linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, transparent 26%)',
            'linear-gradient(to top, rgba(5,5,5,0.92) 0%, transparent 30%)',
            // oscurecimiento progresivo desde el centro
            'radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.80) 100%)',
            // glow rojo ambiental, desplazado a la derecha
            'radial-gradient(ellipse 78% 120% at 88% 32%, rgba(229,62,62,0.25), rgba(229,62,62,0.09) 42%, transparent 70%)',
            // velo negro general
            'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))',
          ].join(', '),
        }}
      />

      {/* ── Capa 7: scanlines. El contenedor recorta y el hijo se desplaza por
             transform: animar background-position repinta todo cada frame ── */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div
          className={movCompleto ? 'animate-ciudad-scan' : ''}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '200%',
            opacity: 0.03,
            backgroundImage: 'repeating-linear-gradient(180deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
          }}
        />
      </div>

      {/* ── Capa 8: barrido de IA, cada 14s ── */}
      {movCompleto && (
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden"
        >
          <div
            className="animate-ciudad-barrido"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 140,
              background: 'linear-gradient(180deg, transparent, rgba(229,62,62,0.5) 48%, rgba(255,120,120,0.7) 50%, rgba(229,62,62,0.5) 52%, transparent)',
            }}
          />
        </div>
      )}

      {/* ── Capa 9: partículas ── */}
      {movCompleto && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />}

      {/* ── Capa 10: HUD. Solo en los bordes, nunca bajo el texto ── */}
      <div aria-hidden className="absolute inset-0" style={{ opacity: 0.035 }}>
        <span style={{ position: 'absolute', left: 0, right: 0, top: '13%', height: 1, background: '#E53E3E' }} />
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: '11%', height: 1, background: '#E53E3E' }} />
        <span style={{ position: 'absolute', top: 0, bottom: 0, right: '9%', width: 1, background: '#E53E3E' }} />
        <span style={{ position: 'absolute', right: '9%', top: '13%', width: 7, height: 7, marginTop: -3, marginRight: -3, border: '1px solid #E53E3E' }} />
        <span style={{ position: 'absolute', right: '9%', bottom: '11%', width: 7, height: 7, marginBottom: -3, marginRight: -3, border: '1px solid #E53E3E' }} />
      </div>
    </div>
  )
}
