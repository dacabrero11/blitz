import type { Metadata } from 'next'
import { AgentSelect } from '@/components/sections/AgentSelect'
import { CtaFinal, FooterSection } from '@/components/sections/SharedSections'

export const metadata: Metadata = {
  title: 'Agentes IA',
  description: '5 agentes de inteligencia artificial para automatizar tu negocio en El Salvador.',
}

export default function AgentesPage() {
  return (
    <>
      <AgentSelect />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
