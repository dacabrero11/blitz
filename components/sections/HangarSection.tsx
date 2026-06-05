'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AGENTS } from '@/lib/agents'

export function HangarSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ marginTop: 'var(--nav-h)', minHeight: '75vh' }}
    >
      {/* Hangar photo — brighter, full visible */}
      <Image
        src="/hangar.png"
        alt="Cuartel de operaciones Blitz"
        fill
        className="object-cover object-top"
        priority
        style={{ filter: 'brightness(0.75) contrast(1.1)' }}
      />

      {/* Gradient overlay — lighter at top to show agents */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.1) 0%, rgba(8,8,8,0.3) 40%, rgba(8,8,8,0.85) 80%, #080808 100%)',
        }}
      />

      {/* Red atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 80%, rgba(229,62,62,0.08), transparent 70%)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-end h-full"
        style={{ minHeight: '75vh', padding: 'var(--section-px)', paddingBottom: 56 }}
      >
        <p className="text-label mb-3">Cuartel de operaciones</p>
        <h1 className="text-d1 mb-6" style={{ maxWidth: 700 }}>
          El equipo que<br />
          <span style={{ color: 'var(--red)' }}>nunca duerme.</span>
        </h1>

        <div className="flex flex-wrap gap-2">
          {AGENTS.map((agent) => (
            <Link
              key={agent.id}
              href={`/agentes/${agent.id}`}
              className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-widest transition-all hover:text-white"
              style={{
                fontSize: 11,
                padding: '7px 14px',
                border: agent.classification === 'elite' ? '1px solid var(--red)' : '1px solid rgba(255,255,255,0.2)',
                color: agent.classification === 'elite' ? 'var(--red)' : 'rgba(255,255,255,0.7)',
                background: 'rgba(8,8,8,0.6)',
                backdropFilter: 'blur(8px)',
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
