import type { Metadata } from 'next'
import { PortfolioHero } from '@/components/sections/PortfolioHero'
import { PortfolioGrid } from '@/components/sections/PortfolioGrid'
import { PortfolioCta } from '@/components/sections/PortfolioCta'
import { FooterSection } from '@/components/sections/SharedSections'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Casos de éxito reales. Proyectos construidos con Next.js 15 e inteligencia artificial para negocios en El Salvador.',
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCta />
      <FooterSection />
    </>
  )
}
