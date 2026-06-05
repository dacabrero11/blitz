'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/agentes', label: 'Agentes' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contacto', label: 'Contacto' },
]

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function Navbar() {
  const pathname = usePathname()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      style={{
        height: 'var(--nav-h)',
        background: 'rgba(8,8,8,0.9)',
        borderBottom: '1px solid var(--border-2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src="/blitz-logo-transparent.png"
            alt="Blitz"
            fill
            className="object-contain"
            onError={(e) => {
              const parent = (e.target as HTMLImageElement).parentElement
              if (parent) {
                parent.innerHTML = `<div style="width:30px;height:30px;background:#E53E3E;clip-path:polygon(25% 0%,75% 0%,100% 25%,100% 75%,75% 100%,25% 100%,0% 75%,0% 25%);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:8px;font-weight:900;color:white">B</div>`
              }
            }}
          />
        </div>
        <span
          className="font-display font-black text-xl tracking-wide"
          style={{ color: 'var(--white)' }}
        >
          BLITZ
        </span>
      </Link>

      {/* Nav links */}
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

      {/* CTA */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-clip-sm font-display font-bold text-xs tracking-widest uppercase text-white px-4 py-2 transition-opacity hover:opacity-90"
        style={{ background: 'var(--red)' }}
      >
        WhatsApp
      </a>
    </header>
  )
}
