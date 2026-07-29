'use client'

import Image from 'next/image'
import { CoreBackdrop } from '@/components/ui/CoreBackdrop'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronRight, Radar, MonitorCog, Boxes, Rocket, Clock, Send, Cog, Crosshair } from 'lucide-react'

const ROJO = '#E53E3E'

const STEPS = [
  {
    n: '01',
    title: 'Brief',
    image: '/proceso/brief.jpg',
    desc: 'Hablamos por WhatsApp en 30 minutos. Entendemos tu negocio, tus clientes, tus metas y los dolores que necesitas resolver.',
    metricaLabel: 'Tiempo',
    metrica: '30 min',
    Icono: Radar,
    MetricaIcono: Clock,
  },
  {
    n: '02',
    title: 'Diseño',
    image: '/proceso/diseno.jpg',
    desc: 'Diseñamos el sitio y definimos qué agentes necesitas. Te mostramos el plan antes de escribir una sola línea de código.',
    metricaLabel: 'Entrega',
    metrica: '2 - 5 días',
    Icono: MonitorCog,
    MetricaIcono: Send,
  },
  {
    n: '03',
    title: 'Desarrollo',
    image: '/proceso/desarrollo.jpg',
    desc: 'Construimos con Next.js 15 y Claude IA. Cada agente se configura con el contexto exacto de tu negocio.',
    metricaLabel: 'Tiempo',
    metrica: '3 - 10 días',
    Icono: Boxes,
    MetricaIcono: Cog,
  },
  {
    n: '04',
    title: 'Lanzamiento',
    image: '/proceso/lanzamiento.jpg',
    desc: 'Tu sitio en vivo. Los agentes operando. Seguimiento post-lanzamiento para asegurar que todo funcione.',
    metricaLabel: 'Deploy',
    metrica: '1 - 3 días',
    Icono: Rocket,
    MetricaIcono: Rocket,
  },
]

const HEX = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

/* Nucleo BLITZ: anillos concentricos girando */
function BlitzCore() {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 214, height: 214 }}>
      <div className="absolute inset-0 animate-radar-sweep" style={{ borderRadius: '50%', background: `conic-gradient(from 0deg, ${ROJO}33, transparent 90deg)` }} />
      {[0, 18, 36].map((inset, i) => (
        <div
          key={inset}
          className="absolute"
          style={{
            inset,
            borderRadius: '50%',
            border: `1px solid ${ROJO}${i === 0 ? '55' : i === 1 ? '38' : '22'}`,
          }}
        />
      ))}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ inset: 52, borderRadius: '50%', background: 'rgba(8,8,8,0.94)', border: `1px solid ${ROJO}80`, boxShadow: `0 0 34px -6px ${ROJO}80, inset 0 0 26px -8px ${ROJO}` }}
      >
        <span className="font-display font-black uppercase" style={{ fontSize: 20, color: 'var(--white)', lineHeight: 1, letterSpacing: '0.04em' }}>
          BLITZ
        </span>
        <span className="font-display font-bold uppercase" style={{ fontSize: 10, color: ROJO, letterSpacing: '0.28em', marginTop: 3 }}>
          Core
        </span>
      </div>
    </div>
  )
}

/* Visual de cada fase. La proporción es 4/3, la misma a la que se recortaron
   los archivos, así que object-cover no recorta nada. */
