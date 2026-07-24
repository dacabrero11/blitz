'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Monitor, Smartphone, LayoutGrid, ArrowRight } from 'lucide-react'

interface ServicioItem {
  nombre: string
  descripcion: string
  tag?: string
  icon: string
  mockupImage?: string
  mockupPosition?: string
}

interface Categoria {
  nombre: string
  subtitle: string
  acento: string
  count: string
  items: ServicioItem[]
}

const CATEGORIAS: Categoria[] = [
  {
    nombre: 'Páginas Web',
    subtitle: 'Sitios que venden. Diseñados para convertir.',
    acento: '#E53E3E',
    count: '3 servicios',
    items: [
      {
        nombre: 'Landing Page',
        descripcion: 'Una página profesional, rápida y optimizada para móvil. Perfecta para negocios que necesitan presencia digital inmediata.',
        tag: 'Ideal para empezar',
        icon: 'M3 9h18M3 3h18v18H3zM9 21V9',
        mockupImage: '/servicios/landing-page.jpg',
      },
      {
        nombre: 'Sitio Web Completo',
        descripcion: '5 a 8 páginas con diseño profesional, blog, SEO básico e integración con WhatsApp. Para negocios que quieren una presencia digital seria.',
        icon: 'M2 3h20v14H2zM8 21h8M12 17v4',
        mockupImage: '/servicios/sitio-web-completo.jpg',
      },
      {
        nombre: 'Web + Agente IA',
        descripcion: 'Sitio web completo con STRIKER integrado desde el día uno. Tu negocio en línea y atendiendo clientes 24/7 desde el lanzamiento.',
        tag: 'Más completo',
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        mockupImage: '/servicios/web-agente-ia.jpg',
      },
    ],
  },
  {
    nombre: 'Servicios Digitales',
    subtitle: 'Todo lo que tu negocio necesita para crecer en línea.',
    acento: '#3B82F6',
    count: '4 servicios',
    items: [
      {
        nombre: 'E-commerce',
        descripcion: 'Tienda en línea completa con catálogo, carrito de compras y pagos integrados con Wompi. Lista para vender desde el día uno.',
        icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
      },
      {
        nombre: 'SEO Local',
        descripcion: 'Posicionamiento en Google Maps y búsquedas locales. Tu negocio aparece primero cuando alguien busca tu servicio en El Salvador.',
        icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a1 1 0 110-2 1 1 0 010 2z',
      },
      {
        nombre: 'WhatsApp Marketing',
        descripcion: 'Envío masivo de mensajes a tu lista de clientes con ofertas y promociones. Completamente legal con WhatsApp Business API.',
        icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
      },
      {
        nombre: 'ERP Simple',
        descripcion: 'Sistema de inventario, ventas y facturación para negocios medianos. Control total de tu operación desde cualquier dispositivo.',
        tag: 'Alto impacto',
        icon: 'M9 17H7A5 5 0 013 12v0a5 5 0 015-5h2M15 7h2a5 5 0 015 5v0a5 5 0 01-5 5h-2M8 12h8',
      },
    ],
  },
  {
    nombre: 'Diseño',
    subtitle: 'Tu marca, con una imagen que vende sola.',
    acento: '#8B5CF6',
    count: '3 servicios',
    items: [
      {
        nombre: 'Identidad de Marca',
        descripcion: 'Logo, paleta de colores, tipografía y manual de marca completo. Tu negocio con imagen profesional desde el día uno.',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      },
      {
        nombre: 'Diseño para Redes',
        descripcion: 'Templates para posts, stories y covers coherentes con tu marca. Tu presencia digital siempre consistente y profesional.',
        icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      },
      {
        nombre: 'Material Impreso',
        descripcion: 'Tarjetas de presentación, brochures, banners y flyers. Diseño digital que funciona también en el mundo físico.',
        icon: 'M17 17H17.01M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7l-4-4z',
      },
    ],
  },
]

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
      <div className="relative flex items-end gap-4" style={{ right: '12%', position: 'relative' }}>
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

function CategoriaBlock({ cat, index }: { cat: Categoria; index: number }) {
  const [selected, setSelected] = useState(0)
  const active = cat.items[selected]

  return (
    <div
      className="relative overflow-hidden mb-6 last:mb-0"
      style={{ minHeight: 620, border: '1px solid var(--border-2)' }}
    >
      {/* Full-bleed background — swaps with the selected item */}
      {active.mockupImage ? (
        <Image
          key={active.mockupImage}
          src={active.mockupImage}
          alt={active.nombre}
          fill
          style={{ objectFit: 'cover', objectPosition: active.mockupPosition ?? 'center' }}
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

      {/* Text + item list, over the background */}
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
          {cat.items.map((item, idx) => {
            const highlighted = selected === idx
            return (
              <button
                key={item.nombre}
                onClick={() => setSelected(idx)}
                className="group flex items-center gap-4 p-5 text-left transition-all duration-200"
                style={{
                  background: highlighted ? 'rgba(10,10,10,0.7)' : 'rgba(10,10,10,0.45)',
                  backdropFilter: 'blur(6px)',
                  border: `1px solid ${highlighted ? cat.acento : 'rgba(255,255,255,0.12)'}`,
                  borderLeft: `3px solid ${highlighted ? cat.acento : 'rgba(255,255,255,0.12)'}`,
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 46, height: 46,
                    background: highlighted ? cat.acento : `${cat.acento}25`,
                    borderRadius: 6,
                  }}
                >
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={highlighted ? '#fff' : cat.acento} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
                  className="flex-shrink-0 transition-transform"
                  style={{ transform: highlighted ? 'translateX(2px)' : undefined }}
                />
              </button>
            )
          })}
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
