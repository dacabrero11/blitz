import { StrikerConfig } from './types'

const configs: StrikerConfig[] = [
  {
    clientId: 'blitz',
    businessName: 'BLITZ Digital',
    businessType: 'agency',
    about: `BLITZ es una agencia salvadoreña que construye páginas web con agentes de inteligencia artificial para negocios. No vendemos solo páginas — vendemos sistemas que trabajan 24/7 por el negocio. Caso de éxito: Ferreterías Lemus (20 sucursales) con tienda online + agente IA + pagos Wompi.`,
    location: 'San Salvador, El Salvador',
    hours: 'Lun-Vie 8am-6pm',
    contactUrl: 'wa.me/50379102453',
    agentName: 'STRIKER',
    tone: 'salvadoreño',
    language: 'es',
    products: [
      { id: 'striker-agent', name: 'Agente STRIKER', description: 'Atiende y califica clientes en WhatsApp/web 24/7', price: 200, currency: 'USD', available: true },
      { id: 'herald-agent', name: 'Agente HERALD', description: 'Secretario virtual que agenda citas automáticamente', price: 300, currency: 'USD', available: true },
      { id: 'signal-agent', name: 'Agente SIGNAL', description: 'Genera contenido para redes sociales con IA', price: 250, currency: 'USD', available: true },
      { id: 'oracle-agent', name: 'Agente ORACLE', description: 'Dashboard de reportes y análisis de negocio', price: 350, currency: 'USD', available: true },
      { id: 'apex-bundle', name: 'APEX — Todos los agentes', description: 'STRIKER + HERALD + SIGNAL + ORACLE integrados', price: 800, currency: 'USD', available: true },
    ],
    upsells: [
      { triggerProductId: 'striker-agent', suggestProductId: 'herald-agent', message: 'Muchos clientes combinan STRIKER con HERALD para que el agente también agende las citas. Es la combinación más popular.' },
      { triggerProductId: 'herald-agent', suggestProductId: 'striker-agent', message: 'Si HERALD va a agendar citas, STRIKER puede traer los leads primero. Juntos trabajan 24/7 sin que tengas que hacer nada.' },
      { triggerProductId: 'striker-agent', suggestProductId: 'apex-bundle', message: 'El paquete APEX incluye STRIKER y los 4 agentes por $800. Ahorrás $300 vs comprarlos por separado.' },
    ],
    ownerWhatsApp: '+50379102453',
    ownerEmail: 'daniel@blitzdigital.online',
    notificationMethod: 'both',
    channels: ['whatsapp', 'messenger', 'instagram', 'web'],
    allowedDomains: ['blitzdigital.online', 'websy-teal.vercel.app', 'localhost'],
  },
  {
    clientId: 'ferreterias-lemus',
    businessName: 'Ferreterías Lemus',
    businessType: 'retail',
    about: `Ferreterías Lemus es la cadena de ferreterías más confiable de El Salvador con 20 sucursales. Vendemos materiales de construcción, herramientas, plomería, electricidad y más. Entrega a domicilio disponible en San Salvador.`,
    location: 'El Salvador — 20 sucursales',
    hours: 'Lun-Sáb 7am-6pm',
    contactUrl: 'ferreterias-lemus.com',
    agentName: 'Leo',
    tone: 'casual',
    language: 'es',
    products: [
      { id: 'cemento-bolsa', name: 'Cemento (bolsa 42.5kg)', description: 'Cemento Portland tipo GU para construcción general', price: 9.5, currency: 'USD', available: true },
      { id: 'varilla-3-8', name: 'Varilla corrugada 3/8"', description: 'Varilla de acero corrugada para construcción, 6 metros', price: 4.25, currency: 'USD', available: true },
      { id: 'block-estandar', name: 'Block estándar', description: 'Block de concreto 20x20x40cm', price: 0.65, currency: 'USD', available: true },
    ],
    upsells: [
      { triggerProductId: 'cemento-bolsa', suggestProductId: 'block-estandar', message: '¿Vas a pegar blocks? Te conviene llevar blocks también, así no hacés dos viajes.' },
      { triggerProductId: 'varilla-3-8', suggestProductId: 'cemento-bolsa', message: 'Con las varillas normalmente se necesita cemento para la colada. ¿Cuántas bolsas necesitás?' },
    ],
    ownerWhatsApp: '+50300000000',
    ownerEmail: 'ventas@ferreterias-lemus.com',
    notificationMethod: 'whatsapp',
    channels: ['whatsapp', 'web'],
    allowedDomains: ['ferreterias-lemus.com'],
  },
]

const configMap = new Map<string, StrikerConfig>(configs.map((c) => [c.clientId, c]))

export function getConfig(clientId: string): StrikerConfig | null {
  return configMap.get(clientId) ?? null
}

export function getConfigByDomain(domain: string): StrikerConfig | null {
  return configs.find((c) => c.allowedDomains.some((d) => domain.includes(d))) ?? null
}

export function getAllClientIds(): string[] {
  return configs.map((c) => c.clientId)
}
