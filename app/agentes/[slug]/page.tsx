import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AGENTS, getAgent, type AgentId } from '@/lib/agents'
import { AgentHero } from '@/components/sections/AgentHero'
import { AgentCapabilities } from '@/components/sections/AgentHero'
import { CtaFinal, FooterSection } from '@/components/sections/SharedSections'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const agent = AGENTS.find((a) => a.id === slug)
  if (!agent) return {}
  return { title: `${agent.name} — ${agent.role}`, description: agent.description }
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params
  if (!AGENTS.some((a) => a.id === slug)) notFound()
  const agent = getAgent(slug as AgentId)
  return (
    <>
      <AgentHero agent={agent} />
      <AgentCapabilities agent={agent} />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
