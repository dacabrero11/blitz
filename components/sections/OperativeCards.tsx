import Image from 'next/image'
import Link from 'next/link'
import { AGENTS } from '@/lib/agents'

export function OperativeCards() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        <div className="flex flex-col gap-2">
          {AGENTS.map((agent, idx) => (
            <Link
              key={agent.id}
              href={`/agentes/${agent.id}`}
              className="group grid items-stretch transition-all duration-200"
              style={{
                gridTemplateColumns: agent.classification === 'elite' ? '220px 1fr 140px' : '180px 1fr 120px',
                border: agent.classification === 'elite' ? '1px solid rgba(229,62,62,0.4)' : '1px solid var(--border)',
                background: agent.classification === 'elite' ? '#0d0808' : 'var(--black-2)',
              }}
            >
              {/* Image column */}
              <div
                className="relative flex items-end justify-center overflow-hidden"
                style={{
                  background: 'var(--black)',
                  borderRight: '1px solid var(--border)',
                  minHeight: agent.classification === 'elite' ? 220 : 180,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(229,62,62,0.1), transparent 65%)' }}
                />
                {/* Unit badge */}
                <div
                  className="absolute top-3 left-3 font-display font-bold uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    background: 'rgba(229,62,62,0.15)',
                    border: '1px solid rgba(229,62,62,0.3)',
                    color: 'var(--red)',
                    padding: '2px 7px',
                  }}
                >
                  {agent.unitCode}
                </div>
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={agent.classification === 'elite' ? 180 : 150}
                  height={agent.classification === 'elite' ? 210 : 175}
                  className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 0 16px rgba(229,62,62,0.2))' }}
                />
              </div>

              {/* Body column */}
              <div
                className="p-7 flex flex-col justify-between"
                style={{ borderRight: '1px solid var(--border)' }}
              >
                <div>
                  {agent.classification === 'elite' && (
                    <div
                      className="inline-block font-display font-bold uppercase mb-3"
                      style={{
                        fontSize: 9,
                        letterSpacing: '0.16em',
                        background: 'rgba(229,62,62,0.15)',
                        border: '1px solid rgba(229,62,62,0.4)',
                        color: 'var(--red)',
                        padding: '2px 8px',
                      }}
                    >
                      Nivel élite
                    </div>
                  )}
                  <div className="text-label mb-2" style={{ fontSize: 10 }}>{agent.role}</div>
                  <h2
                    className="font-display font-black uppercase mb-1"
                    style={{ fontSize: agent.classification === 'elite' ? 44 : 36, color: 'var(--white)', lineHeight: 1 }}
                  >
                    {agent.name}
                  </h2>
                  <p className="mb-5" style={{ fontSize: 11, color: 'var(--gray-1)', fontStyle: 'italic' }}>
                    "{agent.tagline}"
                  </p>
                  <p className="mb-5" style={{ fontSize: 12, color: 'var(--gray-2)', lineHeight: 1.8, maxWidth: 480 }}>
                    {agent.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="font-display font-semibold uppercase"
                        style={{
                          fontSize: 10,
                          letterSpacing: '0.1em',
                          padding: '3px 8px',
                          border: agent.classification === 'elite' ? '1px solid rgba(229,62,62,0.2)' : '1px solid var(--border)',
                          color: agent.classification === 'elite' ? 'rgba(229,62,62,0.6)' : 'var(--gray-3)',
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status column */}
              <div className="p-6 flex flex-col justify-between items-end">
                <div className="text-right">
                  <div className="font-display font-bold uppercase mb-1" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--gray-3)' }}>
                    Estado
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <span
                      className="rounded-full animate-pulse-dot"
                      style={{ width: 6, height: 6, background: 'var(--red)', display: 'inline-block' }}
                    />
                    <span className="font-display font-bold uppercase" style={{ fontSize: 11, color: 'var(--red)', letterSpacing: '0.1em' }}>
                      {agent.classification === 'elite' ? 'Élite' : 'Activo'}
                    </span>
                  </div>
                </div>
                <div
                  className="font-display font-black text-right"
                  style={{
                    fontSize: agent.classification === 'elite' ? 64 : 52,
                    lineHeight: 1,
                    color: agent.classification === 'elite' ? 'rgba(229,62,62,0.1)' : 'var(--border)',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
