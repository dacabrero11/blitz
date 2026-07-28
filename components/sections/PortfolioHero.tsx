'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Inbox, TrendingUp, Share2 } from 'lucide-react'
import { CASO_DESTACADO, METRICAS_HERO } from '@/lib/portfolio'
import { PfCorners } from '@/components/ui/PfCorners'
import { TiltPanel } from '@/components/ui/TiltPanel'

const ICONOS = { inbox: Inbox, trend: TrendingUp, share: Share2 }

/** Cuenta de 0 al valor final al entrar en pantalla, conservando el sufijo. */
function Contador({ valor, delay = 0 }: { valor: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [texto, setTexto] = useState(valor.replace(/\d+/, '0'))
  const hecho = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTexto(valor)
      return
    }
    const objetivo = parseInt(valor.match(/\d+/)?.[0] ?? '0', 10)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || hecho.current) return
        hecho.current = true
        io.disconnect()
        const t0 = performance.now()
        const DUR = 1100
        const paso = (t: number) => {
          const p = Math.min(1, (t - t0 - delay) / DUR)
          if (p < 0) {
            requestAnimationFrame(paso)
            return
          }
          const suave = 1 - Math.pow(1 - p, 3)
          setTexto(valor.replace(/\d+/, String(Math.round(objetivo * suave))))
          if (p < 1) requestAnimationFrame(paso)
        }
        requestAnimationFrame(paso)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [valor, delay])

  return <span ref={ref}>{texto}</span>
}

