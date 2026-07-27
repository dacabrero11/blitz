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
  cardImage?: string
  detail?: ServicioDetail
}

export interface CategoriaFeature {
  icon: string
  title: string
  desc: string
}

export interface CategoriaProcessStep {
  icon: string
  title: string
  desc: string
}

export interface CategoriaBadge {
  icon: string
  label: string
}

export interface CategoriaLanding {
  titleWhite: string
  titleAccent: string
  heroDescription: string
  features: CategoriaFeature[]
  heroBadgesLeft?: CategoriaBadge[]
  heroBadgesRight?: CategoriaBadge[]
  heroVisual?: string
  heroVisualPosition?: string
  miniCta?: { question: string; note: string; buttonLabel: string }
  process: CategoriaProcessStep[]
  ctaTitle: string
  ctaSubtitle: string
}

export interface Categoria {
  nombre: string
  slug: string
  subtitle: string
  acento: string
  count: string
  landing?: CategoriaLanding
  items: ServicioItem[]
}

export const CATEGORIAS: Categoria[] = [
  {
    nombre: 'Páginas Web',
    slug: 'paginas-web',
    subtitle: 'Sitios que venden. Diseñados para convertir.',
    acento: '#E53E3E',
    count: '3 servicios',
    landing: {
      titleWhite: 'Páginas web',
      titleAccent: 'que venden.',
      heroDescription: 'Sitios modernos, rápidos y diseñados para convertir visitantes en clientes reales.',
      heroVisual: '/servicios/hero-paginas-web.jpg',
      features: [
        { icon: 'palette', title: 'Diseño a medida', desc: 'Cada sitio pensado para tu marca.' },
        { icon: 'search', title: 'Optimizado para SEO', desc: 'Estructura lista para posicionar.' },
        { icon: 'zap', title: 'Rápido y responsive', desc: 'Carga veloz en cualquier dispositivo.' },
        { icon: 'target', title: 'Listo para convertir', desc: 'Formularios y WhatsApp integrados.' },
      ],
      process: [
        { icon: 'search', title: 'Descubrimiento', desc: 'Entendemos tu negocio y objetivos.' },
        { icon: 'edit', title: 'Diseño', desc: 'Creamos una propuesta visual estratégica.' },
        { icon: 'code', title: 'Desarrollo', desc: 'Construimos tu sitio con alto rendimiento.' },
        { icon: 'rocket', title: 'Lanzamiento', desc: 'Publicamos, medimos y optimizamos.' },
      ],
      ctaTitle: 'Tu sitio web. Listo para vender.',
      ctaSubtitle: 'Agenda una consultoría gratuita y definimos qué necesita tu negocio.',
    },
    items: [
      {
        slug: 'landing-page',
        nombre: 'Landing Page',
        descripcion: 'Una página profesional, rápida y optimizada para móvil. Perfecta para negocios que necesitan presencia digital inmediata.',
        tag: 'Ideal para empezar',
        icon: 'M3 9h18M3 3h18v18H3zM9 21V9',
        mockupImage: '/servicios/landing-page.jpg',
        cardImage: '/servicios/landing-page.jpg',
      },
      {
        slug: 'sitio-web-completo',
        nombre: 'Sitio Web Completo',
        descripcion: '5 a 8 páginas con diseño profesional, blog, SEO básico e integración con WhatsApp. Para negocios que quieren una presencia digital seria.',
        icon: 'M2 3h20v14H2zM8 21h8M12 17v4',
        mockupImage: '/servicios/sitio-web-completo.jpg',
        cardImage: '/servicios/sitio-web-completo.jpg',
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
        cardImage: '/servicios/web-agente-ia.jpg',
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
    subtitle: 'Tecnología e integraciones que simplifican procesos, ahorran tiempo y multiplican resultados.',
    acento: '#3B82F6',
    count: '8 servicios',
    landing: {
      titleWhite: 'Servicios de',
      titleAccent: 'Automatización.',
      heroDescription: 'Tecnología e integraciones que simplifican procesos, ahorran tiempo y multiplican resultados.',
      features: [
        { icon: 'zap', title: 'Más eficiencia', desc: 'Automatizamos tareas repetitivas.' },
        { icon: 'trending', title: 'Más ventas', desc: 'Sistemas que convierten y fidelizan.' },
        { icon: 'dollar', title: 'Menos costos', desc: 'Procesos optimizados y medibles.' },
        { icon: 'shield', title: 'Más control', desc: 'Información centralizada y segura.' },
      ],
      process: [
        { icon: 'search', title: 'Analizamos', desc: 'Entendemos tu negocio y objetivos.' },
        { icon: 'edit', title: 'Diseñamos', desc: 'Creamos la estrategia y automatizaciones.' },
        { icon: 'settings', title: 'Implementamos', desc: 'Integramos y configuramos todo para ti.' },
        { icon: 'chart', title: 'Optimizamos', desc: 'Medimos, ajustamos y escalamos resultados.' },
      ],
      heroVisual: '/servicios/hero-automatizacion.jpg',
      heroVisualPosition: 'right top',
      ctaTitle: 'Automatiza hoy. Escala mañana.',
      ctaSubtitle: 'Agenda una consultoría gratuita y descubre cómo podemos ayudarte.',
    },
    items: [
      {
        slug: 'seo-local',
        nombre: 'SEO Local',
        descripcion: 'Posicionamos tu negocio en Google Maps y búsquedas locales para que te encuentren primero.',
        icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a1 1 0 110-2 1 1 0 010 2z',
        cardImage: '/servicios/cards/seo-local.jpg',
      },
      {
        slug: 'whatsapp-marketing',
        nombre: 'WhatsApp Marketing',
        descripcion: 'Envío masivo de mensajes, listas segmentadas y automatizaciones con WhatsApp Business API.',
        icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
        cardImage: '/servicios/cards/whatsapp-marketing.jpg',
      },
      {
        slug: 'ecommerce',
        nombre: 'E-commerce',
        descripcion: 'Tiendas en línea completas con catálogo, carrito de compras y pagos integrados con Wompi.',
        icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
        cardImage: '/servicios/cards/ecommerce.jpg',
      },
      {
        slug: 'erp-simple',
        nombre: 'ERP Simple',
        descripcion: 'Sistema de inventario, ventas y facturación para negocios medianos. Control total desde cualquier dispositivo.',
        icon: 'M9 17H7A5 5 0 013 12v0a5 5 0 015-5h2M15 7h2a5 5 0 015 5v0a5 5 0 01-5 5h-2M8 12h8',
        cardImage: '/servicios/cards/erp-simple.jpg',
      },
      {
        slug: 'chatbots-inteligentes',
        nombre: 'Chatbots Inteligentes',
        descripcion: 'Agentes que responden 24/7, califican leads y agendan citas automáticamente.',
        icon: 'M12 8V4H8 M4,8 H20 V20 H4 Z M2 14h2 M20 14h2 M15 13v2 M9 13v2',
        cardImage: '/servicios/cards/chatbots-inteligentes.jpg',
      },
      {
        slug: 'automatizacion-marketing',
        nombre: 'Automatización de Marketing',
        descripcion: 'Flujos automáticos de emails, recordatorios y seguimiento para nutrir y convertir más.',
        icon: 'M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14 M8 6v8',
        cardImage: '/servicios/cards/automatizacion-marketing.jpg',
      },
      {
        slug: 'agendas-y-citas',
        nombre: 'Agendas y Citas',
        descripcion: 'Agendamiento en línea, recordatorios automáticos y sincronización con Google Calendar.',
        icon: 'M8 2v4 M16 2v4 M3,4 H21 V22 H3 Z M3 10h18',
        cardImage: '/servicios/cards/agendas-y-citas.jpg',
      },
      {
        slug: 'reportes-y-dashboards',
        nombre: 'Reportes y Dashboards',
        descripcion: 'Dashboards en tiempo real con métricas clave. Toma decisiones con datos, no suposiciones.',
        icon: 'M3 3v16a2 2 0 0 0 2 2h16 M18 17V9 M13 17V5 M8 17v-3',
        cardImage: '/servicios/cards/reportes-y-dashboards.jpg',
      },
    ],
  },
  {
    nombre: 'Diseño',
    slug: 'diseno',
    subtitle: 'Tu marca, con una imagen que vende sola.',
    acento: '#8B5CF6',
    count: '5 servicios',
    landing: {
      titleWhite: 'Servicios de',
      titleAccent: 'Diseño.',
      heroDescription: 'Diseño estratégico que comunica, conecta y convierte. Hacemos que tu marca sea imposible de ignorar.',
      heroVisual: '/servicios/hero-diseno.jpg',
      features: [
        { icon: 'star', title: 'Diseños que impactan', desc: 'Creatividad con propósito y enfoque en resultados.' },
        { icon: 'target', title: 'Alineado a tu marca', desc: 'Cada pieza refleja la esencia de tu negocio.' },
        { icon: 'zap', title: 'Entrega rápida', desc: 'Procesos optimizados para cumplir siempre a tiempo.' },
      ],
      miniCta: {
        question: '¿Necesitas algo personalizado?',
        note: 'Cuéntanos tu idea y la hacemos realidad.',
        buttonLabel: 'Hablar con Diseño →',
      },
      process: [
        { icon: 'search', title: 'Entendemos', desc: 'Tu marca, objetivos y audiencia.' },
        { icon: 'edit', title: 'Diseñamos', desc: 'Ideas creativas alineadas a tu estrategia.' },
        { icon: 'video', title: 'Creamos', desc: 'Damos vida a cada pieza con precisión.' },
        { icon: 'check', title: 'Entregamos', desc: 'Revisamos, ajustamos y entregamos a tiempo.' },
      ],
      ctaTitle: 'Diseño que no solo se ve bien, vende.',
      ctaSubtitle: 'Hablemos de tu próximo proyecto.',
    },
    items: [
      {
        slug: 'identidad-de-marca',
        nombre: 'Identidad de Marca',
        descripcion: 'Creamos marcas memorables desde el nombre hasta el manual completo.',
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        cardImage: '/servicios/cards/identidad-de-marca.jpg',
        mockupImage: '/servicios/cards/identidad-de-marca.jpg',
      },
      {
        slug: 'diseno-para-redes',
        nombre: 'Diseño para Redes',
        descripcion: 'Posts, stories, covers y reels que conectan con tu audiencia y fortalecen tu marca.',
        icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        cardImage: '/servicios/cards/diseno-para-redes.jpg',
        mockupImage: '/servicios/cards/diseno-para-redes.jpg',
      },
      {
        slug: 'material-impreso',
        nombre: 'Material Impreso',
        descripcion: 'Tarjetas, brochures, flyers, banners y más. Diseño que impresiona en el mundo físico.',
        icon: 'M17 17H17.01M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7l-4-4z',
        cardImage: '/servicios/cards/material-impreso.jpg',
        mockupImage: '/servicios/cards/material-impreso.jpg',
      },
      {
        slug: 'diseno-audiovisual',
        nombre: 'Diseño Audiovisual',
        descripcion: 'Edición de video, animaciones, intros y contenido que cuenta tu historia en movimiento.',
        icon: 'm16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5 M2,6 H16 V18 H2 Z',
        cardImage: '/servicios/cards/diseno-audiovisual.jpg',
        mockupImage: '/servicios/cards/diseno-audiovisual.jpg',
      },
      {
        slug: 'presentaciones',
        nombre: 'Presentaciones',
        descripcion: 'Presentaciones que venden. Diseños profesionales que comunican valor y confianza.',
        icon: 'M2 3h20 M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3 m7 21 5-5 5 5',
        cardImage: '/servicios/cards/presentaciones.jpg',
        mockupImage: '/servicios/cards/presentaciones.jpg',
      },
    ],
  },
]

export function getCategoriaBySlug(slug: string) {
  return CATEGORIAS.find((c) => c.slug === slug) ?? null
}

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
