import Link from 'next/link'
import {
  Zap, TrendingUp, DollarSign, Shield, Search, Edit3, Settings, BarChart3,
  Star, Target, Video, CheckCircle, ArrowRight, MessageCircle, Monitor, Smartphone,
} from 'lucide-react'
import type { Categoria } from '@/lib/servicios'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

const ICONS: Record<string, typeof Zap> = {
  zap: Zap, trending: TrendingUp, dollar: DollarSign, shield: Shield,
  search: Search, edit: Edit3, settings: Settings, chart: BarChart3,
  star: Star, target: Target, video: Video, check: CheckCircle,
}

function LandingIcon({ name, size = 20, color }: { name: string; size?: number; color: string }) {
  const Icon = ICONS[name] ?? Zap
  return <Icon size={size} color={color} strokeWidth={1.8} />
}

function HeroVisualPlaceholder({ acento }: { acento: string }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ aspectRatio: '4 / 3', background: `radial-gradient(ellipse at center, ${acento}14, #0a0a0a 70%)`, border: `1px solid ${acento}33` }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${acento}14 1px, transparent 1px), linear-gradient(90deg, ${acento}14 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative flex items-end gap-4">
        <Monitor size={110} color={acento} strokeWidth={1} style={{ opacity: 0.4 }} />
        <Smartphone size={48} color={acento} strokeWidth={1} style={{ opacity: 0.4, marginBottom: 4 }} />
      </div>
      <div className="absolute bottom-4 right-4 font-display font-bold uppercase" style={{ fontSize: 9, letterSpacing: '0.12em', color: acento, opacity: 0.6 }}>
        Vista previa próximamente
      </div>
    </div>
  )
}

function CardImagePlaceholder({ acento }: { acento: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 70% 50%, ${acento}12, #050505 75%)` }}
    >
      <Monitor size={56} color={acento} strokeWidth={1} style={{ opacity: 0.25 }} />
    </div>
  )
}

export function CategoriaLandingHero({ categoria }: { categoria: Categoria }) {
  const l = categoria.landing!
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: 'calc(var(--nav-h) + 48px)', paddingBottom: 56, background: '#080808', borderBottom: '1px solid var(--border-2)' }}
    >
      <div className="container">
        <div className="flex items-center gap-2 mb-6 font-display font-semibold uppercase" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
          <Link href="/servicios" className="transition-colors hover:text-white" style={{ color: 'var(--gray-2)' }}>
            Servicios
          </Link>
          <span style={{ color: 'var(--gray-3)' }}>/</span>
          <span style={{ color: categoria.acento }}>{categoria.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 items-start">
          <div>
            <h1 className="font-display font-black uppercase mb-4" style={{ fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 0.98, color: 'var(--white)' }}>
              {l.titleWhite}
              <span style={{ color: categoria.acento, display: 'block' }}>{l.titleAccent}</span>
            </h1>
            <p className="mb-9" style={{ fontSize: 15, color: 'var(--gray-1)', lineHeight: 1.75, maxWidth: 480 }}>
              {l.heroDescription}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-9">
              {l.features.map((f) => (
                <div key={f.title} className="flex items-start gap-2.5">
                  <div className="flex-shrink-0" style={{ marginTop: 2 }}>
                    <LandingIcon name={f.icon} size={18} color={categoria.acento} />
                  </div>
                  <div>
                    <div className="font-display font-bold uppercase mb-0.5" style={{ fontSize: 12.5, color: 'var(--white)' }}>{f.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--gray-2)', lineHeight: 1.45 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {l.miniCta && (
              <div className="flex items-center justify-between gap-4 p-4 flex-wrap" style={{ border: `1px solid ${categoria.acento}55`, background: `${categoria.acento}0d` }}>
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} color={categoria.acento} />
                  <div>
                    <div className="font-display font-bold uppercase" style={{ fontSize: 12, color: 'var(--white)' }}>{l.miniCta.question}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-2)' }}>{l.miniCta.note}</div>
                  </div>
                </div>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-bold uppercase flex-shrink-0 px-4 py-2 transition-opacity hover:opacity-85"
                  style={{ fontSize: 11, color: '#fff', background: categoria.acento }}
                >
                  {l.miniCta.buttonLabel}
                </a>
              </div>
            )}
          </div>

          <HeroVisualPlaceholder acento={categoria.acento} />
        </div>
      </div>
    </section>
  )
}

export function CategoriaLandingGrid({ categoria }: { categoria: Categoria }) {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {categoria.items.map((item) => (
            <Link
              key={item.slug}
              href={`/servicios/${item.slug}`}
              className="group relative overflow-hidden flex"
              style={{ border: '1px solid var(--border)', background: 'var(--black-2)', minHeight: 200 }}
            >
              <div className="p-6 flex-1 flex flex-col justify-center" style={{ maxWidth: '58%' }}>
                <div
                  className="flex items-center justify-center flex-shrink-0 mb-3"
                  style={{ width: 40, height: 40, background: `${categoria.acento}18`, border: `1px solid ${categoria.acento}55` }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={categoria.acento} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div className="font-display font-bold uppercase mb-2" style={{ fontSize: 15, color: 'var(--white)' }}>
                  {item.nombre}
                </div>
                <p className="mb-4" style={{ fontSize: 12, color: 'var(--gray-2)', lineHeight: 1.55 }}>
                  {item.descripcion}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 font-display font-bold uppercase transition-transform group-hover:translate-x-1"
                  style={{ fontSize: 10.5, letterSpacing: '0.06em', color: categoria.acento }}
                >
                  Consultar
                  <ArrowRight size={12} />
                </div>
              </div>

              <div className="relative flex-shrink-0" style={{ width: '42%' }}>
                {item.cardImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.cardImage} alt={item.nombre} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <CardImagePlaceholder acento={categoria.acento} />
                )}
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, var(--black-2) 0%, transparent 35%)` }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CategoriaLandingProcess({ categoria }: { categoria: Categoria }) {
  const l = categoria.landing!
  return (
    <section className="section-padding">
      <div className="container grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-stretch">
        <div>
          <p className="text-label mb-8">Nuestro proceso</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {l.process.map((step, i) => (
              <div key={step.title} className="relative">
                {i < l.process.length - 1 && (
                  <ArrowRight size={14} color="var(--gray-3)" className="hidden lg:block absolute" style={{ right: -22, top: 4 }} />
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-black" style={{ fontSize: 16, color: categoria.acento }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <LandingIcon name={step.icon} size={16} color={categoria.acento} />
                </div>
                <div className="font-display font-bold uppercase mb-1" style={{ fontSize: 13, color: 'var(--white)' }}>{step.title}</div>
                <p style={{ fontSize: 11.5, color: 'var(--gray-2)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="p-7 flex flex-col justify-center"
          style={{ border: `1px solid ${categoria.acento}`, background: `${categoria.acento}0d` }}
        >
          <p className="font-display font-bold uppercase mb-5" style={{ fontSize: 17, color: 'var(--white)', lineHeight: 1.3 }}>
            {l.ctaTitle}
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-display font-bold text-sm uppercase tracking-wide text-white px-6 py-3 transition-opacity hover:opacity-90"
            style={{ background: categoria.acento }}
          >
            Agendar llamada
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
