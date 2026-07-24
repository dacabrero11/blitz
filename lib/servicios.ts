export interface ServicioFeature {
  icon: string
  title: string
  desc: string
}

export interface ServicioStep {
  icon: string
  title: string
  desc: string
}

export interface ServicioInclude {
  icon: string
  label: string
}

export type ServicioSecondary =
  | { type: 'includes-process'; includes: ServicioInclude[]; process: ServicioStep[] }
  | { type: 'howworks-cta'; howworks: ServicioStep[]; ctaTitle: string }

export interface ServicioDetail {
  titleWhite: string
  titleRed: string
  features: ServicioFeature[]
  secondary: ServicioSecondary
}

export interface ServicioItem {
  slug: string
  nombre: string
  descripcion: string
  tag?: string
  icon: string
  mockupImage?: string
  mockupPosition?: string
  detail?: ServicioDetail
}

export interface Categoria {
  nombre: string
  slug: string
  subtitle: string
  acento: string
  count: string
  items: ServicioItem[]
}

export const CATEGORIAS: Categoria[] = [
  {
    nombre: 'Páginas Web',
    slug: 'paginas-web',
    subtitle: 'Sitios que venden. Diseñados para convertir.',
    acento: '#E53E3E',
    count: '3 servicios',
    items: [
      {
        slug: 'landing-page',
        nombre: 'Landing Page',
        descripcion: 'Una página profesional, rápida y optimizada para móvil. Perfecta para negocios que necesitan presencia digital inmediata.',
        tag: 'Ideal para empezar',
        icon: 'M3 9h18M3 3h18v18H3zM9 21V9',
        mockupImage: '/servicios/landing-page.jpg',
      },
      {
        slug: 'sitio-web-completo',
        nombre: 'Sitio Web Completo',
        descripcion: '5 a 8 páginas con diseño profesional, blog, SEO básico e integración con WhatsApp. Para negocios que quieren una presencia digital seria.',
        icon: 'M2 3h20v14H2zM8 21h8M12 17v4',
        mockupImage: '/servicios/sitio-web-completo.jpg',
        detail: {
          titleWhite: 'Sitio Web',
          titleRed: 'Completo.',
          features: [
            { icon: 'palette', title: 'Diseño 100% personalizado', desc: 'Alineado a tu marca y objetivos.' },
            { icon: 'search', title: 'Optimizado para SEO', desc: 'Estructura pensada para posicionar.' },
            { icon: 'zap', title: 'Rápido y seguro', desc: 'Rendimiento, velocidad y respaldo.' },
            { icon: 'whatsapp', title: 'Integración WhatsApp', desc: 'Conecta y convierte 24/7.' },
          ],
          secondary: {
            type: 'includes-process',
            includes: [
              { icon: 'layout', label: 'De 5 a 8 páginas diseñadas a medida' },
              { icon: 'file', label: 'Blog integrado para contenido' },
              { icon: 'search', label: 'SEO básico on-page' },
              { icon: 'whatsapp', label: 'Integración con WhatsApp' },
              { icon: 'pin', label: 'Formulario de contacto y Google Maps' },
              { icon: 'phone', label: 'Responsive 100% móvil' },
              { icon: 'shield', label: 'Optimización de velocidad y seguridad' },
            ],
            process: [
              { icon: 'chat', title: 'Descubrimiento', desc: 'Entendemos tu negocio, objetivos y audiencia.' },
              { icon: 'edit', title: 'Diseño UI/UX', desc: 'Creamos una propuesta visual estratégica.' },
              { icon: 'code', title: 'Desarrollo', desc: 'Construimos tu sitio con tecnología de alto rendimiento.' },
              { icon: 'clipboard', title: 'Contenido', desc: 'Integramos textos, imágenes y elementos clave.' },
              { icon: 'rocket', title: 'Lanzamiento', desc: 'Publicamos tu sitio y lo conectamos con todo.' },
              { icon: 'chart', title: 'Soporte continuo', desc: 'Mantenimiento y mejoras para que sigas creciendo.' },
            ],
          },
        },
      },
      {
        slug: 'web-agente-ia',
        nombre: 'Web + Agente IA',
        descripcion: 'Sitio web completo con STRIKER integrado desde el día uno. Tu negocio en línea y atendiendo clientes 24/7 desde el lanzamiento.',
        tag: 'Más completo',
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        mockupImage: '/servicios/web-agente-ia.jpg',
        detail: {
          titleWhite: 'Web +',
          titleRed: 'Agente IA.',
          features: [
            { icon: 'clock', title: 'Atención 24/7', desc: 'Responde clientes al instante, incluso mientras duermes.' },
            { icon: 'target', title: 'Califica y convierte', desc: 'Identifica oportunidades, responde preguntas y agenda citas.' },
            { icon: 'link', title: 'Integrado a tu negocio', desc: 'Conectado con WhatsApp, CRM, pagos y más.' },
            { icon: 'sparkles', title: 'Diseño que vende', desc: 'Sitios rápidos, modernos y optimizados para generar resultados.' },
          ],
          secondary: {
            type: 'howworks-cta',
            howworks: [
              { icon: 'chat', title: 'Entendemos tu negocio', desc: 'Analizamos tus objetivos, público y procesos.' },
              { icon: 'layout', title: 'Diseñamos tu sitio', desc: 'Creamos un sitio moderno, rápido y optimizado.' },
              { icon: 'bot', title: 'Activamos tu agente IA', desc: 'Entrenamos tu agente con la información de tu negocio.' },
              { icon: 'link', title: 'Conectamos todo', desc: 'Integramos WhatsApp, CRM, pagos y herramientas.' },
              { icon: 'rocket', title: 'Lanzamos y escalamos', desc: 'Publicamos tu sitio y optimizamos resultados.' },
            ],
            ctaTitle: 'Listo para llevar tu negocio al siguiente nivel.',
          },
        },
      },
    ],
  },
  {
    nombre: 'Servicios Digitales',
    slug: 'servicios-digitales',
    subtitle: 'Todo lo que tu negocio necesita para crecer en línea.',
    acento: '#3B82F6',
    count: '4 servicios',
    items: [
      {
        slug: 'ecommerce',
        nombre: 'E-commerce',
        descripcion: 'Tienda en línea completa con catálogo, carrito de compras y pagos integrados con Wompi. Lista para vender desde el día uno.',
        icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
      },
      {
        slug: 'seo-local',
        nombre: 'SEO Local',
        descripcion: 'Posicionamiento en Google Maps y búsquedas locales. Tu negocio aparece primero cuando alguien busca tu servicio en El Salvador.',
        icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a1 1 0 110-2 1 1 0 010 2z',
      },
      {
        slug: 'whatsapp-marketing',
        nombre: 'WhatsApp Marketing',
        descripcion: 'Envío masivo de mensajes a tu lista de clientes con ofertas y promociones. Completamente legal con WhatsApp Business API.',
        icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
      },
      {
        slug: 'erp-simple',
        nombre: 'ERP Simple',
        descripcion: 'Sistema de inventario, ventas y facturación para negocios medianos. Control total de tu operación desde cualquier dispositivo.',
        tag: 'Alto impacto',
        icon: 'M9 17H7A5 5 0 013 12v0a5 5 0 015-5h2M15 7h2a5 5 0 015 5v0a5 5 0 01-5 5h-2M8 12h8',
      },
    ],
  },
  {
    nombre: 'Diseño',
    slug: 'diseno',
    subtitle: 'Tu marca, con una imagen que vende sola.',
    acento: '#8B5CF6',
    count: '3 servicios',
    items: [
      {
        slug: 'identidad-de-marca',
        nombre: 'Identidad de Marca',
        descripcion: 'Logo, paleta de colores, tipografía y manual de marca completo. Tu negocio con imagen profesional desde el día uno.',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      },
      {
        slug: 'diseno-para-redes',
        nombre: 'Diseño para Redes',
        descripcion: 'Templates para posts, stories y covers coherentes con tu marca. Tu presencia digital siempre consistente y profesional.',
        icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      },
      {
        slug: 'material-impreso',
        nombre: 'Material Impreso',
        descripcion: 'Tarjetas de presentación, brochures, banners y flyers. Diseño digital que funciona también en el mundo físico.',
        icon: 'M17 17H17.01M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7l-4-4z',
      },
    ],
  },
]

export function getServicioBySlug(slug: string) {
  for (const cat of CATEGORIAS) {
    const idx = cat.items.findIndex((i) => i.slug === slug)
    if (idx !== -1) return { categoria: cat, item: cat.items[idx], index: idx }
  }
  return null
}

export function getAllServicioSlugs() {
  return CATEGORIAS.flatMap((cat) => cat.items.map((i) => i.slug))
}
