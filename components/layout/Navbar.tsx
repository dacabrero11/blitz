'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { AGENTS } from '@/lib/agents'
import { CATEGORIAS } from '@/lib/servicios'

type MegaKey = 'agentes' | 'servicios'

const LINKS: { href: string; label: string; mega?: MegaKey }[] = [
  { href: '/agentes', label: 'Agentes', mega: 'agentes' },
  { href: '/servicios', label: 'Servicios', mega: 'servicios' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contacto', label: 'Contacto' },
]

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState<MegaKey | null>(null)

  const capsuleRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false })
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeIndex = LINKS.findIndex((l) => pathname === l.href || pathname.startsWith(l.href + '/'))

  const movePillTo = useCallback((index: number) => {
    const el = itemRefs.current[index]
    const box = capsuleRef.current
    if (!el || !box) return
    const e = el.getBoundingClientRect()
    const b = box.getBoundingClientRect()
    setPill({ left: e.left - b.left, width: e.width, visible: true })
  }, [])

  const resetPill = useCallback(() => {
    if (activeIndex >= 0) movePillTo(activeIndex)
    else setPill((p) => ({ ...p, visible: false }))
  }, [activeIndex, movePillTo])

  useEffect(() => {
    resetPill()
    window.addEventListener('resize', resetPill)
    return () => window.removeEventListener('resize', resetPill)
  }, [resetPill])

  useEffect(() => {
    let last = window.scrollY
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 12)
      if (Math.abs(y - last) < 6) return
      if (y > last && y > 120) {
        setHidden(true)
        setMega(null)
      } else {
        setHidden(false)
      }
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function openMega(key: MegaKey | undefined) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMega(key ?? null)
  }
  function scheduleCloseMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMega(null), 140)
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transform: hidden ? 'translateY(-115%)' : 'translateY(0)',
          transition: 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseLeave={scheduleCloseMega}
      >
        <header className="flex items-center justify-between px-5 md:px-9" style={{ height: 'var(--nav-h)' }}>
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            onClick={() => setOpen(false)}
            onMouseEnter={() => openMega(undefined)}
          >
            <div className="relative flex-shrink-0" style={{ width: 84, height: 34 }}>
              <Image src="/blitz-wordmark.png" alt="Blitz" fill style={{ objectFit: 'contain', objectPosition: 'left center' }} priority />
            </div>
          </Link>

          <div
            ref={capsuleRef}
            className="hidden md:flex items-center relative"
            style={{
              gap: 2,
              padding: 4,
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.10)',
              background: scrolled ? 'rgba(12,12,12,0.82)' : 'rgba(12,12,12,0.55)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 28px -18px rgba(0,0,0,0.9)',
              transition: 'background 250ms ease',
            }}
            onMouseLeave={resetPill}
          >
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: 4,
                bottom: 4,
                left: pill.left,
                width: pill.width,
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(229,62,62,0.95), rgba(200,40,40,0.95))',
                boxShadow: '0 4px 16px -4px rgba(229,62,62,0.65)',
                opacity: pill.visible ? 1 : 0,
                transition: 'left 280ms cubic-bezier(0.16,1,0.3,1), width 280ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease',
                pointerEvents: 'none',
              }}
            />

            {LINKS.map((link, i) => {
              const isActive = i === activeIndex
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  onMouseEnter={() => {
                    movePillTo(i)
                    openMega(link.mega)
                  }}
                  className="relative font-display font-bold uppercase transition-colors duration-200"
                  style={{
                    zIndex: 1,
                    padding: '9px 20px',
                    borderRadius: 999,
                    fontSize: 12.5,
                    letterSpacing: '0.1em',
                    color: isActive || pill.visible ? 'var(--white)' : 'var(--gray-1)',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <a
            href="/contacto"
            onMouseEnter={() => openMega(undefined)}
            className="hidden md:inline-flex items-center gap-2 font-display font-bold uppercase transition-all duration-200 hover:brightness-110"
            style={{
              fontSize: 12,
              letterSpacing: '0.09em',
              padding: '10px 20px',
              borderRadius: 999,
              color: '#fff',
              background: 'linear-gradient(135deg, var(--red), #b32d2d)',
              boxShadow: '0 8px 24px -10px rgba(229,62,62,0.8)',
            }}
          >
            Contactar
            <ArrowRight size={14} />
          </a>

          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
            style={{
              background: 'rgba(8,8,8,0.35)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              width: 40,
              height: 40,
            }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--white)', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--white)', transition: 'all 0.2s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--white)', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
          </button>
        </header>

        <div
          className="hidden md:block"
          style={{
            maxHeight: mega ? 460 : 0,
            opacity: mega ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 320ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease',
          }}
          onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current) }}
        >
          <div
            className="mx-auto"
            style={{
              maxWidth: 1180,
              marginTop: 10,
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(10,10,10,0.94)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -24px rgba(0,0,0,0.95)',
              padding: 26,
            }}
          >
            {mega === 'servicios' && (
              <div className="grid grid-cols-3 gap-7">
                {CATEGORIAS.map((cat) => (
                  <div key={cat.slug}>
                    <Link
                      href={`/servicios/categoria/${cat.slug}`}
                      className="font-display font-black uppercase inline-flex items-center gap-2 mb-3 transition-opacity hover:opacity-80"
                      style={{ fontSize: 13, letterSpacing: '0.06em', color: cat.acento }}
                    >
                      {cat.landing ? `${cat.landing.titleWhite} ${cat.landing.titleAccent}` : cat.nombre}
                      <ArrowRight size={12} />
                    </Link>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/servicios/${item.slug}`}
                          className="transition-colors duration-150 hover:text-white"
                          style={{ fontSize: 12, color: 'var(--gray-1)', padding: '3px 0' }}
                        >
                          {item.nombre}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {mega === 'agentes' && (
              <div className="grid grid-cols-5 gap-4">
                {AGENTS.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/agentes/${agent.id}`}
                    className="group relative overflow-hidden flex flex-col transition-colors duration-200"
                    style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.09)', background: '#0d0d0d' }}
                  >
                    <div className="relative" style={{ height: 118, background: '#070707' }}>
                      <Image
                        src={agent.cardImage ?? agent.image}
                        alt={agent.name}
                        fill
                        sizes="200px"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0d0d0d 0%, transparent 55%)' }} />
                    </div>
                    <div style={{ padding: '10px 12px 13px' }}>
                      <div className="font-display font-black uppercase" style={{ fontSize: 13, color: 'var(--white)', lineHeight: 1.1 }}>
                        {agent.name}
                      </div>
                      <div style={{ fontSize: 10.5, color: 'var(--gray-1)', marginTop: 2 }}>{agent.role}</div>
                    </div>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ border: '1px solid var(--red)', borderRadius: 14 }}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          style={{ background: 'rgba(8,8,8,0.98)', paddingTop: 'var(--nav-h)', backdropFilter: 'blur(16px)' }}
        >
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-display font-black uppercase tracking-widest transition-colors"
                style={{ fontSize: 32, color: pathname === href ? 'var(--red)' : 'var(--white)', lineHeight: 1 }}
              >
                {label}
              </Link>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="font-display font-bold text-sm uppercase tracking-wide text-white px-8 py-3 mt-4"
              style={{
                background: '#25D366',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              Hablar por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
