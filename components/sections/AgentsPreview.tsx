import Link from 'next/link'
import { MatrixBackground } from '@/components/ui/MatrixBackground'
import { AgentesGrid } from '@/components/ui/AgentesGrid'

export function AgentsPreview() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ borderBottom: '1px solid var(--border-2)' }}
    >
      <MatrixBackground />
      {/* Dark overlay so circuit doesnt overpower */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.82) 50%, rgba(8,8,8,0.6) 100%)', zIndex: 2 }} />

      <div className="container relative" style={{ zIndex: 3 }}>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-label mb-2">Cuartel de operaciones</p>
            <h2 className="text-d2">
              El equipo que{' '}
              <span style={{ color: 'var(--red)', display: 'block' }}>nunca duerme.</span>
            </h2>
          </div>
          <Link
            href="/agentes"
            className="hidden md:inline-flex font-display font-bold text-xs tracking-widest uppercase px-5 py-2.5 transition-all hover:text-white"
            style={{ border: '1px solid var(--gray-3)', color: 'var(--gray-1)' }}
          >
            Ver todos →
          </Link>
        </div>

        <AgentesGrid />
      </div>
    </section>
  )
}
