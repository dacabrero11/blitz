import Link from 'next/link'
import { ArrowRight, Zap, Clock, MessageSquare, Settings2 } from 'lucide-react'
import { PfCorners } from '@/components/ui/PfCorners'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20contarles%20mi%20proyecto'

const VENTAJAS = [
  { icon: Clock, l1: 'Respuesta en', l2: 'menos de 30 min' },
  { icon: MessageSquare, l1: 'Asesoría', l2: 'sin compromiso' },
  { icon: Settings2, l1: 'Soluciones a', l2: 'la medida' },
]

export function PortfolioCta() {
  return (
    <section className="portfolio-bg relative" style={{ paddingBottom: 'clamp(44px,7vh,88px)' }}>
      <div className="container relative" style={{ zIndex: 1 }}>
        <div
          className="pf-panel relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8"
          style={{ border: '1px solid rgba(229,62,62,0.3)', background: 'rgba(10,10,11,0.78)', padding: 'clamp(20px,2.4vw,30px)' }}
        >
          <span className="pf-sweep" aria-hidden />
          <PfCorners />

          <span
            className="flex items-center justify-center flex-shrink-0 animate-pf-glow"
            style={{ width: 62, height: 62, border: '1px solid rgba(229,62,62,0.45)', background: 'rgba(229,62,62,0.1)' }}
            aria-hidden
          >
            <Zap size={26} color="var(--red)" strokeWidth={2} />
          </span>

          <div className="flex-shrink-0">
            <p className="font-display font-bold uppercase" style={{ fontSize: 'clamp(15px,1.5vw,19px)', letterSpacing: '0.02em', color: 'var(--white)' }}>
              ¿Tenés un proyecto en mente?
            </p>
            <p className="font-display font-black uppercase" style={{ fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.05, color: 'var(--red)' }}>
              Hablemos y lo hacemos realidad.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-4 lg:ml-auto">
            {VENTAJAS.map(({ icon: Icon, l1, l2 }) => (
              <div key={l2} className="flex items-center gap-2.5">
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 32, height: 32, border: '1px solid var(--border)', background: 'var(--black)' }}
                  aria-hidden
                >
                  <Icon size={14} color="var(--red)" strokeWidth={2} />
                </span>
                <span className="font-display font-bold uppercase" style={{ fontSize: 9.5, letterSpacing: '0.13em', lineHeight: 1.5 }}>
                  <span style={{ display: 'block', color: 'var(--gray-1)' }}>{l1}</span>
                  <span style={{ display: 'block', color: 'var(--white)' }}>{l2}</span>
                </span>
              </div>
            ))}
          </div>

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-clip pf-cta inline-flex items-center justify-center gap-2.5 font-display font-bold uppercase flex-shrink-0"
            style={{ background: 'var(--red)', color: '#fff', padding: '15px 26px', fontSize: 12, letterSpacing: '0.13em' }}
          >
            Contarme mi proyecto <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
