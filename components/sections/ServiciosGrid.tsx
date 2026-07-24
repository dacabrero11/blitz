import Image from 'next/image'
import Link from 'next/link'
import { Monitor, Smartphone, LayoutGrid, ArrowRight } from 'lucide-react'
import { CATEGORIAS } from '@/lib/servicios'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

function BackgroundPlaceholder({ acento }: { acento: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 75% 50%, ${acento}14, #0a0a0a 70%)` }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${acento}14 1px, transparent 1px), linear-gradient(90deg, ${acento}14 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative flex items-end gap-4" style={{ right: '12%' }}>
        <Monitor size={130} color={acento} strokeWidth={1} style={{ opacity: 0.4 }} />
        <Smartphone size={58} color={acento} strokeWidth={1} style={{ opacity: 0.4, marginBottom: 4 }} />
      </div>
      <div
        className="absolute bottom-6 right-6 font-display font-bold uppercase"
        style={{ fontSize: 10, letterSpacing: '0.12em', color: acento, opacity: 0.6 }}
      >
        Vista previa próximamente
      </div>
    </div>
  )
}

function CategoriaBlock({ cat, index }: { cat: (typeof CATEGORIAS)[number]; index: number }) {
  const featured = cat.items[0]

  return (
    <div
      className="relative overflow-hidden mb-6 last:mb-0"
      style={{ minHeight: 620, border: '1px solid var(--border-2)' }}
    >
      {featured.mockupImage ? (
        <Image
          src={featured.mockupImage}
          alt={featured.nombre}
          fill
          style={{ objectFit: 'cover', objectPosition: featured.mockupPosition ?? 'center' }}
        />
      ) : (
        <BackgroundPlaceholder acento={cat.acento} />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(90deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.88) 40%, rgba(8,8,8,0.4) 65%, rgba(8,8,8,0.15) 100%)` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.6) 0%, transparent 25%)' }}
      />

      <div className="relative py-10 md:py-16" style={{ maxWidth: 620, paddingLeft: 'var(--section-px)', paddingRight: 'clamp(24px, 4vw, 48px)' }}>
        <div className="flex items-baseline gap-4 mb-2">
          <span className="font-display font-black" style={{ fontSize: 22, color: cat.acento }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-display font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--gray-3)' }}>
            {cat.count}
          </span>
        </div>
        <h2 className="font-display font-black uppercase mb-3" style={{ fontSize: 'clamp(32px, 3.8vw, 50px)', color: 'var(--white)', lineHeight: 1 }}>
          {cat.nombre}
        </h2>
        <p className="mb-9" style={{ fontSize: 15, color: 'var(--gray-1)', lineHeight: 1.7, maxWidth: 460 }}>
          {cat.subtitle}
        </p>

        <div className="flex flex-col gap-3 mb-7">
          {cat.items.map((item, idx) => (
            <Link
              key={item.nombre}
              href={`/servicios/${item.slug}`}
              className="group flex items-center gap-4 p-5 text-left transition-all duration-200"
              style={{
                background: idx === 0 ? 'rgba(10,10,10,0.7)' : 'rgba(10,10,10,0.45)',
                backdropFilter: 'blur(6px)',
                border: `1px solid ${idx === 0 ? cat.acento : 'rgba(255,255,255,0.12)'}`,
                borderLeft: `3px solid ${idx === 0 ? cat.acento : 'rgba(255,255,255,0.12)'}`,
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 46, height: 46,
                  background: idx === 0 ? cat.acento : `${cat.acento}25`,
                  borderRadius: 6,
                }}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={idx === 0 ? '#fff' : cat.acento} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-display font-bold uppercase" style={{ fontSize: 15, color: 'var(--white)' }}>
                    {item.nombre}
                  </span>
                  {item.tag && (
                    <span
                      className="font-display font-bold uppercase flex-shrink-0"
                      style={{ fontSize: 8.5, letterSpacing: '0.1em', color: cat.acento, border: `1px solid ${cat.acento}55`, padding: '1px 5px' }}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--gray-1)', lineHeight: 1.55 }}>
                  {item.descripcion}
                </p>
              </div>
              <ArrowRight
                size={17}
                color={cat.acento}
                className="flex-shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-display font-bold uppercase transition-opacity hover:opacity-75"
          style={{ fontSize: 11.5, letterSpacing: '0.1em', color: cat.acento }}
        >
          <LayoutGrid size={14} />
          Ver todos los planes
        </a>
      </div>
    </div>
  )
}

export function ServiciosGrid() {
  return (
    <section style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div style={{ padding: 'var(--section-py) 0' }}>
        {CATEGORIAS.map((cat, i) => (
          <CategoriaBlock key={cat.nombre} cat={cat} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="container" style={{ paddingBottom: 'var(--section-py)' }}>
        <div
          className="p-8 text-center relative"
          style={{ border: '1px solid var(--border)', background: 'var(--black-2)' }}
        >
          <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: 'var(--red)' }} />
          <p className="text-label mb-2">¿No sabés por dónde empezar?</p>
          <h3 className="font-display font-black uppercase mb-4" style={{ fontSize: 28, color: 'var(--white)' }}>
            Primera consulta gratis.
          </h3>
          <p className="mb-6" style={{ fontSize: 13, color: 'var(--gray-1)' }}>
            En 30 minutos por WhatsApp definimos qué servicios necesita tu negocio.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wide text-white px-8 py-3 transition-opacity hover:opacity-90"
            style={{
              background: '#25D366',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.215a.75.75 0 00.921.921l5.357-1.476A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            Agendar llamada gratis
          </a>
        </div>
      </div>
    </section>
  )
}