export function PortfolioHero() {
  const [slide, setSlide] = useState(0)
  const vistas = [CASO_DESTACADO.image, ...CASO_DESTACADO.galeria]
  const mover = (d: number) => setSlide((s) => ((s + d) % vistas.length + vistas.length) % vistas.length)

  return (
    <section
      className="relative overflow-hidden portfolio-bg"
      style={{ paddingTop: 'calc(var(--nav-h) + clamp(28px,5vh,60px))', paddingBottom: 'clamp(36px,6vh,72px)' }}
    >
      <span aria-hidden className="portfolio-aurora animate-aurora-1" style={{ left: '-14%', top: '-22%', width: 760, height: 760, background: 'radial-gradient(circle, #E53E3E4d, transparent 70%)' }} />
      <span aria-hidden className="portfolio-aurora animate-aurora-2" style={{ right: '-8%', top: '8%', width: 880, height: 880, background: 'radial-gradient(circle, #E53E3E3d, transparent 68%)' }} />

      <div className="container relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] gap-10 lg:gap-12 items-center">
          {/* ── Izquierda ── */}
          <div>
            <p className="text-label mb-4 animate-pf-in" style={{ color: 'var(--red)' }}>Portafolio</p>
            <h1
              className="font-display font-black uppercase animate-pf-in"
              /* No usa text-d1: a 120px la tinta se metía dentro del panel del
                 caso destacado. Este techo la deja holgada en toda resolución. */
              style={{ fontSize: 'clamp(44px, 6vw, 104px)', lineHeight: 0.85, letterSpacing: '-0.01em', animationDelay: '80ms' }}
            >
              Resultados
              <br />
              <span style={{ color: 'var(--red)' }}>reales.</span>
            </h1>
            <p className="mt-5 animate-pf-in" style={{ color: 'var(--gray-1)', fontSize: 15, lineHeight: 1.65, maxWidth: 330, animationDelay: '160ms' }}>
              Proyectos que generaron impacto.
              <br />
              Soluciones digitales que impulsan negocios.
            </p>

            <div className="mt-9 grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-6">
              {METRICAS_HERO.map((m, i) => (
                <div key={m.label} className="animate-pf-in" style={{ animationDelay: `${240 + i * 70}ms` }}>
                  <div className="font-display font-black" style={{ fontSize: 'clamp(26px,2.5vw,34px)', lineHeight: 1, color: 'var(--red)' }}>
                    <Contador valor={m.valor} delay={i * 90} />
                  </div>
                  <div className="font-display font-bold uppercase mt-1.5" style={{ fontSize: 9.5, letterSpacing: '0.15em', color: 'var(--gray-1)', lineHeight: 1.4 }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Derecha: caso destacado ── */}
          <TiltPanel
            accent="#E53E3E"
            className="relative animate-pf-in pf-panel"
            style={{ animationDelay: '200ms', border: '1px solid rgba(229,62,62,0.26)', background: 'rgba(10,10,11,0.7)', padding: 'clamp(18px,2vw,26px)' }}
          >
            <span className="pf-sweep" aria-hidden />
            <PfCorners />

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 items-center">
              <div>
                <p className="flex items-center gap-2 text-label" style={{ color: 'var(--red)' }}>
                  <span className="animate-pf-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} aria-hidden />
                  Caso destacado
                </p>
                <h2 className="font-display font-black uppercase mt-3" style={{ fontSize: 'clamp(25px,2.6vw,36px)', lineHeight: 0.95 }}>
                  {CASO_DESTACADO.cliente}
                  <br />
                  <span style={{ color: 'var(--red)' }}>{CASO_DESTACADO.nombre}</span>
                </h2>
                <p className="mt-3.5" style={{ color: 'var(--gray-1)', fontSize: 13.5, lineHeight: 1.6 }}>
                  {CASO_DESTACADO.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {CASO_DESTACADO.metricas.map((m, i) => {
                    const Icon = ICONOS[m.icon]
                    return (
                      <div key={m.label} className="flex items-center gap-2 animate-pf-in" style={{ animationDelay: `${420 + i * 90}ms` }}>
                        <Icon size={15} color="var(--red)" strokeWidth={2} />
                        <div>
                          <div className="font-display font-bold" style={{ fontSize: 14, color: 'var(--red)', lineHeight: 1 }}>{m.valor}</div>
                          <div className="font-display font-bold uppercase" style={{ fontSize: 8.5, letterSpacing: '0.13em', color: 'var(--gray-2)' }}>{m.label}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Link
                  href={CASO_DESTACADO.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-clip pf-cta inline-flex items-center gap-2.5 font-display font-bold uppercase mt-6"
                  style={{ background: 'var(--red)', color: '#fff', padding: '12px 22px', fontSize: 11.5, letterSpacing: '0.13em' }}
                >
                  Ver caso completo <ArrowRight size={14} />
                </Link>
              </div>

              {/* Mockup con carrusel */}
              <div>
                <div className="relative overflow-hidden" style={{ border: '1px solid rgba(229,62,62,0.2)', aspectRatio: '16 / 10', background: '#08080a' }}>
                  {vistas.map((src, i) => (
                    <Image
                      key={`${src}-${i}`}
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) 90vw, 46vw"
                      priority={i === 0}
                      className="object-cover object-top"
                      style={{
                        opacity: i === slide ? 1 : 0,
                        transform: i === slide ? 'scale(1)' : 'scale(1.05)',
                        transition: 'opacity 520ms ease, transform 760ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />
                  ))}
                  <span aria-hidden className="pf-scan" />
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button type="button" onClick={() => mover(-1)} aria-label="Vista anterior" className="pf-arrow">
                    <ChevronLeft size={15} />
                  </button>
                  <div className="flex gap-2 flex-1" style={{ minWidth: 0 }}>
                    {vistas.map((src, i) => (
                      <button
                        key={`t-${src}-${i}`}
                        type="button"
                        onClick={() => setSlide(i)}
                        aria-label={`Vista ${i + 1}`}
                        aria-current={i === slide}
                        className="relative overflow-hidden flex-1"
                        style={{
                          aspectRatio: '16 / 10',
                          border: `1px solid ${i === slide ? 'var(--red)' : 'var(--border)'}`,
                          transition: 'border-color 300ms ease, transform 300ms var(--ease-out)',
                          transform: i === slide ? 'translateY(-2px)' : 'none',
                        }}
                      >
                        <Image src={src} alt="" fill sizes="140px" className="object-cover object-top" style={{ opacity: i === slide ? 1 : 0.42, transition: 'opacity 300ms ease' }} />
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => mover(1)} aria-label="Vista siguiente" className="pf-arrow">
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </TiltPanel>
        </div>
      </div>
    </section>
  )
}
