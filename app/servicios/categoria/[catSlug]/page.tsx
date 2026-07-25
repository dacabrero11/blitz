import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIAS, getCategoriaBySlug } from '@/lib/servicios'
import { CategoriaLandingHero, CategoriaLandingGrid, CategoriaLandingProcess } from '@/components/sections/CategoriaLanding'
import { CtaFinal, FooterSection } from '@/components/sections/SharedSections'

interface Props {
  params: Promise<{ catSlug: string }>
}

export async function generateStaticParams() {
  return CATEGORIAS.filter((c) => c.landing).map((c) => ({ catSlug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { catSlug } = await params
  const cat = getCategoriaBySlug(catSlug)
  if (!cat?.landing) return {}
  return { title: `${cat.landing.titleWhite} ${cat.landing.titleAccent}`, description: cat.landing.heroDescription }
}

export default async function CategoriaPage({ params }: Props) {
  const { catSlug } = await params
  const cat = getCategoriaBySlug(catSlug)
  if (!cat || !cat.landing) notFound()

  return (
    <>
      <CategoriaLandingHero categoria={cat} />
      <CategoriaLandingGrid categoria={cat} />
      <CategoriaLandingProcess categoria={cat} />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
