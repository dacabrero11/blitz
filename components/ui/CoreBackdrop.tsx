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
          opacity: entro ? 0.2 : 0,
          transition: 'opacity 2600ms ease-out',
        }}
      >
        <Image src="/core/core-energia.webp" alt="" fill sizes="100vw" className="object-contain" />
      </div>

      {/* El halo del núcleo va horneado en el entorno: como capa aparte
          costaba 11 fps medidos y la respiración ya la da la capa energética,
          que está centrada sobre el mismo punto. */}

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
