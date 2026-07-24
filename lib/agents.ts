export type AgentId = 'striker' | 'herald' | 'signal' | 'oracle' | 'apex'

export interface AgentSkill {
  icon: 'chat' | 'target' | 'handshake' | 'calendar'
  title: string
  desc: string
}

export interface AgentTech {
  name: string
}

export interface AgentDemoMessage {
  from: 'user' | 'agent'
  text: string
  time: string
}

export interface AgentDemo {
  contactName: string
  contactNote: string
  otherContacts: { name: string; note: string; time: string }[]
  messages: AgentDemoMessage[]
}

export interface AgentProcessStep {
  icon: 'magnet' | 'chat' | 'target' | 'handshake' | 'check'
  title: string
  desc: string
}

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
  // V2 template fields — optional; only populated agents get the rich detail page
  classLabel?: string
  katakana?: string
  taglineShort?: string
  highlights?: { icon: 'target' | 'chat' | 'handshake'; label: string }[]
  skills?: AgentSkill[]
  techStack?: AgentTech[]
  demo?: AgentDemo
  process?: AgentProcessStep[]
}

export const AGENTS: Agent[] = [
  {
    id: 'striker',
    unitCode: 'STR-01',
    name: 'STRIKER',
    role: 'Agente de Ventas',
    tagline: 'Cierra tratos mientras duermes.',
    description:
      'Striker es nuestro agente de ventas inteligente. Convierte prospectos en clientes con conversaciones que persuaden, responden y cierran 24/7.',
    capabilities: ['WhatsApp', 'Catálogo', 'Calificación', 'Follow-up', 'Upsell'],
    image: '/agents/agente-ventas.png',
    logo: '/logos/striker.png',
    accentColor: '#E53E3E',
    classification: 'standard',

    classLabel: 'SALES',
    katakana: 'ストライカー',
    taglineShort: 'Conecta. Persuade. Cierra.',
    highlights: [
      { icon: 'target', label: 'Califica prospectos' },
      { icon: 'chat', label: 'Conversa y persuade' },
      { icon: 'handshake', label: 'Cierra y convierte' },
    ],
    skills: [
      { icon: 'chat', title: 'Conversaciones naturales', desc: 'Habla como tu marca, entiende a tus clientes y responde al instante.' },
      { icon: 'target', title: 'Calificación inteligente', desc: 'Identifica prospectos calientes y los prioriza para tu equipo.' },
      { icon: 'handshake', title: 'Cierre automático', desc: 'Guía al cliente hasta la decisión final y concreta la venta.' },
      { icon: 'calendar', title: 'Seguimiento continuo', desc: 'No deja oportunidades en visto. Da seguimiento y recupera leads.' },
    ],
    techStack: [{ name: 'OpenAI' }, { name: 'Node.js' }, { name: 'MongoDB' }, { name: 'Vercel' }],
    demo: {
      contactName: 'Juan Pérez',
      contactNote: 'Interesado en precios',
      otherContacts: [
        { name: 'María Gómez', note: 'Cotización enviada', time: '5m' },
        { name: 'Carlos Luna', note: 'Quiere más información', time: '12m' },
        { name: 'Laura Sánchez', note: 'Lista para comprar', time: '18m' },
      ],
      messages: [
        { from: 'user', text: '¡Hola! ¿En qué puedo ayudarte hoy?', time: '11:34 AM' },
        { from: 'agent', text: 'Hola, me interesa saber más sobre sus servicios', time: '11:34 AM' },
        { from: 'user', text: '¡Excelente! Cuéntame un poco sobre tu negocio para ayudarte mejor.', time: '11:35 AM' },
        { from: 'agent', text: 'Tenemos una ferretería con 3 sucursales', time: '11:35 AM' },
        { from: 'user', text: 'Perfecto, tengo soluciones específicas para ferreterías como la tuya. ¿Agendamos una demo?', time: '11:36 AM' },
      ],
    },
    process: [
      { icon: 'magnet', title: 'Atrae', desc: 'Captura leads desde todos tus canales.' },
      { icon: 'chat', title: 'Conversa', desc: 'Inicia conversaciones al instante.' },
      { icon: 'target', title: 'Califica', desc: 'Identifica intención y necesidad.' },
      { icon: 'handshake', title: 'Persuade', desc: 'Responde objeciones y genera confianza.' },
      { icon: 'check', title: 'Cierra', desc: 'Concreta la venta y la registra en tu CRM.' },
    ],
  },
  {
    id: 'herald',
    unitCode: 'HER-01',
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
    unitCode: 'SIG-01',
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
    unitCode: 'ORA-01',
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
    unitCode: 'APX-01',
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
