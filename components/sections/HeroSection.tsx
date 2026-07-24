'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { MessageCircle, BarChart3, Rocket, ArrowRight } from 'lucide-react'

const FEATURES = [
  { icon: MessageCircle, label: 'Agentes IA', sub: 'Atención 24/7' },
  { icon: BarChart3, label: 'Sistemas', sub: 'Que escalan' },
  { icon: Rocket, label: 'Resultados', sub: 'Que impulsan' },
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power3.out' })
      gsap.from('.hero-wordmark', { opacity: 0, scale: 0.86, duration: 1.1, delay: 0.4, ease: 'back.out(1.6)' })
      gsap.from('.hero-tagline', { opacity: 0, y: 16, duration: 0.8, delay: 1, ease: 'power3.out' })
      gsap.from('.hero-features > div', { opacity: 0, y: 20, duration: 0.6, delay: 1.25, stagger: 0.1, ease: 'power3.out' })
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, delay: 1.6, ease: 'power3.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  function scrollToNext() {
    document.getElementById('siguiente-seccion')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex flex-col justify-center"
      style={{
        minHeight: '100svh',
        paddingTop: 'calc(var(--nav-h) + 40px)',
        paddingBottom: 56,
        paddingLeft: 'var(--section-px)',
        paddingRight: 'var(--section-px)',
        background: '#080808',
      }}
    >
      <Image
        src="/hero-bg.jpg"
        alt="BLITZ — Agentes IA"
        fill
        className="pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        priority
      />

      {/* Legibility overlay: darkens left side for text, keeps right side of the image visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.8) 32%, rgba(8,8,8,0.2) 62%, rgba(8,8,8,0.35) 100%)',
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.85) 0%, transparent 35%)', zIndex: 1 }}
      />

      <div className="absolute left-0 right-0 pointer-events-none animate-scanline" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(229,62,62,0.6), transparent)', zIndex: 2 }} />

      {/* Content */}
      <div className="relative z-10 max-w-[760px]">
        <div
          className="hero-tag inline-flex items-center gap-2 mb-5"
          style={{ background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.25)', padding: '5px 12px' }}
        >
          <span className="animate-pulse-dot rounded-full" style={{ width: 5, height: 5, background: 'var(--red)', display: 'inline-block' }} />
          <span className="text-label" style={{ fontSize: 10 }}>Agentes IA · El Salvador</span>
        </div>

        {/* Wordmark — as large as the layout allows, with a pulsing electric glow */}
        <div className="hero-wordmark animate-wordmark-glow" style={{ width: 'clamp(260px, 46vw, 720px)', marginLeft: -6 }}>
          <Image
            src="/blitz-wordmark.png"
            alt="BLITZ"
            width={1492}
            height={1022}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p
          className="hero-tagline font-display font-bold uppercase"
          style={{
            color: 'var(--red)',
            fontSize: 'clamp(15px, 2vw, 24px)',
            letterSpacing: '0.02em',
            marginTop: 'clamp(4px, 1vw, 12px)',
            marginBottom: 'clamp(24px, 3vw, 40px)',
            whiteSpace: 'nowrap',
          }}
        >
          Automatiza. Conecta. Crece.
        </p>

        <div className="hero-features flex flex-wrap gap-x-8 gap-y-4 mb-9">
          {FEATURES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  background: 'var(--black)',
                  border: '1px solid var(--red)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                }}
              >
                <Icon size={18} color="var(--red)" strokeWidth={2} />
              </div>
              <div>
                <div className="font-display font-bold uppercase leading-tight" style={{ fontSize: 14, color: 'var(--white)' }}>
                  {label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-2)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-cta">
          <button
            onClick={scrollToNext}
            className="inline-flex items-center gap-3 font-display font-bold text-sm tracking-wide uppercase transition-all hover:bg-[rgba(229,62,62,0.1)]"
            style={{
              border: '1px solid var(--red)',
              color: 'var(--red)',
              padding: '14px 28px',
              borderRadius: 999,
              background: 'transparent',
            }}
          >
            El futuro es ahora
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
