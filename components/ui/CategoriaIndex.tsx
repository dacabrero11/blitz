'use client'

import type React from 'react'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CATEGORIAS } from '@/lib/servicios'

export function CategoriaIndex() {
  const [hover, setHover] = useState<string | null>(null)

  function goTo(slug: string) {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const colorVars = CATEGORIAS.slice(0, 3).reduce<Record<string, string>>((acc, cat, i) => {
    acc[`--idx-c${i + 1}`] = cat.acento
    acc[`--idx-g${i + 1}`] = `${cat.acento}b0`
    return acc
  }, {})

  return (
    <div className="relative" style={{ paddingLeft: 34, minWidth: 'min(392px, 100%)', ...colorVars } as React.CSSProperties}>
      {/* riel vertical, teñido con los 3 acentos */}
      <span
        aria-hidden
        className="absolute"
        style={{
          left: 0,
          top: 8,
          bottom: 8,
          width: 1,
          background: `linear-gradient(180deg, ${CATEGORIAS[0]?.acento}44, ${CATEGORIAS[1]?.acento}44 50%, ${CATEGORIAS[2]?.acento}44)`,
        }}
      />
      {/* luz que recorre el riel y va tomando el color de cada categoria */}
      <span
        aria-hidden
        className="absolute animate-index-scan"
        style={{ left: -3.5, width: 8, height: 8, borderRadius: '50%' }}
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
              padding: '21px 0',
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
                width: 4,
                height: on ? 46 : 0,
                marginTop: 2,
                background: cat.acento,
                boxShadow: on ? `0 0 12px 2px ${cat.acento}` : 'none',
                transition: 'height 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms ease',
              }}
            />

            <div className="flex items-center gap-3.5">
              <span className="font-display font-black" style={{ fontSize: 14.5, color: cat.acento, letterSpacing: '0.04em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="font-display font-bold uppercase flex-1"
                style={{
                  fontSize: 17,
                  letterSpacing: '0.03em',
                  color: on ? 'var(--white)' : 'var(--gray-1)',
                  transition: 'color 220ms ease',
                }}
              >
                {title}
              </span>
              <ArrowRight
                size={17}
                color={cat.acento}
                style={{
                  opacity: on ? 1 : 0.35,
                  transform: on ? 'translateX(3px)' : 'translateX(0)',
                  transition: 'opacity 220ms ease, transform 260ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--gray-2)', marginTop: 5, marginLeft: 31 }}>
              {cat.items.length} {cat.items.length === 1 ? 'servicio' : 'servicios'}
            </div>
          </button>
        )
      })}
    </div>
  )
}
