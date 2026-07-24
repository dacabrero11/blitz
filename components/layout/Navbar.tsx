'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/agentes', label: 'Agentes' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contacto', label: 'Contacto' },
]

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
        style={{
          height: 'var(--nav-h)',
          background: 'transparent',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        {/* Logo — hero wordmark */}
        <Link href="/" className="flex items-center group flex-shrink-0" onClick={() => setOpen(false)} style={{ marginLeft: 'clamp(6px, 2vw, 28px)' }}>
          <div className="relative flex-shrink-0" style={{ width: 88, height: 38 }}>
            <Image src="/blitz-wordmark.png" alt="Blitz" fill style={{ objectFit: 'contain', objectPosition: 'left center' }} priority />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 px-6 py-3 hover:bg-[rgba(229,62,62,0.16)]"
              style={{
                color: 'var(--white)',
                border: pathname === href ? '1px solid var(--red)' : '1px solid rgba(229,62,62,0.4)',
                background: pathname === href ? 'rgba(229,62,62,0.18)' : 'rgba(8,8,8,0.5)',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/contacto"
          className="hidden md:inline-flex font-display font-bold text-sm tracking-widest uppercase px-6 py-3 transition-all hover:bg-[rgba(229,62,62,0.16)]"
          style={{
            border: '1px solid var(--red)',
            color: 'var(--white)',
            background: 'rgba(8,8,8,0.5)',
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}
        >
          Contactar
        </a>

        {/* Mobile hamburger */}
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
          <span
            style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--white)',
              transition: 'all 0.2s',
              transform: open ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--white)',
              transition: 'all 0.2s',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--white)',
              transition: 'all 0.2s',
              transform: open ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          style={{
            background: 'rgba(8,8,8,0.98)',
            paddingTop: 'var(--nav-h)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-display font-black uppercase tracking-widest transition-colors"
                style={{
                  fontSize: 32,
                  color: pathname === href ? 'var(--red)' : 'var(--white)',
                  lineHeight: 1,
                }}
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
