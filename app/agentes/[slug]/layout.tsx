import { AgentNav } from '@/components/ui/AgentNav'

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AgentNav />
      <div style={{ paddingTop: 72 }}>
        {children}
      </div>
    </>
  )
}
