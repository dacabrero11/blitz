import type { Metadata } from 'next'
import { HangarSection } from '@/components/sections/HangarSection'
import { OperativeCards } from '@/components/sections/OperativeCards'
import { CtaFinal, FooterSection } from '@/components/sections/SharedSections'

export const metadata: Metadata = {
  title: 'Agentes IA',
  description: '5 agentes de inteligencia artificial para automatizar tu negocio en El Salvador.',
}

export default function AgentesPage() {
  return (
    <>
      <HangarSection />
      <OperativeCards />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
