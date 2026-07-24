import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AGENTS, getAgent, type AgentId } from '@/lib/agents'
import { AgentHero, AgentCapabilities } from '@/components/sections/AgentHero'
import { AgentHeroV2, AgentDetailSections } from '@/components/sections/AgentDetail'
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
  const hasDetailTemplate = !!agent.skills

  return (
    <>
      {hasDetailTemplate ? <AgentHeroV2 agent={agent} /> : <AgentHero agent={agent} />}
      {hasDetailTemplate ? <AgentDetailSections agent={agent} /> : <AgentCapabilities agent={agent} />}
      <CtaFinal />
      <FooterSection />
    </>
  )
}
