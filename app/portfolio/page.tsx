import type { Metadata } from 'next'
import { PortfolioHero } from '@/components/sections/PageSections'
import { CaseStudy } from '@/components/sections/PageSections'
import { CtaFinal, FooterSection } from '@/components/sections/SharedSections'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Casos de éxito reales. Proyectos construidos con Next.js 15 e inteligencia artificial para negocios en El Salvador.',
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <CaseStudy />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
