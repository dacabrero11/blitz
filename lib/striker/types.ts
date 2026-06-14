// ─── STRIKER TYPES ─────────────────────────────────────────────────────────────

export type LeadStage = 'nuevo' | 'explorando' | 'calificado' | 'agendado' | 'cerrado'
export type Channel = 'whatsapp' | 'messenger' | 'instagram' | 'tiktok' | 'web'
export type NotificationMethod = 'whatsapp' | 'email' | 'both'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  available: boolean
  variants?: string[]
  imageUrl?: string
}

export interface Upsell {
  triggerProductId: string
  suggestProductId: string
  message: string
}

export interface StrikerConfig {
  clientId: string
  businessName: string
  businessType: 'agency' | 'retail' | 'food' | 'service' | 'other'
  about: string
  location?: string
  hours?: string
  contactUrl?: string
  agentName: string
  tone: 'formal' | 'casual' | 'salvadoreño'
  language: 'es' | 'en'
  products: Product[]
  upsells: Upsell[]
  ownerWhatsApp: string
  ownerEmail: string
  notificationMethod: NotificationMethod
  channels: Channel[]
  allowedDomains: string[]
}

export interface ConversationState {
  clientId: string
  channel: Channel
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  stage: LeadStage
  leadName?: string
  leadBusiness?: string
  leadNeed?: string
  cartItems: string[]
  lastSeen: number
  messageCount: number
  notificationSent: boolean
}

export interface IncomingMessage {
  channel: Channel
  senderId: string
  text: string
  messageId: string
  clientId: string
}
