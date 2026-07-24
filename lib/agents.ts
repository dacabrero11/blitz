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
  heroBg?: string
  heroBgPosition?: string
  cardImage?: string
  cardIcon?: 'target' | 'clipboard' | 'tv' | 'activity' | 'crown'
  cardDesc?: string
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
    cardImage: '/agents/card-striker.jpg',
    cardIcon: 'target',
    cardDesc: 'Convierte prospectos en clientes.',

    classLabel: 'SALES',
    katakana: 'ストライカー',
    taglineShort: 'Conecta. Persuade. Cierra.',
    heroBg: '/agents/hero-striker.jpg',
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
      'Herald es nuestro agente secretario inteligente. Gestiona citas, responde preguntas frecuentes y mantiene el orden operacional de tu negocio, sin dejar a nadie esperando.',
    capabilities: ['Citas', 'FAQ', 'Agenda', 'Coordinación', 'Recordatorios'],
    image: '/agents/agente-secretario.png',
    logo: '/logos/herald.png',
    accentColor: '#D4AF37',
    classification: 'standard',
    cardImage: '/agents/card-herald.jpg',
    cardIcon: 'clipboard',
    cardDesc: 'Agenda, confirma y organiza por ti.',

    classLabel: 'SUPPORT',
    katakana: 'ヘラルド',
    taglineShort: 'Organiza. Responde. Coordina.',
    heroBg: '/agents/hero-herald.jpg',
    heroBgPosition: 'center 10%',
    highlights: [
      { icon: 'chat', label: 'Responde al instante' },
      { icon: 'target', label: 'Prioriza lo urgente' },
      { icon: 'handshake', label: 'Coordina tu equipo' },
    ],
    skills: [
      { icon: 'chat', title: 'Atención inmediata', desc: 'Responde preguntas frecuentes al instante, sin dejar a nadie esperando.' },
      { icon: 'calendar', title: 'Gestión de agenda', desc: 'Agenda, reprograma y recuerda citas automáticamente.' },
      { icon: 'handshake', title: 'Coordinación interna', desc: 'Enlaza mensajes entre equipos y mantiene todo organizado.' },
      { icon: 'target', title: 'Prioriza lo urgente', desc: 'Identifica qué necesita atención primero y escala cuando hace falta.' },
    ],
    techStack: [{ name: 'OpenAI' }, { name: 'Node.js' }, { name: 'Google Calendar' }, { name: 'Vercel' }],
    demo: {
      contactName: 'Ana Ramírez',
      contactNote: 'Quiere agendar una cita',
      otherContacts: [
        { name: 'Roberto Díaz', note: 'Confirmó su cita', time: '8m' },
        { name: 'Sofía Martínez', note: 'Reprogramó para el viernes', time: '20m' },
        { name: 'Diego Hernández', note: 'Pregunta sobre horarios', time: '35m' },
      ],
      messages: [
        { from: 'agent', text: 'Hola, ¿tienen disponibilidad para una cita mañana?', time: '9:12 AM' },
        { from: 'user', text: '¡Hola! Sí, tengo espacio a las 10:00 AM o 3:00 PM mañana. ¿Cuál prefieres?', time: '9:12 AM' },
        { from: 'agent', text: 'Las 3:00 PM está perfecto', time: '9:13 AM' },
        { from: 'user', text: 'Listo, quedaste agendada para mañana 3:00 PM. Te enviaré un recordatorio una hora antes.', time: '9:13 AM' },
      ],
    },
    process: [
      { icon: 'magnet', title: 'Recibe', desc: 'Capta la consulta desde WhatsApp, web o redes.' },
      { icon: 'chat', title: 'Responde', desc: 'Contesta preguntas frecuentes al instante.' },
      { icon: 'target', title: 'Prioriza', desc: 'Detecta qué es urgente y qué puede esperar.' },
      { icon: 'handshake', title: 'Coordina', desc: 'Agenda la cita y avisa al equipo indicado.' },
      { icon: 'check', title: 'Confirma', desc: 'Envía recordatorios y confirma la asistencia.' },
    ],
  },
  {
    id: 'signal',
    unitCode: 'SIG-01',
    name: 'SIGNAL',
    role: 'Agente de Contenido',
    tagline: 'Tu marca siempre transmitiendo.',
    description:
      'Signal es nuestro agente de contenido inteligente. Genera posts, campañas y copy publicitario en segundos, manteniendo tu presencia digital activa sin contratar un community manager.',
    capabilities: ['Redes sociales', 'Copywriting', 'Campañas', 'SEO', 'Imágenes'],
    image: '/agents/agente-contenido.png',
    logo: '/logos/signal.png',
    accentColor: '#9333EA',
    classification: 'standard',
    cardImage: '/agents/card-signal.jpg',
    cardIcon: 'tv',
    cardDesc: 'Crea contenido que conecta y vende.',

    classLabel: 'CONTENT',
    katakana: 'シグナル',
    taglineShort: 'Crea. Publica. Conecta.',
    heroBg: '/agents/hero-signal.jpg',
    highlights: [
      { icon: 'chat', label: 'Genera contenido' },
      { icon: 'target', label: 'Segmenta audiencia' },
      { icon: 'handshake', label: 'Impulsa engagement' },
    ],
    skills: [
      { icon: 'chat', title: 'Copywriting instantáneo', desc: 'Redacta posts, captions y anuncios que suenan a tu marca.' },
      { icon: 'target', title: 'Segmentación inteligente', desc: 'Sabe qué contenido funciona para cada audiencia.' },
      { icon: 'calendar', title: 'Calendario de publicación', desc: 'Programa y publica en el momento óptimo, todos los días.' },
      { icon: 'handshake', title: 'Analiza el engagement', desc: 'Mide qué contenido conecta y ajusta la estrategia.' },
    ],
    techStack: [{ name: 'OpenAI' }, { name: 'Node.js' }, { name: 'Meta API' }, { name: 'Vercel' }],
    demo: {
      contactName: 'Carlos · Ferretería El Martillo',
      contactNote: 'Pidió un post promocional',
      otherContacts: [
        { name: 'Boutique Luna', note: 'Post de temporada listo', time: '10m' },
        { name: 'Café Aroma', note: 'Solicitó 3 variaciones', time: '15m' },
        { name: 'Auto Repuestos SV', note: 'Campaña programada', time: '40m' },
      ],
      messages: [
        { from: 'agent', text: 'Necesito un post para promocionar nuestra oferta de taladros esta semana', time: '4:02 PM' },
        { from: 'user', text: '¡Claro! Aquí tienes: "Esta semana, taladros con 20% OFF en Ferretería El Martillo. ¡Arma, repara, construye!" ¿Le agrego una imagen?', time: '4:02 PM' },
        { from: 'agent', text: 'Sí, algo llamativo', time: '4:03 PM' },
        { from: 'user', text: 'Generando la imagen y programando el post para las 6:00 PM, tu horario de mayor alcance.', time: '4:03 PM' },
      ],
    },
    process: [
      { icon: 'magnet', title: 'Investiga', desc: 'Analiza tendencias y qué le funciona a tu industria.' },
      { icon: 'chat', title: 'Crea', desc: 'Redacta el copy que suena a tu marca.' },
      { icon: 'target', title: 'Diseña', desc: 'Genera imágenes y piezas visuales a la medida.' },
      { icon: 'handshake', title: 'Programa', desc: 'Publica en el horario de mayor alcance.' },
      { icon: 'check', title: 'Analiza', desc: 'Mide resultados y ajusta la siguiente publicación.' },
    ],
  },
  {
    id: 'oracle',
    unitCode: 'ORA-01',
    name: 'ORACLE',
    role: 'Agente de Análisis',
    tagline: 'Ve lo que tus competidores no pueden.',
    description:
      'Oracle es nuestro agente de análisis inteligente. Monitorea métricas clave, detecta tendencias y genera reportes accionables — decisiones basadas en datos, no en intuición.',
    capabilities: ['Dashboard', 'Reportes', 'KPIs', 'Alertas', 'Predicciones'],
    image: '/agents/agente-analisis.png',
    logo: '/logos/oracle.png',
    accentColor: '#F97316',
    classification: 'standard',
    cardImage: '/agents/card-oracle.jpg',
    cardIcon: 'activity',
    cardDesc: 'Analiza datos y te entrega decisiones inteligentes.',

    classLabel: 'ANALYTICS',
    katakana: 'オラクル',
    taglineShort: 'Mide. Predice. Decide.',
    heroBg: '/agents/hero-oracle.jpg',
    highlights: [
      { icon: 'target', label: 'Detecta tendencias' },
      { icon: 'chat', label: 'Reportes claros' },
      { icon: 'handshake', label: 'Alertas en tiempo real' },
    ],
    skills: [
      { icon: 'target', title: 'Monitoreo en tiempo real', desc: 'Vigila tus métricas clave las 24 horas, sin parpadear.' },
      { icon: 'calendar', title: 'Reportes automáticos', desc: 'Entrega resúmenes claros cuando los necesitas, no cuando sobra tiempo.' },
      { icon: 'chat', title: 'Detección de patrones', desc: 'Encuentra tendencias antes de que se vuelvan visibles a simple vista.' },
      { icon: 'handshake', title: 'Alertas accionables', desc: 'Te avisa apenas algo se sale de lo esperado.' },
    ],
    techStack: [{ name: 'OpenAI' }, { name: 'Node.js' }, { name: 'PostgreSQL' }, { name: 'Vercel' }],
    demo: {
      contactName: 'Notificaciones a Gerencia',
      contactNote: 'Reporte y alertas del día',
      otherContacts: [
        { name: 'Alerta de inventario', note: 'Producto por agotarse', time: '1h' },
        { name: 'Reporte mensual', note: 'Listo para revisar', time: '3h' },
        { name: 'Tendencia detectada', note: 'Producto en alza', time: '5h' },
      ],
      messages: [
        { from: 'user', text: 'Reporte semanal: ventas subieron 18% vs. la semana pasada.', time: '8:00 AM' },
        { from: 'user', text: 'Alerta: el producto "Taladro Pro X" se está agotando (quedan 4 unidades).', time: '8:01 AM' },
        { from: 'agent', text: 'Gracias Oracle, ¿cuál fue el canal con más conversión?', time: '8:15 AM' },
        { from: 'user', text: 'WhatsApp, con 42% de conversión. Instagram va en segundo lugar con 27%.', time: '8:15 AM' },
      ],
    },
    process: [
      { icon: 'magnet', title: 'Recopila', desc: 'Reúne datos de ventas, tráfico y redes en un solo lugar.' },
      { icon: 'chat', title: 'Analiza', desc: 'Procesa la información y encuentra patrones reales.' },
      { icon: 'target', title: 'Detecta', desc: 'Identifica oportunidades y riesgos antes que nadie.' },
      { icon: 'handshake', title: 'Reporta', desc: 'Traduce los números en decisiones claras.' },
      { icon: 'check', title: 'Alerta', desc: 'Te avisa al instante si algo necesita tu atención.' },
    ],
  },
  {
    id: 'apex',
    unitCode: 'APX-01',
    name: 'APEX',
    role: 'Comando Total',
    tagline: 'El sistema completo. Sin límites.',
    description:
      'Apex coordina a Striker, Herald, Signal y Oracle bajo una sola inteligencia que aprende de tu negocio, se adapta y escala con tus operaciones. Para negocios que van en serio.',
    capabilities: ['Orquestación', 'Multi-canal', 'Aprendizaje', 'Escalabilidad', 'Prioridad'],
    image: '/agents/super-agente.png',
    logo: '/logos/apex.png',
    accentColor: '#E53E3E',
    classification: 'elite',
    cardImage: '/agents/card-apex.jpg',
    cardIcon: 'crown',
    cardDesc: 'El líder que coordina todo el sistema.',

    classLabel: 'COMMAND',
    katakana: 'エイペックス',
    taglineShort: 'Coordina. Escala. Domina.',
    heroBg: '/agents/hero-apex.jpg',
    heroBgPosition: 'center 15%',
    highlights: [
      { icon: 'target', label: 'Orquesta agentes' },
      { icon: 'chat', label: 'Multi-canal' },
      { icon: 'handshake', label: 'Aprendizaje continuo' },
    ],
    skills: [
      { icon: 'target', title: 'Orquestación total', desc: 'Coordina a Striker, Herald, Signal y Oracle bajo una sola inteligencia.' },
      { icon: 'chat', title: 'Multi-canal real', desc: 'Opera en WhatsApp, web, redes y correo, todo a la vez.' },
      { icon: 'calendar', title: 'Aprendizaje continuo', desc: 'Se ajusta a tu negocio y mejora con cada interacción.' },
      { icon: 'handshake', title: 'Escalabilidad sin límite', desc: 'Crece con tu operación, sin contratar ni reentrenar a nadie.' },
    ],
    techStack: [{ name: 'OpenAI' }, { name: 'Node.js' }, { name: 'MongoDB' }, { name: 'Vercel' }],
    demo: {
      contactName: 'Centro de Comando',
      contactNote: 'Resumen de actividad de todos los agentes',
      otherContacts: [
        { name: 'Oracle', note: 'Reporte semanal listo', time: '1h' },
        { name: 'Striker', note: '2 leads calificados', time: '2h' },
        { name: 'Herald', note: 'Agenda del día confirmada', time: '4h' },
      ],
      messages: [
        { from: 'user', text: 'Striker cerró 3 ventas nuevas hoy.', time: '6:00 PM' },
        { from: 'user', text: 'Herald agendó 5 citas para mañana.', time: '6:00 PM' },
        { from: 'agent', text: '¿Y Signal?', time: '6:01 PM' },
        { from: 'user', text: 'Signal publicó 2 posts y generó 340 interacciones en las últimas 24h.', time: '6:01 PM' },
      ],
    },
    process: [
      { icon: 'magnet', title: 'Conecta', desc: 'Une todos tus canales bajo un mismo sistema.' },
      { icon: 'chat', title: 'Distribuye', desc: 'Envía cada tarea al agente correcto: ventas, soporte, contenido o análisis.' },
      { icon: 'target', title: 'Coordina', desc: 'Sincroniza las acciones entre agentes en tiempo real.' },
      { icon: 'handshake', title: 'Aprende', desc: 'Ajusta el sistema según lo que mejor funciona para tu negocio.' },
      { icon: 'check', title: 'Escala', desc: 'Crece contigo, sin límites de capacidad.' },
    ],
  },
]

export const getAgent = (id: AgentId): Agent =>
  AGENTS.find((a) => a.id === id)!
