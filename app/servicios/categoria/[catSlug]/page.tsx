import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIAS, getCategoriaBySlug } from '@/lib/servicios'
import { CategoriaSection } from '@/components/sections/CategoriaSection'
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
  const index = CATEGORIAS.findIndex((c) => c.slug === cat.slug)

  return (
    <>
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <CategoriaSection cat={cat} index={index} />
      </div>
      <CtaFinal />
      <FooterSection />
    </>
  )
}
