import type { Metadata } from 'next'
import { ContactHero, RoiCalculator, ContactForm } from '@/components/sections/PageSections'
import { FooterSection } from '@/components/sections/SharedSections'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Habla con Websy. Primera consulta gratis. Respuesta en menos de 2 horas.',
}

export default function ContactoPage() {
  return (
    <>
      <ContactHero />
      <RoiCalculator />
      <ContactForm />
      <FooterSection />
    </>
  )
}
