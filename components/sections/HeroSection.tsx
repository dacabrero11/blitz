'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-h1 span', { opacity: 0, y: 40, duration: 1, delay: 0.5, stagger: 0.15, ease: 'power3.out' })
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, delay: 1.1, ease: 'power3.out' })
      gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.8, delay: 1.3, ease: 'power3.out' })
      gsap.from('.hero-stats > div', { opacity: 0, y: 20, duration: 0.6, delay: 1.5, stagger: 0.1, ease: 'power3.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        minHeight: '100svh',
        paddingTop: 'calc(var(--nav-h) + 56px)',
        paddingBottom: 100,
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
          background: 'linear-gradient(90deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.75) 30%, rgba(8,8,8,0.15) 60%, rgba(8,8,8,0.35) 100%)',
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.85) 0%, transparent 35%)', zIndex: 1 }}
      />

      <div className="absolute left-0 right-0 pointer-events-none animate-scanline" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(229,62,62,0.6), transparent)', zIndex: 2 }} />

      {/* Content */}
      <div className="relative z-10 max-w-[600px]">
        <div
          className="hero-tag inline-flex items-center gap-2 mb-6"
          style={{ background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.25)', padding: '5px 12px' }}
        >
          <span className="animate-pulse-dot rounded-full" style={{ width: 5, height: 5, background: 'var(--red)', display: 'inline-block' }} />
          <span className="text-label" style={{ fontSize: 10 }}>Agentes IA · El Salvador</span>
        </div>

        <h1 className="hero-h1 text-d1 mb-4">
          <span style={{ display: 'block' }}>Automatiza.</span>
          <span style={{ display: 'block' }}>Conecta.</span>
          <span style={{ display: 'block', color: 'var(--red)' }}>Crece.</span>
        </h1>

        <p className="hero-sub mb-8" style={{ color: 'var(--gray-1)', maxWidth: 380, lineHeight: 1.7, fontSize: 14 }}>
          Páginas web con inteligencia artificial que trabajan por tu negocio las 24 horas, los 7 días de la semana.
        </p>

        <div className="hero-actions flex flex-wrap gap-3">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display font-bold text-sm tracking-wide uppercase text-white px-8 py-3 transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{
              background: '#25D366',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.215a.75.75 0 00.921.921l5.357-1.476A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            Hablar por WhatsApp
          </a>
          <a
            href="/agentes"
            className="inline-flex items-center gap-2 font-display font-bold text-sm tracking-wide uppercase px-8 py-3 transition-all hover:text-white whitespace-nowrap"
            style={{
              border: '1px solid var(--red)',
              color: 'var(--white)',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
          >
            Ver agentes ↓
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="hero-stats absolute flex gap-8" style={{ bottom: 36, left: 'var(--section-px)', zIndex: 10 }}>
        {[
          { n: '+1', label: 'Cliente activo' },
          { n: '5', label: 'Agentes IA' },
          { n: '24/7', label: 'Sin parar' },
        ].map(({ n, label }) => (
          <div key={label}>
            <div className="font-display font-black leading-none" style={{ fontSize: 28, color: 'var(--white)' }}>
              {n.includes('/') ? <>{n.split('/')[0]}<span style={{ color: 'var(--red)' }}>/{n.split('/')[1]}</span></> : <>{n.replace('+', '')}{n.includes('+') && <span style={{ color: 'var(--red)' }}>+</span>}</>}
            </div>
            <div style={{ fontSize: 10, color: 'var(--gray-2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
