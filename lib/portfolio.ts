/* ══════════════════════════════════════════════════════════════════
   PORTAFOLIO

   ⚠️  Datto Business Network es el ÚNICO caso real. Los cinco proyectos
   de PROYECTOS son PLACEHOLDERS de maqueta: nombres, descripciones,
   métricas e imágenes son inventados para poder construir la página.
   Reemplazarlos por trabajo real antes de publicar.
   ══════════════════════════════════════════════════════════════════ */

export type CategoriaId =
  | 'sitios-web'
  | 'tiendas-online'
  | 'automatizaciones'
  | 'branding'
  | 'aplicaciones'
  | 'ia-chatbots'

export interface Categoria {
  id: CategoriaId
  label: string
}

export const CATEGORIAS: Categoria[] = [
  { id: 'sitios-web', label: 'Sitios web' },
  { id: 'tiendas-online', label: 'Tiendas online' },
  { id: 'automatizaciones', label: 'Automatizaciones' },
  { id: 'branding', label: 'Branding' },
  { id: 'aplicaciones', label: 'Aplicaciones' },
  { id: 'ia-chatbots', label: 'IA & Chatbots' },
]

export interface Proyecto {
  id: string
  nombre: string
  categoria: CategoriaId
  categoriaLabel: string
  desc: string
  image: string
  /** Cuanto más bajo, más reciente */
  orden: number
  url?: string
  /** Marca los casos inventados de maqueta */
  placeholder?: boolean
}

export const PROYECTOS: Proyecto[] = [
  {
    id: 'elevate-studio',
    nombre: 'Elevate Studio',
    categoria: 'sitios-web',
    categoriaLabel: 'Sitio web',
    desc: 'Sitio web corporativo para agencia de marketing.',
    image: '/portfolio/elevate-studio.jpg',
    orden: 2,
    placeholder: true,
  },
  {
    id: 'rinnova-store',
    nombre: 'Rinnova Store',
    categoria: 'tiendas-online',
    categoriaLabel: 'Tienda online',
    desc: 'Tienda online en Shopify para venta de mobiliario de oficina.',
    image: '/portfolio/rinnova-store.jpg',
    orden: 3,
    placeholder: true,
  },
  {
    id: 'flow-control',
    nombre: 'Flow Control',
    categoria: 'automatizaciones',
    categoriaLabel: 'Automatización',
    desc: 'Automatización de procesos y CRM para gestión de clientes.',
    image: '/portfolio/flow-control.jpg',
    orden: 4,
    placeholder: true,
  },
  {
    id: 'black-energy',
    nombre: 'Black Energy',
    categoria: 'branding',
    categoriaLabel: 'Branding',
    desc: 'Identidad de marca para bebida energética.',
    image: '/portfolio/black-energy.jpg',
    orden: 5,
    placeholder: true,
  },
  {
    id: 'apex-chatbot',
    nombre: 'Apex Chatbot',
    categoria: 'ia-chatbots',
    categoriaLabel: 'IA & Chatbot',
    desc: 'Chatbot con IA para atención al cliente 24/7.',
    image: '/portfolio/apex-chatbot.jpg',
    orden: 6,
    placeholder: true,
  },
]

/* ── Caso destacado — este sí es real ─────────────────────────────── */

export const CASO_DESTACADO = {
  cliente: 'Datto',
  nombre: 'Business Network',
  desc: 'Desarrollo web corporativo y estrategia digital completa para una empresa salvadoreña de soluciones tecnológicas.',
  image: '/portfolio/datto-hero.jpg',
  url: 'https://dattogroup.com',
  metricas: [
    { icon: 'inbox' as const, valor: '+70%', label: 'Solicitudes' },
    { icon: 'trend' as const, valor: '+45%', label: 'Conversión' },
    { icon: 'share' as const, valor: '+120%', label: 'Tráfico orgánico' },
  ],
  /* Capturas reales del sitio entregado */
  galeria: [
    { src: '/portfolio/datto-servicios.jpg', titulo: 'Soluciones empresariales' },
    { src: '/portfolio/datto-catalogo.jpg', titulo: 'Catálogo de productos' },
    { src: '/portfolio/datto-proyectos.jpg', titulo: 'Portafolio de proyectos' },
    { src: '/portfolio/datto-planes.jpg', titulo: 'Planes Microsoft 365' },
    { src: '/portfolio/datto-contacto.jpg', titulo: 'Contacto' },
  ],
}

/* ── Cifras del encabezado ────────────────────────────────────────── */

export const METRICAS_HERO = [
  { valor: '50+', label: 'Proyectos entregados' },
  { valor: '20+', label: 'Industrias trabajadas' },
  { valor: '98%', label: 'Clientes satisfechos' },
  { valor: '100%', label: 'Compromiso BLITZ' },
]
