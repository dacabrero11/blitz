import Image from 'next/image'
import Link from 'next/link'
import { AGENTS } from '@/lib/agents'
import { MatrixBackground } from '@/components/ui/MatrixBackground'

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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {AGENTS.map((agent) => (
            <Link
              key={agent.id}
              href={`/agentes/${agent.id}`}
              className="group relative overflow-hidden transition-all duration-300 flex flex-col"
              style={{ background: '#0a0a0a', border: '1px solid var(--border)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ border: '1px solid var(--red)', zIndex: 2 }} />

              {/* Fixed height image container with explicit position relative */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: 220,
                  background: 'linear-gradient(180deg, #0f0f0f 0%, #080808 100%)',
                  position: 'relative',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(229,62,62,0.2), transparent 60%)', zIndex: 1 }}
                />
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={180}
                  height={215}
                  className="transition-transform duration-500 group-hover:scale-105"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '100%',
                    width: 'auto',
                    maxWidth: 'none',
                    objectFit: 'contain',
                    objectPosition: 'bottom',
                    filter: 'drop-shadow(0 0 16px rgba(229,62,62,0.3))',
                    zIndex: 2,
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-3 shrink-0" style={{ borderTop: '1px solid var(--border-2)', background: '#080808' }}>
                <div className="text-label mb-0.5" style={{ fontSize: 9 }}>{agent.role}</div>
                <div className="font-display font-black uppercase" style={{ fontSize: 18, color: 'var(--white)', lineHeight: 1 }}>
                  {agent.name}
                </div>
              </div>

              {agent.classification === 'elite' && (
                <div className="absolute top-2 right-2 font-display font-bold text-white" style={{ fontSize: 8, letterSpacing: '0.14em', background: 'var(--red)', padding: '2px 6px', zIndex: 3 }}>
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
