import { HeroSection } from '@/components/sections/HeroSection'
import { MarqueeSection } from '@/components/sections/MarqueeSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { AgentsPreview } from '@/components/sections/AgentsPreview'
import { PortfolioPreview } from '@/components/sections/PortfolioPreview'
import { ProcessSection, FaqSection, CtaFinal, FooterSection } from '@/components/sections/SharedSections'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ProblemSection />
      <AgentsPreview />
      <PortfolioPreview />
      <ProcessSection />
      <FaqSection />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
