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
        background: 'rgba(8,8,8,0.92)',
        borderBottom: '1px solid var(--border-2)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Logo — blitz-logo.png larger */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative flex-shrink-0" style={{ width: 44, height: 44 }}>
          <Image
            src="/blitz-logo.png"
            alt="Blitz"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="font-display font-black text-xl tracking-wide" style={{ color: 'var(--white)' }}>
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

      {/* Contact CTA */}
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
    </header>
  )
}
