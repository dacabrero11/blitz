'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

const FEATURES = [
  { icon: '/icons/icon-robot.png', label: 'Agentes IA', sub: 'Atención 24/7' },
  { icon: '/icons/icon-barchart2.png', label: 'Sistemas', sub: 'Que escalan' },
  { icon: '/icons/icon-rocket.png', label: 'Resultados', sub: 'Que impulsan' },
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-wordmark', { opacity: 0, scale: 0.86, duration: 1.1, delay: 0.2, ease: 'back.out(1.6)' })
      gsap.from('.hero-tagline', { opacity: 0, y: 16, duration: 0.8, delay: 0.8, ease: 'power3.out' })
      gsap.from('.hero-features > div', { opacity: 0, y: 20, duration: 0.6, delay: 1.05, stagger: 0.1, ease: 'power3.out' })
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, delay: 1.4, ease: 'power3.out' })
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
        style={{ objectFit: 'cover', objectPosition: 'center 30%', zIndex: 0 }}
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
        {/* Wordmark — as large as the layout allows, with a pulsing electric glow */}
        <div className="hero-wordmark animate-wordmark-glow" style={{ width: 'clamp(260px, 46vw, 720px)', marginLeft: -6 }}>
          <Image
            src="/blitz-wordmark.png"
            alt="BLITZ"
            width={1054}
            height={497}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p
          className="hero-tagline font-display font-bold uppercase"
          style={{
            color: 'var(--red)',
            fontSize: 'clamp(22px, 4.4vw, 46px)',
            lineHeight: 1.05,
            letterSpacing: '0.01em',
            maxWidth: 'clamp(260px, 46vw, 720px)',
            marginTop: 'clamp(4px, 1vw, 14px)',
            marginBottom: 'clamp(28px, 3.5vw, 44px)',
          }}
        >
          Automatiza. Conecta. Crece.
        </p>

        <div
          className="hero-features flex flex-wrap items-start"
          style={{ gap: 'clamp(24px, 3.5vw, 52px)', marginBottom: 'clamp(32px, 4vw, 48px)' }}
        >
          {FEATURES.map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center" style={{ gap: 14 }}>
              <div className="flex-shrink-0 relative" style={{ width: 56, height: 56 }}>
                <Image src={icon} alt="" fill style={{ objectFit: 'contain' }} />
              </div>
              <div>
                <div className="font-display font-bold uppercase leading-tight" style={{ fontSize: 17, color: 'var(--white)' }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--gray-2)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-cta">
          <button
            onClick={scrollToNext}
            className="inline-flex items-center gap-3 font-display font-bold uppercase transition-all hover:bg-[rgba(229,62,62,0.1)]"
            style={{
              border: '1px solid var(--red)',
              color: 'var(--red)',
              fontSize: 15,
              padding: '16px 32px',
              borderRadius: 999,
              background: 'transparent',
              letterSpacing: '0.03em',
            }}
          >
            El futuro es ahora
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
