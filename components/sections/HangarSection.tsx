'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AGENTS } from '@/lib/agents'

export function HangarSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        marginTop: 'var(--nav-h)',
        minHeight: '70vh',
      }}
    >
      {/* Hangar photo */}
      <Image
        src="/hangar.png"
        alt="Cuartel de operaciones Blitz"
        fill
        className="object-cover object-center"
        priority
        style={{ filter: 'brightness(0.55)' }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.7) 70%, var(--black) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full" style={{ minHeight: '70vh', padding: 'var(--section-px)', paddingBottom: 48 }}>
        <p className="text-label mb-3">Cuartel de operaciones</p>
        <h1 className="text-d1 mb-6" style={{ maxWidth: 700 }}>
          El equipo que<br />
          <span style={{ color: 'var(--red)' }}>nunca duerme.</span>
        </h1>

        {/* Agent name badges */}
        <div className="flex flex-wrap gap-2">
          {AGENTS.map((agent) => (
            <Link
              key={agent.id}
              href={`/agentes/${agent.id}`}
              className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-widest transition-all hover:border-red-500"
              style={{
                fontSize: 11,
                padding: '6px 12px',
                border: agent.classification === 'elite' ? '1px solid var(--red)' : '1px solid var(--gray-3)',
                color: agent.classification === 'elite' ? 'var(--red)' : 'var(--gray-1)',
                background: 'rgba(8,8,8,0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }} />
              {agent.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
