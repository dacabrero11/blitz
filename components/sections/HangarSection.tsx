'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AGENTS } from '@/lib/agents'

export function HangarSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ marginTop: 'var(--nav-h)', minHeight: '100vh' }}
    >
      <Image
        src="/hangar.png"
        alt="Cuartel de operaciones Blitz"
        fill
        className="object-cover"
        priority
        style={{
          filter: 'brightness(0.82) contrast(1.05) saturate(1.1)',
          objectPosition: '25% center',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.0) 0%, rgba(8,8,8,0.1) 35%, rgba(8,8,8,0.72) 78%, #080808 100%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 25% at 50% 98%, rgba(229,62,62,0.07), transparent 70%)' }}
      />

      <div
        className="relative z-10 flex flex-col justify-end"
        style={{ minHeight: '100vh', padding: 'var(--section-px)', paddingBottom: 56 }}
      >
        <p className="text-label mb-2">Cuartel de operaciones</p>
        <h1 className="text-d1 mb-6" style={{ maxWidth: 800 }}>
          El equipo que<br />
          <span style={{ color: 'var(--red)' }}>nunca duerme.</span>
        </h1>
        <div className="flex flex-wrap gap-2">
          {AGENTS.map((agent) => (
            <Link
              key={agent.id}
              href={`/agentes/${agent.id}`}
              className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-widest transition-all hover:text-white hover:border-white"
              style={{
                fontSize: 11,
                padding: '7px 14px',
                border: agent.classification === 'elite' ? '1px solid var(--red)' : '1px solid rgba(255,255,255,0.3)',
                color: agent.classification === 'elite' ? 'var(--red)' : 'rgba(255,255,255,0.8)',
                background: 'rgba(8,8,8,0.5)',
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
