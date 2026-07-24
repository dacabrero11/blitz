import Image from 'next/image'
import Link from 'next/link'
import {
  MessageCircle, Target, Handshake, CalendarClock, Magnet, CheckCircle,
} from 'lucide-react'
import type { Agent, AgentSkill, AgentProcessStep } from '@/lib/agents'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

const SKILL_ICONS: Record<AgentSkill['icon'], typeof MessageCircle> = {
  chat: MessageCircle,
  target: Target,
  handshake: Handshake,
  calendar: CalendarClock,
}

const PROCESS_ICONS: Record<AgentProcessStep['icon'], typeof MessageCircle> = {
  magnet: Magnet,
  chat: MessageCircle,
  target: Target,
  handshake: Handshake,
  check: CheckCircle,
}

const HIGHLIGHT_ICONS: Record<string, typeof MessageCircle> = {
  chat: MessageCircle,
  target: Target,
  handshake: Handshake,
}

/* ─────────────────────────  HERO  ───────────────────────── */

export function AgentHeroV2({ agent }: { agent: Agent }) {
  const hasBg = !!agent.heroBg

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 'calc(var(--nav-h) + 40px)',
        paddingBottom: hasBg ? 64 : 56,
        paddingLeft: 'var(--section-px)',
        paddingRight: 'var(--section-px)',
        borderBottom: '1px solid var(--border-2)',
        background: '#080808',
        minHeight: hasBg ? '92vh' : undefined,
        display: hasBg ? 'flex' : undefined,
        alignItems: hasBg ? 'center' : undefined,
      }}
    >
      {hasBg && (
        <>
          <Image
            src={agent.heroBg!}
            alt={agent.name}
            fill
            className="pointer-events-none"
            style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.82) 30%, rgba(8,8,8,0.25) 60%, rgba(8,8,8,0.15) 100%)',
              zIndex: 1,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.7) 0%, transparent 30%)', zIndex: 1 }}
          />
        </>
      )}

      <div className={hasBg ? 'container relative z-10' : 'container relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center'}>
        {/* Text column */}
        <div className={hasBg ? '' : 'order-2 md:order-1'} style={hasBg ? { maxWidth: 520 } : undefined}>
          <Link
            href="/agentes"
            className="inline-flex items-center gap-2 mb-6 font-display font-semibold uppercase tracking-widest text-xs transition-colors hover:text-white"
            style={{ color: 'var(--gray-2)' }}
          >
            ← Volver a agentes
          </Link>
          <div className="text-label mb-2">{agent.role}</div>
          <h1 className="text-d1 mb-3" style={{ color: 'var(--white)' }}>{agent.name}</h1>
          <p className="font-display font-bold uppercase mb-5" style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--red)' }}>
            {agent.taglineShort ?? agent.tagline}
          </p>
          <p className="mb-8" style={{ fontSize: 14, color: 'var(--gray-1)', lineHeight: 1.8, maxWidth: 460 }}>
            {agent.description}
          </p>

          {agent.highlights && (
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-9">
              {agent.highlights.map(({ icon, label }) => {
                const Icon = HIGHLIGHT_ICONS[icon]
                return (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon size={18} color="var(--red)" strokeWidth={2} />
                    <span className="font-display font-bold uppercase" style={{ fontSize: 13, color: 'var(--white)' }}>{label}</span>
                  </div>
                )
              })}
            </div>
          )}

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

        {/* Fallback image column — radar glow + katakana + stat panel (agents without a custom hero photo yet) */}
        {!hasBg && (
        <div className="order-1 md:order-2 relative flex items-center justify-center" style={{ minHeight: 420 }}>
          {/* Radar rings */}
          <div className="absolute pointer-events-none" style={{ inset: 0 }}>
            <div className="absolute rounded-full" style={{ left: '50%', top: '50%', width: 460, height: 460, transform: 'translate(-50%,-50%)', border: '1px solid rgba(229,62,62,0.18)', borderRadius: '50%' }} />
            <div className="absolute rounded-full" style={{ left: '50%', top: '50%', width: 340, height: 340, transform: 'translate(-50%,-50%)', border: '1px solid rgba(229,62,62,0.25)', borderRadius: '50%' }} />
            <div
              className="absolute"
              style={{
                left: '50%', top: '50%', width: 500, height: 500, transform: 'translate(-50%,-50%)',
                background: 'radial-gradient(ellipse at center, rgba(229,62,62,0.22), transparent 65%)',
              }}
            />
          </div>

          {/* Katakana vertical text */}
          {agent.katakana && (
            <div
              className="absolute hidden md:block pointer-events-none font-display"
              style={{
                right: 0, top: '50%', transform: 'translateY(-50%)',
                writingMode: 'vertical-rl',
                fontSize: 22,
                letterSpacing: '0.3em',
                color: 'rgba(229,62,62,0.35)',
              }}
            >
              {agent.katakana}
            </div>
          )}

          <div className="relative" style={{ width: '100%', maxWidth: 300 }}>
            <Image
              src={agent.image}
              alt={agent.name}
              width={300}
              height={420}
              className="relative z-10 object-contain animate-float w-full h-auto"
              style={{ filter: `drop-shadow(0 0 48px ${agent.accentColor}60)` }}
              priority
            />
          </div>

          {/* Stat panel */}
          <div
            className="absolute z-20 font-display"
            style={{
              right: '8%', bottom: '6%',
              background: 'rgba(6,6,6,0.85)',
              border: '1px solid rgba(229,62,62,0.35)',
              backdropFilter: 'blur(4px)',
              padding: '10px 16px',
              minWidth: 140,
            }}
          >
            <div className="flex items-center justify-between gap-4 mb-1">
              <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--gray-2)' }}>AGENTE</span>
              <span className="font-bold" style={{ fontSize: 11, color: 'var(--white)' }}>{agent.unitCode}</span>
            </div>
            <div className="flex items-center justify-between gap-4 mb-1">
              <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--gray-2)' }}>CLASE</span>
              <span className="font-bold" style={{ fontSize: 11, color: 'var(--white)' }}>{agent.classLabel}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--gray-2)' }}>ESTADO</span>
              <span className="flex items-center gap-1.5">
                <span className="animate-pulse-dot rounded-full" style={{ width: 5, height: 5, background: 'var(--red)', display: 'inline-block' }} />
                <span className="font-bold" style={{ fontSize: 11, color: 'var(--red)' }}>ACTIVE</span>
              </span>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}

