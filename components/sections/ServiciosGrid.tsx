'use client'

import { Monitor, Smartphone, LayoutGrid, ArrowRight } from 'lucide-react'

interface ServicioItem {
  nombre: string
  descripcion: string
  tag?: string
  icon: string
}

interface Categoria {
  nombre: string
  subtitle: string
  acento: string
  count: string
  mockupImage?: string
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
      },
      {
        nombre: 'Sitio Web Completo',
        descripcion: '5 a 8 páginas con diseño profesional, blog, SEO básico e integración con WhatsApp. Para negocios que quieren una presencia digital seria.',
        icon: 'M2 3h20v14H2zM8 21h8M12 17v4',
      },
      {
        nombre: 'Web + Agente IA',
        descripcion: 'Sitio web completo con STRIKER integrado desde el día uno. Tu negocio en línea y atendiendo clientes 24/7 desde el lanzamiento.',
        tag: 'Más completo',
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      },
    ],
  },
  {
    nombre: 'Agentes IA',
    subtitle: 'Empleados digitales que nunca duermen.',
    acento: '#E53E3E',
    count: '5 agentes',
    items: [
      {
        nombre: 'STRIKER',
        descripcion: 'Agente de ventas que atiende clientes, califica leads y cierra ventas las 24 horas en tu web y WhatsApp.',
        tag: 'Más popular',
        icon: 'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3v4M8 3v4',
      },
      {
        nombre: 'HERALD',
        descripcion: 'Secretario virtual que agenda citas, responde preguntas frecuentes y coordina la operación diaria de tu negocio.',
        icon: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
      },
      {
        nombre: 'SIGNAL',
        descripcion: 'Genera posts, campañas e imágenes para tus redes sociales con inteligencia artificial. Hasta 20 piezas al mes.',
        icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z',
      },
      {
        nombre: 'ORACLE',
        descripcion: 'Dashboard en tiempo real con métricas clave de tu negocio. Reportes automáticos y alertas cuando algo requiere atención.',
        icon: 'M3 3v18h18M18 9l-5 5-4-4-3 3',
      },
      {
        nombre: 'APEX',
        descripcion: 'Todos los agentes coordinados bajo un solo sistema. Memoria compartida, multi-canal y automatizaciones avanzadas.',
        tag: 'Élite',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
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

function MockupPlaceholder({ acento }: { acento: string }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        aspectRatio: '4 / 3',
        background: `radial-gradient(ellipse at 50% 40%, ${acento}14, #0a0a0a 70%)`,
        border: `1px solid ${acento}33`,
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(${acento}14 1px, transparent 1px), linear-gradient(90deg, ${acento}14 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Device silhouette */}
      <div className="relative flex items-end gap-4" style={{ zIndex: 1 }}>
        <Monitor size={96} color={acento} strokeWidth={1} style={{ opacity: 0.5 }} />
        <Smartphone size={44} color={acento} strokeWidth={1} style={{ opacity: 0.5, marginBottom: 4 }} />
      </div>
      <div
        className="absolute bottom-4 right-4 font-display font-bold uppercase"
        style={{ fontSize: 9, letterSpacing: '0.12em', color: acento, opacity: 0.7 }}
      >
        Vista previa próximamente
      </div>
    </div>
  )
}

export function ServiciosGrid() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        {CATEGORIAS.map((cat, i) => (
          <div
            key={cat.nombre}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24 last:mb-0"
          >
            {/* Text column */}
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-display font-black" style={{ fontSize: 20, color: cat.acento }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--gray-3)' }}>
                  {cat.count}
                </span>
              </div>
              <h2 className="font-display font-black uppercase mb-2" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', color: 'var(--white)', lineHeight: 1 }}>
                {cat.nombre}
              </h2>
              <p className="mb-8" style={{ fontSize: 14, color: 'var(--gray-1)', lineHeight: 1.7, maxWidth: 440 }}>
                {cat.subtitle}
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {cat.items.map((item, idx) => {
                  const highlighted = idx === 0
                  return (
                    <a
                      key={item.nombre}
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 transition-all duration-200"
                      style={{
                        background: highlighted ? `${cat.acento}0d` : 'var(--black-2)',
                        border: `1px solid ${highlighted ? cat.acento : 'var(--border)'}`,
                        borderLeft: `3px solid ${highlighted ? cat.acento : 'var(--border)'}`,
                      }}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 40, height: 40,
                          background: highlighted ? cat.acento : `${cat.acento}15`,
                          borderRadius: 6,
                        }}
                      >
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={highlighted ? '#fff' : cat.acento} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-display font-bold uppercase" style={{ fontSize: 13.5, color: 'var(--white)' }}>
                            {item.nombre}
                          </span>
                          {item.tag && (
                            <span
                              className="font-display font-bold uppercase flex-shrink-0"
                              style={{ fontSize: 8, letterSpacing: '0.1em', color: cat.acento, border: `1px solid ${cat.acento}55`, padding: '1px 5px' }}
                            >
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 11.5, color: 'var(--gray-2)', lineHeight: 1.5 }}>
                          {item.descripcion}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        color={cat.acento}
                        className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  )
                })}
              </div>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display font-bold uppercase transition-opacity hover:opacity-75"
                style={{ fontSize: 11, letterSpacing: '0.1em', color: cat.acento }}
              >
                <LayoutGrid size={13} />
                Ver todos los planes
              </a>
            </div>

            {/* Mockup column */}
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              {cat.mockupImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cat.mockupImage} alt={cat.nombre} className="w-full h-auto" />
              ) : (
                <MockupPlaceholder acento={cat.acento} />
              )}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div
          className="mt-4 p-8 text-center relative"
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
