import Image from 'next/image'
import { X, Globe, User, BarChart3 } from 'lucide-react'

const PROBLEMS = [
  { n: '01', icon: X, title: 'Tu negocio cierra. La competencia no.', desc: 'Mientras duermes, un cliente pregunta por WhatsApp y nadie responde. Lo atendió otra empresa.' },
  { n: '02', icon: Globe, title: 'Una página web estática no vende.', desc: 'Tener presencia digital no es suficiente. Necesitas una web que convierta visitantes en clientes reales.' },
  { n: '03', icon: User, title: 'Contratar personal es caro y lento.', desc: 'Un agente de IA hace el trabajo de 3 empleados a una fracción del costo, sin renunciar los lunes.' },
  { n: '04', icon: BarChart3, title: 'No sabes qué pasa con tus datos.', desc: 'Sin análisis en tiempo real, tomas decisiones a ciegas. Tus competidores ya saben lo que tú ignoras.' },
]

export function ProblemSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ borderBottom: '1px solid var(--border-2)', background: '#050505' }}>
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        className="pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: 'center 20%', zIndex: 0, opacity: 0.55 }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(229,62,62,0.16), transparent 70%)', zIndex: 1 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.94) 35%, rgba(5,5,5,0.75) 70%, rgba(5,5,5,0.55) 100%)', zIndex: 1 }} />

      <div className="container relative" style={{ zIndex: 3 }}>
        {/* Header: "///" mark + label + line */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-end gap-[3px] flex-shrink-0">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 4, height: 15 - i * 3, background: 'var(--red)', transform: 'skewX(-18deg)' }} />
            ))}
          </div>
          <span className="text-label whitespace-nowrap" style={{ letterSpacing: '0.15em' }}>El problema</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(229,62,62,0.5), rgba(229,62,62,0.08))' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROBLEMS.map(({ n, icon: Icon, title, desc }) => (
            <div
              key={n}
              className="relative p-7 sm:p-8"
              style={{
                background: 'rgba(6,6,6,0.82)',
                border: '1px solid rgba(229,62,62,0.28)',
                backdropFilter: 'blur(4px)',
                clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)',
              }}
            >
              {/* Glowing top accent */}
              <div
                className="absolute pointer-events-none"
                style={{ top: -1, left: '50%', transform: 'translateX(-50%)', width: '55%', height: 2, background: 'linear-gradient(90deg, transparent, var(--red), transparent)' }}
              />
              <div
                className="absolute pointer-events-none"
                style={{ top: -10, left: '50%', transform: 'translateX(-50%)', width: 140, height: 24, background: 'radial-gradient(ellipse at center, rgba(229,62,62,0.55), transparent 72%)', filter: 'blur(4px)' }}
              />

              {/* Icon badge */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  top: 20,
                  right: 20,
                  width: 52,
                  height: 52,
                  background: 'var(--black)',
                  border: '1px solid var(--red)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                }}
              >
                <Icon size={22} color="var(--red)" strokeWidth={2} />
              </div>

              <div className="font-display font-black leading-none mb-3" style={{ fontSize: 64, color: 'var(--red)' }}>{n}</div>
              <h3 className="font-display font-bold uppercase mb-3" style={{ fontSize: 21, color: 'var(--white)', lineHeight: 1.15, maxWidth: '85%' }}>
                {title.replace(/\.$/, '')}<span style={{ color: 'var(--red)' }}>.</span>
              </h3>
              <p style={{ fontSize: 13, color: 'var(--gray-2)', lineHeight: 1.7, maxWidth: '90%' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