/* ─────────────────────────  DETAIL SECTIONS  ───────────────────────── */

export function AgentDetailSections({ agent }: { agent: Agent }) {
  if (!agent.skills || !agent.techStack || !agent.demo || !agent.process) return null

  return (
    <>
      <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Habilidades principales */}
          <div>
            <p className="text-label mb-5">Habilidades principales</p>
            <div className="flex flex-col gap-3">
              {agent.skills.map((s) => {
                const Icon = SKILL_ICONS[s.icon]
                return (
                  <div key={s.title} className="p-4 flex gap-3" style={{ background: 'var(--black-2)', border: '1px solid var(--border)' }}>
                    <Icon size={20} color="var(--red)" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-display font-bold uppercase mb-1" style={{ fontSize: 13, color: 'var(--white)' }}>{s.title}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--gray-1)', lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tecnologías que utiliza */}
          <div>
            <p className="text-label mb-5">Tecnologías que utiliza</p>
            <div className="grid grid-cols-2 gap-3">
              {agent.techStack.map((t) => (
                <div
                  key={t.name}
                  className="p-4 flex items-center justify-center text-center"
                  style={{ background: 'var(--black-2)', border: '1px solid var(--border)', minHeight: 64 }}
                >
                  <span className="font-display font-bold uppercase" style={{ fontSize: 13, color: 'var(--white)' }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vista en acción */}
          <div>
            <p className="text-label mb-5">Vista en acción</p>
            <div style={{ background: 'var(--black-2)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="font-display font-bold uppercase" style={{ fontSize: 11, color: 'var(--white)' }}>Conversaciones</span>
                <span
                  className="font-bold flex items-center justify-center"
                  style={{ fontSize: 10, color: 'var(--white)', background: 'var(--red)', width: 20, height: 20, borderRadius: '50%' }}
                >
                  {agent.demo.otherContacts.length + 1}
                </span>
              </div>

              {/* Active thread */}
              <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold" style={{ fontSize: 12, color: 'var(--white)' }}>{agent.demo.contactName}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {agent.demo.messages.map((m, i) => (
                    <div key={i} className={m.from === 'agent' ? 'self-end text-right' : 'self-start'} style={{ maxWidth: '85%' }}>
                      <div
                        className="px-3 py-2"
                        style={{
                          fontSize: 11.5,
                          lineHeight: 1.5,
                          color: m.from === 'agent' ? 'var(--white)' : 'var(--gray-1)',
                          background: m.from === 'agent' ? 'rgba(229,62,62,0.18)' : 'var(--black)',
                          border: m.from === 'agent' ? '1px solid rgba(229,62,62,0.4)' : '1px solid var(--border)',
                        }}
                      >
                        {m.text}
                      </div>
                      <div style={{ fontSize: 9, color: 'var(--gray-2)', marginTop: 2 }}>{m.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other contacts, collapsed */}
              <div className="px-4 py-2">
                {agent.demo.otherContacts.map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--gray-1)' }}>{c.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-2)' }}>{c.note}</div>
                    </div>
                    <span style={{ fontSize: 9, color: 'var(--gray-2)' }}>{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo trabaja */}
      <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
        <div className="container">
          <p className="text-label mb-10">Cómo trabaja {agent.name}</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-4 relative">
            <div className="hidden sm:block absolute" style={{ top: 22, left: '10%', right: '10%', height: 1, background: 'repeating-linear-gradient(90deg, rgba(229,62,62,0.4) 0 6px, transparent 6px 12px)' }} />
            {agent.process.map((step) => {
              const Icon = PROCESS_ICONS[step.icon]
              return (
                <div key={step.title} className="relative text-center sm:text-left">
                  <div
                    className="relative z-10 flex items-center justify-center mb-4 mx-auto sm:mx-0"
                    style={{ width: 44, height: 44, background: 'var(--black)', border: '1px solid var(--red)', borderRadius: '50%' }}
                  >
                    <Icon size={18} color="var(--red)" strokeWidth={2} />
                  </div>
                  <div className="font-display font-bold uppercase mb-1.5" style={{ fontSize: 13, color: 'var(--white)' }}>{step.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-1)', lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
