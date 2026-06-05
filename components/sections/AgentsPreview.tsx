import Image from 'next/image'
import Link from 'next/link'
import { AGENTS } from '@/lib/agents'

export function AgentsPreview() {
  return (
    <section
      className="section-padding"
      style={{
        borderBottom: '1px solid var(--border-2)',
        background: 'linear-gradient(180deg, #0d0d0d 0%, #080808 100%)',
      }}
    >
      <div className="container">
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {AGENTS.map((agent) => (
            <Link
              key={agent.id}
              href={`/agentes/${agent.id}`}
              className="group relative overflow-hidden transition-all duration-300 flex flex-col"
              style={{ background: 'var(--black)', border: '1px solid var(--border)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ border: '1px solid var(--red)', zIndex: 2 }} />

              {/* Image box — tall enough to show full agent */}
              <div
                className="relative flex-1 flex items-end justify-center overflow-hidden"
                style={{
                  height: 240,
                  background: 'linear-gradient(180deg, #0d0d0d 0%, #080808 100%)',
                }}
              >
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(229,62,62,0.18), transparent 60%)' }} />
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 0 16px rgba(229,62,62,0.3))', padding: '8px 4px 0' }}
                />
              </div>

              {/* Info */}
              <div className="p-3 shrink-0" style={{ borderTop: '1px solid var(--border-2)' }}>
                <div className="text-label mb-0.5" style={{ fontSize: 9 }}>{agent.role}</div>
                <div className="font-display font-black uppercase" style={{ fontSize: 18, color: 'var(--white)', lineHeight: 1 }}>
                  {agent.name}
                </div>
              </div>

              {agent.classification === 'elite' && (
                <div className="absolute top-2 right-2 font-display font-bold text-white" style={{ fontSize: 8, letterSpacing: '0.14em', background: 'var(--red)', padding: '2px 6px' }}>
                  ÉLITE
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
