'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/* ══════════════════════════════════════════════════════════════════
   BLITZ CORE — entorno de la sección "Del brief al lanzamiento".

   Cuatro capas superpuestas que no deben leerse como fotos sueltas
   sino como un único interior. Todo converge hacia el núcleo central.

   El blur de la infraestructura va HORNEADO en el archivo: a pantalla
   completa es de los filtros más caros que existen.
   ══════════════════════════════════════════════════════════════════ */

export function CoreBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [entro, setEntro] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setDesktop(window.matchMedia('(min-width: 1024px)').matches)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.intersectionRatio > 0.02)
        if (e.isIntersecting) setEntro(true)
      },
      { threshold: [0, 0.02, 0.25] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Micro parallax: apenas unos píxeles, escrito sobre el nodo */
  useEffect(() => {
    if (reduced || !desktop) return
    const el = rootRef.current
    if (!el) return
    let raf = 0
    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const p = parallaxRef.current
        if (p) {
          p.style.setProperty('--mx', `${(-nx * 9).toFixed(1)}px`)
          p.style.setProperty('--my', `${(-ny * 6).toFixed(1)}px`)
        }
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced, desktop])

  const mov = !reduced && visible
  const movDesktop = mov && desktop

  return (
    <div ref={rootRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* ── Entorno base: infraestructura + textura de datos + suelo
             tecnológico ya mezclados en un solo archivo. En el navegador eran
             tres superficies del tamaño del viewport superpuestas y costaban
             16 fps medidos; fusionadas cuestan una. El anillo central de la
             infraestructura y las líneas en fuga del suelo siguen dirigiendo
             la mirada al núcleo. ── */}
      <div
        ref={parallaxRef}
        className={`absolute ${movDesktop ? 'animate-core-deriva' : ''}`}
        style={{ inset: -14, opacity: entro ? 1 : 0, transition: 'opacity 2000ms ease-out' }}
      >
        <Image src="/core/core-entorno.jpg" alt="" fill sizes="100vw" priority className="object-cover" style={{ objectPosition: 'center 45%' }} />
      </div>

      {/* ── 5. Capa energética. Centrada sobre el núcleo, respirando a 35s ── */}
      <div
        className={`absolute ${mov ? 'animate-core-respira' : ''}`}
        style={{
          left: '50%',
          top: '46%',
          width: 'min(112%, 1180px)',
          aspectRatio: '3 / 2',
          transform: 'translate(-50%, -50%)',
          opacity: entro ? 0.34 : 0,
          transition: 'opacity 2600ms ease-out',
        }}
      >
        <Image src="/core/core-energia.webp" alt="" fill sizes="100vw" className="object-contain" />
      </div>

      {/* El halo del núcleo va horneado en el entorno: como capa aparte
          costaba 11 fps medidos y la respiración ya la da la capa energética,
          que está centrada sobre el mismo punto. */}

      {/* ── Trazas de energía subiendo del suelo al núcleo. Son lo que hace
             VISIBLE que la infraestructura lo alimenta: las animaciones de 45s
             sobre unos pocos píxeles quedaban por debajo del umbral de
             percepción (medido: 1.4% de píxeles cambiaban en 3s). ── */}
      {mov &&
        [
          { x: '22%', d: 0, h: 34 },
          { x: '38%', d: 3400, h: 26 },
          { x: '61%', d: 1700, h: 30 },
          { x: '76%', d: 6200, h: 22 },
        ].map((t) => (
          <span
            key={t.x}
            aria-hidden
            className="absolute animate-core-traza"
            style={{
              left: t.x,
              bottom: '4%',
              width: 3,
              height: `${t.h}%`,
              transformOrigin: 'bottom center',
              animationDelay: `${t.d}ms`,
              background: 'linear-gradient(to top, transparent, rgba(229,62,62,0.9), rgba(255,170,170,1) 82%, transparent)',
              boxShadow: '0 0 14px 3px rgba(229,62,62,0.55)',
              filter: 'blur(0.4px)',
            }}
          />
        ))}

      {/* ── Halo del núcleo. Área grande a propósito: el ojo detecta antes un
             pulso amplio y tenue que un borde fino, por muy brillante que sea ── */}
      {movDesktop && (
        <span
          aria-hidden
          className="absolute animate-core-halo"
          style={{
            left: '50%',
            top: '43%',
            width: 'min(120%, 1250px)',
            height: 'min(95%, 780px)',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(229,62,62,0.3), rgba(229,62,62,0.1) 38%, transparent 66%)',
          }}
        />
      )}

      {/* ── Anillo del núcleo, latiendo a 9s ── */}
      {movDesktop && (
        <span
          aria-hidden
          className="absolute animate-core-anillo"
          style={{
            left: '50%',
            top: '44%',
            width: 'min(46%, 460px)',
            aspectRatio: '2.4 / 1',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '1px solid rgba(229,62,62,0.55)',
            boxShadow: '0 0 34px -6px rgba(229,62,62,0.5), inset 0 0 40px -14px rgba(229,62,62,0.6)',
          }}
        />
      )}

      {/* ── Cierre: viñeta y asiento del texto en una sola superficie ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(7,7,7,0.92) 0%, transparent 24%)',
            'linear-gradient(to top, rgba(7,7,7,0.9) 0%, transparent 26%)',
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 42%, rgba(7,7,7,0.72) 100%)',
          ].join(', '),
        }}
      />
    </div>
  )
}
