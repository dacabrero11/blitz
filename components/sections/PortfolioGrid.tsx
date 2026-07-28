'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIAS, PROYECTOS, type CategoriaId } from '@/lib/portfolio'
import { PfCorners } from '@/components/ui/PfCorners'

type Filtro = 'todos' | CategoriaId
type Orden = 'recientes' | 'antiguos' | 'nombre'

const ORDENES: { id: Orden; label: string }[] = [
  { id: 'recientes', label: 'Más recientes' },
  { id: 'antiguos', label: 'Más antiguos' },
  { id: 'nombre', label: 'Nombre A-Z' },
]

export function PortfolioGrid() {
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [orden, setOrden] = useState<Orden>('recientes')

  const visibles = useMemo(() => {
    const base = filtro === 'todos' ? PROYECTOS : PROYECTOS.filter((p) => p.categoria === filtro)
    const copia = [...base]
    if (orden === 'recientes') copia.sort((a, b) => a.orden - b.orden)
    if (orden === 'antiguos') copia.sort((a, b) => b.orden - a.orden)
    if (orden === 'nombre') copia.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    return copia
  }, [filtro, orden])

  const opciones: { id: Filtro; label: string }[] = [{ id: 'todos', label: 'Todos' }, ...CATEGORIAS]

  return (
    <section className="portfolio-bg relative" style={{ paddingBottom: 'clamp(40px,6vh,80px)' }}>
      <span aria-hidden className="portfolio-aurora animate-aurora-3" style={{ left: '30%', bottom: '-20%', width: 800, height: 800, background: 'radial-gradient(circle, #E53E3E33, transparent 72%)' }} />

      <div className="container relative" style={{ zIndex: 1 }}>
        {/* ── Barra de filtros ── */}
        <div
          className="pf-panel relative flex flex-wrap items-center gap-2 animate-pf-in"
          style={{ border: '1px solid var(--border)', background: 'rgba(10,10,11,0.7)', padding: '12px 14px' }}
        >
          <PfCorners color="rgba(229,62,62,0.6)" size={11} />

          <div className="flex flex-wrap items-center gap-2 flex-1" role="tablist" aria-label="Filtrar por categoría">
            {opciones.map((o, i) => {
              const on = filtro === o.id
              return (
                <button
                  key={o.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFiltro(o.id)}
                  className="pf-chip font-display font-bold uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.13em',
                    padding: '8px 13px',
                    color: on ? '#fff' : 'var(--gray-1)',
                    background: on ? 'var(--red)' : 'transparent',
                    border: `1px solid ${on ? 'var(--red)' : 'var(--border)'}`,
                    animationDelay: `${i * 45}ms`,
                  }}
                >
                  <span aria-hidden style={{ opacity: 0.6, marginRight: 5 }}>+</span>
                  {o.label}
                </button>
              )
            })}
          </div>

          <label className="flex items-center gap-2 ml-auto">
            <span className="sr-only">Ordenar</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="font-display font-bold uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.13em',
                padding: '8px 12px',
                color: 'var(--gray-1)',
                background: 'var(--black-2)',
                border: '1px solid var(--border)',
              }}
            >
              {ORDENES.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* ── Rejilla de proyectos ── */}
        <div className="mt-5 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {visibles.map((p, i) => (
            <article
              key={p.id}
              className="pf-card relative overflow-hidden"
              /* key por filtro: al cambiar de categoría las tarjetas vuelven a entrar */
              style={{ border: '1px solid var(--border)', background: 'var(--black-2)', animationDelay: `${i * 80}ms` }}
            >
              <PfCorners color="rgba(229,62,62,0.55)" size={11} />
              <span className="pf-sweep" aria-hidden />

              <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 11', margin: 10, marginBottom: 0 }}>
                <Image
                  src={p.image}
                  alt={p.nombre}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1200px) 45vw, 22vw"
                  className="object-cover object-top pf-card-img"
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(6,6,7,0.45) 0%, transparent 32%, rgba(6,6,7,0.55) 100%)' }}
                />
                <span
                  className="absolute font-display font-bold uppercase"
                  style={{
                    top: 8,
                    left: 8,
                    fontSize: 8.5,
                    letterSpacing: '0.14em',
                    padding: '4px 8px',
                    color: 'var(--red)',
                    background: 'rgba(8,8,9,0.82)',
                    border: '1px solid rgba(229,62,62,0.45)',
                  }}
                >
                  {p.categoriaLabel}
                </span>
              </div>

              <div style={{ padding: '14px 14px 16px' }}>
                <h3 className="font-display font-bold" style={{ fontSize: 16, color: 'var(--white)', lineHeight: 1.15 }}>
                  {p.nombre}
                </h3>
                <p className="mt-1.5" style={{ fontSize: 12, color: 'var(--gray-1)', lineHeight: 1.55, minHeight: 37 }}>
                  {p.desc}
                </p>
                <span className="pf-link inline-flex items-center gap-1.5 font-display font-bold uppercase mt-3" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--red)' }}>
                  Ver proyecto <ArrowUpRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {visibles.length === 0 && (
          <p className="mt-8 text-center font-display uppercase" style={{ fontSize: 12, letterSpacing: '0.16em', color: 'var(--gray-2)' }}>
            Todavía no hay proyectos en esta categoría.
          </p>
        )}
      </div>
    </section>
  )
}
