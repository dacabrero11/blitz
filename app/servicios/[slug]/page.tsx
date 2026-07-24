import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServicioBySlug, getAllServicioSlugs } from '@/lib/servicios'
import { ServicioDetail } from '@/components/sections/ServicioDetail'
import { CtaFinal, FooterSection } from '@/components/sections/SharedSections'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServicioSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const found = getServicioBySlug(slug)
  if (!found) return {}
  return { title: found.item.nombre, description: found.item.descripcion }
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params
  const found = getServicioBySlug(slug)
  if (!found) notFound()

  return (
    <>
      <ServicioDetail categoria={found.categoria} item={found.item} index={found.index} />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
