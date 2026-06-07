import Link from 'next/link'

interface Servicio {
  categoria: string
  acento: string
  items: {
    nombre: string
    descripcion: string
    setup: string
    mensual?: string
    tag?: string
  }[]
}

const SERVICIOS: Servicio[] = [
  {
    categoria: 'Páginas Web',
    acento: '#22C55E',
    items: [
      {
        nombre: 'Landing Page',
        descripcion: 'Una página profesional, rápida y optimizada para móvil. Perfecta para negocios que necesitan presencia digital inmediata con un presupuesto ajustado.',
        setup: '$300 - $500',
        tag: 'Ideal para empezar',
      },
      {
        nombre: 'Sitio Web Completo',
        descripcion: '5 a 8 páginas con diseño profesional, blog, SEO básico e integración con WhatsApp. Para negocios que quieren una presencia digital seria.',
        setup: '$600 - $1,200',
      },
      {
        nombre: 'Web + Agente IA',
        descripcion: 'Sitio web completo con STRIKER integrado desde el día uno. Tu negocio en línea y atendiendo clientes 24/7 desde el lanzamiento.',
        setup: '$800 - $1,500',
        mensual: '$45/mes',
        tag: 'Más completo',
      },
    ],
  },
  {
    categoria: 'Agentes IA',
    acento: '#E53E3E',
    items: [
      {
        nombre: 'STRIKER',
        descripcion: 'Agente de ventas que atiende clientes, califica leads y cierra ventas en tu web y WhatsApp las 24 horas.',
        setup: '$200',
        mensual: '$45/mes',
        tag: 'Más popular',
      },
      {
        nombre: 'HERALD',
        descripcion: 'Secretario virtual que agenda citas, responde preguntas frecuentes y coordina la operación diaria de tu negocio.',
        setup: '$300',
        mensual: '$60/mes',
      },
      {
        nombre: 'SIGNAL',
        descripcion: 'Genera posts, campañas e imágenes para tus redes sociales con inteligencia artificial. Hasta 20 piezas al mes.',
        setup: '$250',
        mensual: '$80/mes',
      },
      {
        nombre: 'ORACLE',
        descripcion: 'Dashboard en tiempo real con métricas clave de tu negocio. Reportes automáticos y alertas cuando algo requiere atención.',
        setup: '$350',
        mensual: '$70/mes',
      },
      {
        nombre: 'APEX',
        descripcion: 'Todos los agentes coordinados bajo un solo sistema. Memoria compartida, multi-canal y automatizaciones avanzadas.',
        setup: '$800',
        mensual: '$250/mes',
        tag: 'Élite',
      },
    ],
  },
  {
    categoria: 'Servicios Digitales',
    acento: '#3B82F6',
    items: [
      {
        nombre: 'E-commerce',
        descripcion: 'Tienda en línea completa con catálogo, carrito de compras y pagos integrados con Wompi. Como Ferreterías Lemus.',
        setup: '$400 - $800',
      },
      {
        nombre: 'SEO Local',
        descripcion: 'Posicionamiento en Google Maps y búsquedas locales. Tu negocio aparece primero cuando alguien busca tu servicio en El Salvador.',
        setup: '$150',
        mensual: '$80/mes',
      },
      {
        nombre: 'WhatsApp Marketing',
        descripcion: 'Envío masivo de mensajes a tu lista de clientes con ofertas, promociones y recordatorios. Completamente legal con WhatsApp Business API.',
        setup: '$100',
        mensual: '$60/mes',
      },
      {
        nombre: 'ERP Simple',
        descripcion: 'Sistema de inventario, ventas y facturación para negocios medianos. Control total de tu operación desde cualquier dispositivo.',
        setup: '$1,500 - $3,000',
        tag: 'Alto impacto',
      },
    ],
  },
  {
    categoria: 'Diseño',
    acento: '#8B5CF6',
    items: [
      {
        nombre: 'Identidad de Marca',
        descripcion: 'Logo, paleta de colores, tipografía y manual de marca completo. Tu negocio con imagen profesional desde el día uno.',
        setup: '$300 - $500',
      },
      {
        nombre: 'Diseño para Redes',
        descripcion: 'Templates para posts, stories y covers coherentes con tu marca. Tu presencia digital siempre consistente y profesional.',
        setup: '$150',
        mensual: '$50/mes',
      },
      {
        nombre: 'Material Impreso',
        descripcion: 'Tarjetas de presentación, brochures, banners y flyers. Diseño digital que funciona también en el mundo físico.',
        setup: '$100 - $300',
      },
    ],
  },
]

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function ServiciosGrid() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        {SERVICIOS.map((categoria) => (
          <div key={categoria.categoria} className="mb-16 last:mb-0">
            {/* Category header */}
            <div
              className="flex items-center gap-4 mb-6 pb-4"
              style={{ borderBottom: `1px solid ${categoria.acento}30` }}
            >
              <div
                className="w-1 h-8 rounded-full"
                style={{ background: categoria.acento }}
              />
              <h2
                className="font-display font-black text-2xl uppercase tracking-wide"
                style={{ color: 'var(--white)' }}
              >
                {categoria.categoria}
              </h2>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {categoria.items.map((item) => (
                <div
                  key={item.nombre}
                  className="relative p-5 flex flex-col justify-between transition-all duration-200 hover:translate-y-[-2px]"
                  style={{
                    background: 'var(--black-2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{ height: 2, background: categoria.acento }}
                  />

                  {/* Tag */}
                  {item.tag && (
                    <div
                      className="absolute top-3 right-3 font-display font-bold uppercase"
                      style={{
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        background: categoria.acento,
                        color: 'white',
                        padding: '2px 7px',
                      }}
                    >
                      {item.tag}
                    </div>
                  )}

                  <div>
                    {/* Service name */}
                    <h3
                      className="font-display font-black uppercase mb-2"
                      style={{ fontSize: 20, color: 'var(--white)', lineHeight: 1 }}
                    >
                      {item.nombre}
                    </h3>

                    {/* Description */}
                    <p
                      className="mb-4"
                      style={{ fontSize: 12, color: 'var(--gray-2)', lineHeight: 1.75 }}
                    >
                      {item.descripcion}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div
                    className="flex items-end justify-between pt-4"
                    style={{ borderTop: '1px solid var(--border-2)' }}
                  >
                    <div>
                      <div
                        className="font-display font-black"
                        style={{ fontSize: 22, color: 'var(--white)', lineHeight: 1 }}
                      >
                        {item.setup}
                      </div>
                      <div style={{ fontSize: 9, color: 'var(--gray-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        Setup
                      </div>
                    </div>
                    {item.mensual && (
                      <div className="text-right">
                        <div
                          className="font-display font-bold"
                          style={{ fontSize: 14, color: categoria.acento, lineHeight: 1 }}
                        >
                          {item.mensual}
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--gray-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          Mensual
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div
          className="mt-12 p-8 text-center relative"
          style={{ border: '1px solid var(--border)', background: 'var(--black-2)' }}
        >
          <div
            className="absolute top-0 left-0 right-0"
            style={{ height: 2, background: 'var(--red)' }}
          />
          <p className="text-label mb-2">¿No sabés por dónde empezar?</p>
          <h3
            className="font-display font-black uppercase mb-4"
            style={{ fontSize: 28, color: 'var(--white)' }}
          >
            Primera consulta gratis.
          </h3>
          <p className="mb-6" style={{ fontSize: 13, color: 'var(--gray-1)' }}>
            En 30 minutos por WhatsApp definimos qué servicios necesita tu negocio y cuánto te va a costar.
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
