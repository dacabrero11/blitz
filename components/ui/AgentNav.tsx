'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AGENTS } from '@/lib/agents'

export function AgentNav() {
  const pathname = usePathname()

  return (
    <div
      className="fixed left-0 right-0 z-40 flex items-center justify-center gap-4 px-4"
      style={{
        top: 'var(--nav-h)',
        height: 72,
        background: 'rgba(8,8,8,0.92)',
        borderBottom: '1px solid var(--border-2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {AGENTS.map((agent) => {
        const isActive = pathname === `/agentes/${agent.id}`
        return (
          <Link
            key={agent.id}
            href={`/agentes/${agent.id}`}
            className="group flex flex-col items-center gap-1 transition-all duration-300"
            title={agent.name}
          >
            {/* Coin */}
            <div
              className="relative transition-all duration-300"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                boxShadow: isActive
                  ? '0 0 0 2px #E53E3E, 0 0 16px rgba(229,62,62,0.5)'
                  : '0 0 0 1px rgba(255,255,255,0.08)',
                filter: isActive ? 'none' : 'grayscale(1) brightness(0.35)',
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                animation: isActive ? 'glow-pulse 2s ease-in-out infinite' : 'none',
              }}
            >
              <Image
                src={agent.logo}
                alt={agent.name}
                fill
                className="object-cover rounded-full"
                sizes="48px"
              />
            </div>
            {/* Name */}
            <span
              className="font-display font-bold uppercase hidden md:block"
              style={{
                fontSize: 8,
                letterSpacing: '0.14em',
                color: isActive ? 'var(--red)' : 'var(--gray-3)',
                transition: 'color 0.2s',
              }}
            >
              {agent.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