function FaseVisual({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  return (
    <div
      className="fase-visual relative overflow-hidden"
      style={{ aspectRatio: '4 / 3', border: `1px solid ${ROJO}2b`, background: '#070707' }}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw" className="fase-img object-cover" />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, transparent 55%, rgba(7,7,7,0.55) 100%)` }}
      />
      <span className="fase-sweep" aria-hidden style={{ animationDelay: `${delay}ms` }} />
    </div>
  )
}

export function ProcessSection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section-padding relative overflow-hidden" style={{ borderBottom: '1px solid var(--border-2)', background: '#050505' }}>
      <CoreBackdrop />

      <div ref={wrapRef} className="container relative">
        {/* ── Encabezado ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.9fr)] gap-8 lg:gap-10 items-center mb-12">
          <div>
            <span
              className="inline-block font-display font-bold uppercase mb-4"
              style={{ fontSize: 10, letterSpacing: '0.16em', color: ROJO, border: `1px solid ${ROJO}66`, padding: '5px 12px' }}
            >
              Cómo funciona
            </span>
            <h2 className="text-d2 mb-4">
              Del brief al
              <span style={{ color: ROJO, display: 'block' }}>lanzamiento.</span>
            </h2>
            <p className="font-display font-bold uppercase mb-3" style={{ fontSize: 13.5, color: 'var(--white)', letterSpacing: '0.03em' }}>
              Un proceso. 4 fases. <span style={{ color: ROJO }}>Resultados reales.</span>
            </p>
            <p style={{ fontSize: 13, color: 'var(--gray-1)', lineHeight: 1.75, maxWidth: 420 }}>
              Combinamos estrategia, diseño, desarrollo e inteligencia artificial para entregar soluciones digitales que generan impacto.
            </p>
          </div>

          <div className="flex justify-center"><BlitzCore /></div>

          <div style={{ border: `1px solid ${ROJO}40`, background: 'rgba(10,10,10,0.66)' }}>
            <div className="flex items-center justify-end gap-2 px-4 py-2" style={{ borderBottom: `1px solid ${ROJO}26` }}>
              <span className="font-display font-bold uppercase" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: ROJO }}>
                Sistema online
              </span>
              <span className="animate-pulse-dot rounded-full" style={{ width: 6, height: 6, background: ROJO, display: 'inline-block' }} />
            </div>
            <div className="p-5">
              <div className="font-display font-bold uppercase mb-1.5" style={{ fontSize: 10, letterSpacing: '0.12em', color: ROJO }}>
                Nuestro objetivo
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--gray-1)', lineHeight: 1.65 }}>
                Impulsar tu negocio con tecnología, diseño y automatización.
              </p>
              <div className="my-4 h-px" style={{ background: `${ROJO}26` }} />
              <div className="font-display font-bold uppercase mb-1" style={{ fontSize: 10, letterSpacing: '0.12em', color: ROJO }}>
                Entrega promedio
              </div>
              <div className="font-display font-black uppercase" style={{ fontSize: 30, color: 'var(--white)', lineHeight: 1 }}>
                7 - 21 días
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--gray-2)', marginTop: 4 }}>Dependiendo del proyecto</div>
            </div>
          </div>
        </div>

        {/* ── Línea de fases ── */}
        <div className="hidden lg:flex items-center gap-3 mb-5">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-3" style={{ flex: i < STEPS.length - 1 ? 1 : '0 0 auto' }}>
              <div
                className="flex items-center justify-center flex-shrink-0 font-display font-black"
                style={{
                  width: 52, height: 46, clipPath: HEX, background: '#0d0d0d',
                  border: 'none', color: ROJO, fontSize: 15,
                  boxShadow: `0 0 0 1px ${ROJO} inset, 0 0 18px -6px ${ROJO}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'scale(1)' : 'scale(0.8)',
                  transition: `opacity 460ms ease ${i * 140}ms, transform 460ms cubic-bezier(0.16,1,0.3,1) ${i * 140}ms`,
                }}
              >
                {s.n}
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex items-center gap-1 flex-1">
                  <span className="h-px flex-1" style={{ background: `${ROJO}4d` }} />
                  {[0, 1, 2].map((k) => (
                    <ChevronRight
                      key={k}
                      size={11}
                      color={ROJO}
                      className="animate-chevron"
                      style={{ animationDelay: `${i * 260 + k * 130}ms` }}
                    />
                  ))}
                  <span className="h-px flex-1" style={{ background: `${ROJO}4d` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Tarjetas de fase ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="fase-card flex flex-col p-5"
              style={{
                border: `1px solid ${ROJO}40`,
                // algo más opaca: ahora flotan sobre la infraestructura
                background: 'rgba(9,9,10,0.82)',
                clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 520ms ease ${i * 130}ms, transform 520ms cubic-bezier(0.16,1,0.3,1) ${i * 130}ms`,
              }}
            >
              <div className="font-display font-black uppercase text-center mb-4 lg:hidden" style={{ fontSize: 12, color: ROJO }}>
                {s.n}
              </div>
              <h3 className="font-display font-black uppercase text-center mb-4" style={{ fontSize: 20, color: 'var(--white)', lineHeight: 1 }}>
                {s.title}
              </h3>
              <FaseVisual src={s.image} alt={`${s.title} — fase ${s.n} del proceso BLITZ`} delay={i * 900} />
              <p className="text-center flex-1 mt-4 mb-5" style={{ fontSize: 11.5, color: 'var(--gray-1)', lineHeight: 1.65 }}>
                {s.desc}
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${ROJO}26` }}>
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 32, height: 30, clipPath: HEX, background: `${ROJO}1f`, boxShadow: `0 0 0 1px ${ROJO}66 inset` }}
                >
                  <s.MetricaIcono size={14} color={ROJO} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="font-display font-bold uppercase" style={{ fontSize: 8.5, letterSpacing: '0.12em', color: ROJO }}>
                    {s.metricaLabel}
                  </div>
                  <div className="font-display font-black uppercase" style={{ fontSize: 16, color: 'var(--white)', lineHeight: 1.1 }}>
                    {s.metrica}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Barra inferior ── */}
        <div
          className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5 px-6 py-5"
          style={{ border: `1px solid ${ROJO}40`, background: 'rgba(10,10,10,0.6)' }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: 42, height: 38, clipPath: HEX, background: `${ROJO}1f`, boxShadow: `0 0 0 1px ${ROJO}80 inset` }}
          >
            <Crosshair size={18} color={ROJO} strokeWidth={1.8} />
          </div>
          <div style={{ minWidth: 240 }}>
            <div className="font-display uppercase" style={{ fontSize: 11, color: 'var(--gray-2)', letterSpacing: '0.06em' }}>
              No entregamos sitios.
            </div>
            <div className="font-display font-black uppercase" style={{ fontSize: 15, color: ROJO, letterSpacing: '0.02em' }}>
              Entregamos sistemas que trabajan por ti.
            </div>
          </div>

          <div className="flex-1" style={{ minWidth: 200 }}>
            <div className="font-display font-bold uppercase mb-1.5" style={{ fontSize: 9, letterSpacing: '0.14em', color: ROJO }}>
              Progreso
            </div>
            <div className="flex items-center gap-2">
              <span className="flex gap-[3px] flex-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1, height: 11, background: ROJO,
                      opacity: visible ? 1 : 0.15,
                      transition: `opacity 260ms ease ${i * 45}ms`,
                    }}
                  />
                ))}
              </span>
              <span className="font-display font-bold" style={{ fontSize: 11, color: 'var(--white)' }}>100%</span>
            </div>
          </div>

          <div className="hidden xl:block flex-shrink-0">
            <div className="font-display font-bold uppercase mb-0.5" style={{ fontSize: 9, letterSpacing: '0.14em', color: ROJO }}>
              Misión
            </div>
            <div className="font-display font-black uppercase" style={{ fontSize: 13, color: 'var(--white)' }}>Completada</div>
          </div>

          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 font-display font-bold uppercase transition-opacity hover:opacity-85 flex-shrink-0"
            style={{ fontSize: 11.5, letterSpacing: '0.08em', color: ROJO, border: `1px solid ${ROJO}`, padding: '12px 22px' }}
          >
            Hablemos de tu proyecto
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
