import type { Metadata } from 'next'
import { ServiciosHero } from '@/components/sections/ServiciosHero'
import { ServiciosGrid } from '@/components/sections/ServiciosGrid'
import { CtaFinal, FooterSection } from '@/components/sections/SharedSections'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Agentes IA, e-commerce, SEO, diseño y más. Todo lo que tu negocio necesita para crecer digitalmente en El Salvador.',
}

export default function ServiciosPage() {
  return (
    <>
      <ServiciosHero />
      <ServiciosGrid />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
