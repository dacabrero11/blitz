import Image from 'next/image'
import Link from 'next/link'
import { Target, ClipboardList, Tv, Activity, Crown } from 'lucide-react'
import { AGENTS, type Agent } from '@/lib/agents'
import { MatrixBackground } from '@/components/ui/MatrixBackground'

const CARD_ICONS: Record<NonNullable<Agent['cardIcon']>, typeof Target> = {
  target: Target,
  clipboard: ClipboardList,
  tv: Tv,
  activity: Activity,
  crown: Crown,
}

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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {AGENTS.map((agent, i) => {
            const Icon = CARD_ICONS[agent.cardIcon ?? 'target']
            const accent = agent.accentColor
            return (
              <Link
                key={agent.id}
                href={`/agentes/${agent.id}`}
                className="group relative overflow-hidden transition-all duration-300 flex flex-col"
                style={{ background: '#0a0a0a', border: `1px solid ${accent}55`, borderTop: `3px solid ${accent}` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ border: `1px solid ${accent}`, zIndex: 2 }}
                />

                {/* Number */}
                <div
                  className="absolute top-4 left-4 font-display font-black"
                  style={{ fontSize: 14, color: accent, zIndex: 3, letterSpacing: '0.05em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {agent.classification === 'elite' && (
                  <div className="absolute top-4 right-4 font-display font-bold text-white" style={{ fontSize: 8, letterSpacing: '0.14em', background: 'var(--red)', padding: '2px 6px', zIndex: 3 }}>
                    ÉLITE
                  </div>
                )}

                {/* Portrait */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 340, background: '#050505' }}
                >
                  <Image
                    src={agent.cardImage ?? agent.image}
                    alt={agent.name}
                    fill
                    className="transition-transform duration-500 group-hover:scale-105"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)' }} />
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col" style={{ background: '#0a0a0a' }}>
                  <div
                    className="flex items-center justify-center flex-shrink-0 mb-3"
                    style={{ width: 36, height: 36, background: `${accent}1a`, border: `1px solid ${accent}` }}
                  >
                    <Icon size={16} color={accent} strokeWidth={2} />
                  </div>
                  <div className="font-display font-black uppercase mb-1" style={{ fontSize: 22, color: 'var(--white)', lineHeight: 1 }}>
                    {agent.name}
                  </div>
                  <div className="font-display font-bold uppercase mb-3" style={{ fontSize: 12, color: accent, letterSpacing: '0.05em' }}>
                    {agent.role.replace('Agente de ', '').replace('Agente ', '')}
                  </div>
                  <p className="flex-1" style={{ fontSize: 12.5, color: 'var(--gray-1)', lineHeight: 1.6 }}>
                    {agent.cardDesc}
                  </p>
                  <div
                    className="font-display font-bold uppercase mt-4 transition-opacity group-hover:opacity-80"
                    style={{ fontSize: 11, color: accent, letterSpacing: '0.05em' }}
                  >
                    Más info →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
