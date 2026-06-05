export type AgentId = 'striker' | 'herald' | 'signal' | 'oracle' | 'apex'

export interface Agent {
  id: AgentId
  unitCode: string
  name: string
  role: string
  tagline: string
  description: string
  capabilities: string[]
  image: string
  logo: string
  accentColor: string
  classification: 'standard' | 'elite'
}

export const AGENTS: Agent[] = [
  {
    id: 'striker',
    unitCode: 'UNIT-V',
    name: 'STRIKER',
    role: 'Agente de Ventas',
    tagline: 'Cierra tratos mientras duermes.',
    description:
      'Atiende prospectos en tiempo real, responde preguntas sobre productos y precios, califica leads y los lleva a la compra. Opera en tu web y WhatsApp simultáneamente, sin descanso y sin comisiones.',
    capabilities: ['WhatsApp', 'Catálogo', 'Calificación', 'Follow-up', 'Upsell'],
    image: '/agents/agente-ventas.png',
    logo: '/logos/striker.png',
    accentColor: '#E53E3E',
    classification: 'standard',
  },
  {
    id: 'herald',
    unitCode: 'UNIT-S',
    name: 'HERALD',
    role: 'Agente Secretario',
    tagline: 'El primero en responder. El último en rendirse.',
    description:
      'Gestiona citas, responde preguntas frecuentes, coordina mensajes internos y mantiene el orden operacional de tu negocio. Organizado, puntual y siempre disponible.',
    capabilities: ['Citas', 'FAQ', 'Agenda', 'Coordinación', 'Recordatorios'],
    image: '/agents/agente-secretario.png',
    logo: '/logos/herald.png',
    accentColor: '#888888',
    classification: 'standard',
  },
  {
    id: 'signal',
    unitCode: 'UNIT-C',
    name: 'SIGNAL',
    role: 'Agente de Contenido',
    tagline: 'Tu marca siempre transmitiendo.',
    description:
      'Genera posts, campañas, descripciones de productos y copy publicitario en segundos. Tu presencia digital activa en redes sin contratar un community manager.',
    capabilities: ['Redes sociales', 'Copywriting', 'Campañas', 'SEO', 'Imágenes'],
    image: '/agents/agente-contenido.png',
    logo: '/logos/signal.png',
    accentColor: '#E53E3E',
    classification: 'standard',
  },
  {
    id: 'oracle',
    unitCode: 'UNIT-A',
    name: 'ORACLE',
    role: 'Agente de Análisis',
    tagline: 'Ve lo que tus competidores no pueden.',
    description:
      'Monitorea métricas clave, detecta tendencias en tus ventas y genera reportes accionables. Decisiones basadas en datos, no en intuición. Nunca más operar a ciegas.',
    capabilities: ['Dashboard', 'Reportes', 'KPIs', 'Alertas', 'Predicciones'],
    image: '/agents/agente-analisis.png',
    logo: '/logos/oracle.png',
    accentColor: '#cc3333',
    classification: 'standard',
  },
  {
    id: 'apex',
    unitCode: 'UNIT-X',
    name: 'APEX',
    role: 'Comando Total',
    tagline: 'El sistema completo. Sin límites.',
    description:
      'Todos los agentes coordinados bajo una sola inteligencia que aprende de tu negocio, se adapta y escala con tus operaciones. Para negocios que van en serio.',
    capabilities: ['Orquestación', 'Multi-canal', 'Aprendizaje', 'Escalabilidad', 'Prioridad'],
    image: '/agents/super-agente.png',
    logo: '/logos/apex.png',
    accentColor: '#E53E3E',
    classification: 'elite',
  },
]

export const getAgent = (id: AgentId): Agent =>
  AGENTS.find((a) => a.id === id)!
