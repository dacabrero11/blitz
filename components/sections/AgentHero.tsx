import Image from 'next/image'
import Link from 'next/link'
import type { Agent } from '@/lib/agents'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function AgentHero({ agent }: { agent: Agent }) {
  return (
    <section
      className="relative overflow-hidden grid-bg"
      style={{
        paddingTop: 'calc(var(--nav-h) + 48px)',
        paddingBottom: 64,
        paddingLeft: 'var(--section-px)',
        paddingRight: 'var(--section-px)',
        minHeight: '80vh',
        borderBottom: '1px solid var(--border-2)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 70% at 80% 50%, ${agent.accentColor}18, transparent 70%)` }}
      />
      <div className="container relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">

        {/* Agent image — top on mobile, right on desktop */}
        <div
          className="relative flex-shrink-0 order-first md:order-last"
          style={{ width: '100%', maxWidth: 260, margin: '0 auto' }}
        >
          <Image
            src={agent.image}
            alt={agent.name}
            width={260}
            height={360}
            className="relative z-10 object-contain animate-float w-full h-auto"
            style={{ filter: `drop-shadow(0 0 48px ${agent.accentColor}60)` }}
            priority
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <Link
            href="/agentes"
            className="inline-flex items-center gap-2 mb-6 font-display font-semibold uppercase tracking-widest text-xs transition-colors hover:text-white"
            style={{ color: 'var(--gray-2)' }}
          >
            ← Todos los agentes
          </Link>
          <div
            className="inline-block font-display font-bold uppercase mb-3"
            style={{
              fontSize: 9, letterSpacing: '0.18em',
              background: 'rgba(229,62,62,0.1)',
              border: '1px solid rgba(229,62,62,0.25)',
              color: 'var(--red)', padding: '3px 10px',
            }}
          >
            {agent.unitCode}
          </div>
          <div className="text-label mb-1">{agent.role}</div>
          <h1 className="text-d1 mb-4" style={{ color: 'var(--white)' }}>{agent.name}</h1>
          <p
            className="mb-2 font-display font-semibold uppercase italic"
            style={{ fontSize: 15, color: 'var(--red)' }}
          >
            "{agent.tagline}"
          </p>
          <p className="mb-8" style={{ fontSize: 14, color: 'var(--gray-1)', lineHeight: 1.8, maxWidth: 480 }}>
            {agent.description}
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-clip inline-flex items-center gap-2 font-display font-bold text-sm tracking-wide uppercase text-white px-6 py-3 transition-opacity hover:opacity-90"
            style={{ background: 'var(--red)' }}
          >
            Activar {agent.name} →
          </a>
        </div>
      </div>
    </section>
  )
}

export function AgentCapabilities({ agent }: { agent: Agent }) {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        <p className="text-label mb-6">Capacidades</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {agent.capabilities.map((cap) => (
            <div
              key={cap}
              className="p-5 relative"
              style={{ background: 'var(--black-2)', border: '1px solid var(--border)' }}
            >
              <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: 'var(--red)' }} />
              <div className="font-display font-bold uppercase" style={{ fontSize: 15, color: 'var(--white)' }}>{cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
