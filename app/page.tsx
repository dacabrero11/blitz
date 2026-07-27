import { HeroSection } from '@/components/sections/HeroSection'
import { MarqueeSection } from '@/components/sections/MarqueeSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { AgentsPreview } from '@/components/sections/AgentsPreview'
import { CaseStudyDatto } from '@/components/sections/CaseStudyDatto'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FaqSection, CtaFinal, FooterSection } from '@/components/sections/SharedSections'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ProblemSection />
      <AgentsPreview />
      <CaseStudyDatto />
      <ProcessSection />
      <FaqSection />
      <CtaFinal />
      <FooterSection />
    </>
  )
}
