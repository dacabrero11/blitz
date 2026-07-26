'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CATEGORIAS } from '@/lib/servicios'

export function CategoriaIndex() {
  const [hover, setHover] = useState<string | null>(null)

  function goTo(slug: string) {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative" style={{ paddingLeft: 28, minWidth: 300 }}>
      {/* riel vertical */}
      <span
        aria-hidden
        className="absolute"
        style={{ left: 0, top: 8, bottom: 8, width: 1, background: 'rgba(255,255,255,0.13)' }}
      />
      {/* luz que recorre el riel en loop */}
      <span
        aria-hidden
        className="absolute animate-index-scan"
        style={{
          left: -2.5,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--red)',
          boxShadow: '0 0 12px 3px rgba(229,62,62,0.85)',
        }}
      />

      {CATEGORIAS.map((cat, i) => {
        const on = hover === cat.slug
        const title = cat.landing ? `${cat.landing.titleWhite} ${cat.landing.titleAccent}` : cat.nombre
        return (
          <button
            key={cat.slug}
            onClick={() => goTo(cat.slug)}
            onMouseEnter={() => setHover(cat.slug)}
            onMouseLeave={() => setHover(null)}
            className="group block w-full text-left"
            style={{
              padding: '15px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
              transform: on ? 'translateX(6px)' : 'translateX(0)',
              transition: 'transform 260ms cubic-bezier(0.16,1,0.3,1)',
              cursor: 'pointer',
              background: 'none',
            }}
          >
            {/* marca de acento que crece al pasar el mouse */}
            <span
              aria-hidden
              className="absolute"
              style={{
                left: -1,
                width: 3,
                height: on ? 34 : 0,
                marginTop: 2,
                background: cat.acento,
                boxShadow: on ? `0 0 12px 2px ${cat.acento}` : 'none',
                transition: 'height 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms ease',
              }}
            />

            <div className="flex items-center gap-3">
              <span className="font-display font-black" style={{ fontSize: 12, color: cat.acento, letterSpacing: '0.04em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="font-display font-bold uppercase flex-1"
                style={{
                  fontSize: 14,
                  letterSpacing: '0.03em',
                  color: on ? 'var(--white)' : 'var(--gray-1)',
                  transition: 'color 220ms ease',
                }}
              >
                {title}
              </span>
              <ArrowRight
                size={14}
                color={cat.acento}
                style={{
                  opacity: on ? 1 : 0.35,
                  transform: on ? 'translateX(3px)' : 'translateX(0)',
                  transition: 'opacity 220ms ease, transform 260ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray-2)', marginTop: 3, marginLeft: 27 }}>
              {cat.items.length} {cat.items.length === 1 ? 'servicio' : 'servicios'}
            </div>
          </button>
        )
      })}
    </div>
  )
}
