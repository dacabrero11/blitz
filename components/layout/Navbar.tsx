'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

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
          background: 'rgba(8,8,8,0.92)',
          borderBottom: '1px solid var(--border-2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="relative flex-shrink-0" style={{ width: 44, height: 44 }}>
            <Image src="/blitz-logo.png" alt="Blitz" fill className="object-contain" priority />
          </div>
          <span className="font-display font-black text-xl tracking-wide" style={{ color: 'var(--white)' }}>
            BLITZ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-display font-semibold text-xs tracking-widest uppercase transition-colors duration-200',
                pathname === href ? '' : 'text-gray-600 hover:text-gray-300'
              )}
              style={{ color: pathname === href ? 'var(--red)' : undefined }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/contacto"
          className="hidden md:inline-flex font-display font-bold text-xs tracking-widest uppercase px-5 py-2.5 transition-all hover:text-white"
          style={{
            border: '1px solid var(--red)',
            color: 'var(--white)',
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}
        >
          Contactar
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
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
