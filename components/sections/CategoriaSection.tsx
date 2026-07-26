import { TiltCard } from '@/components/ui/TiltCard'
import { BeamSync } from '@/components/ui/BeamSync'
import { ProcesoFlow } from '@/components/ui/ProcesoFlow'
import {
  Zap, TrendingUp, DollarSign, Shield, Search, Edit3, Settings, BarChart3,
  Star, Target, Video, CheckCircle, ArrowRight, MessageCircle, Monitor,
  Palette, Code2, Rocket, Users, CreditCard, Mail, Calendar,
} from 'lucide-react'
import type React from 'react'
import type { Categoria } from '@/lib/servicios'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

function WhatsAppGlyph({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.215a.75.75 0 00.921.921l5.357-1.476A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

const ICONS: Record<string, typeof Zap> = {
  zap: Zap, trending: TrendingUp, dollar: DollarSign, shield: Shield,
  search: Search, edit: Edit3, settings: Settings, chart: BarChart3,
  star: Star, target: Target, video: Video, check: CheckCircle,
  palette: Palette, code: Code2, rocket: Rocket,
  users: Users, card: CreditCard, mail: Mail, calendar: Calendar,
}

function Ico({ name, size = 20, color }: { name: string; size?: number; color: string }) {
  if (name === 'whatsapp') return <WhatsAppGlyph size={size} color={color} />
  const Icon = ICONS[name] ?? Zap
  return <Icon size={size} color={color} strokeWidth={1.8} />
}

/* Placeholder for the big hero visual (dashboard / device mockup) */
function HeroVisualPlaceholder({ acento }: { acento: string }) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden w-full"
      style={{
        aspectRatio: '16 / 10',
        background: `radial-gradient(ellipse at 50% 45%, ${acento}18, #070707 72%)`,
        border: `1px solid ${acento}33`,
        borderRadius: 18,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${acento}12 1px, transparent 1px), linear-gradient(90deg, ${acento}12 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '8%', left: '15%', right: '15%', height: 2, background: `linear-gradient(90deg, transparent, ${acento}, transparent)`, filter: 'blur(1px)' }}
      />
      <Monitor size={92} color={acento} strokeWidth={1} style={{ opacity: 0.45 }} />
      <div
        className="absolute bottom-4 right-5 font-display font-bold uppercase"
        style={{ fontSize: 9.5, letterSpacing: '0.12em', color: acento, opacity: 0.6 }}
      >
        Vista previa próximamente
      </div>
    </div>
  )
}

/* Placeholder used inside each service card */
function CardImagePlaceholder({ acento }: { acento: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `radial-gradient(ellipse at 78% 50%, ${acento}18, #060606 72%)` }}>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(${acento}12 1px, transparent 1px), linear-gradient(90deg, ${acento}12 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute" style={{ right: '14%', top: '50%', transform: 'translateY(-50%)' }}>
        <Monitor size={54} color={acento} strokeWidth={1} style={{ opacity: 0.3 }} />
      </div>
    </div>
  )
}

export function CategoriaSection({ cat, index }: { cat: Categoria; index: number }) {
  const l = cat.landing
  if (!l) return null
  const cols = Math.min(cat.items.length, 4)
  const cardMinHeight = cols === 3 ? 226 : 200

  return (
    <section
      id={cat.slug}
      style={{
        borderBottom: '1px solid var(--border-2)',
        background: '#080808',
        paddingTop: 76,
        scrollMarginTop: 'calc(var(--nav-h) + 16px)',
      }}
    >
      <BeamSync />

      {/* ─── HERO: la imagen es el fondo, el texto va encima ─── */}
      <div className="relative overflow-hidden" style={{ background: '#080808' }}>
        {l.heroVisual ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={l.heroVisual}
            alt={`${l.titleWhite} ${l.titleAccent}`}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: l.heroVisualPosition ?? 'right center', zIndex: 0 }}
          />
        ) : (
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <HeroVisualPlaceholder acento={cat.acento} />
          </div>
        )}

        {/* velos para que el texto se lea sobre la imagen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: 'linear-gradient(90deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.9) 32%, rgba(8,8,8,0.45) 62%, rgba(8,8,8,0.12) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, background: 'linear-gradient(0deg, #080808 0%, rgba(8,8,8,0.7) 12%, transparent 40%)' }}
        />
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ zIndex: 1, height: 90, background: 'linear-gradient(180deg, #080808, transparent)' }}
        />

        <div
          className="relative w-full mx-auto"
          style={{
            zIndex: 2,
            maxWidth: 1700,
            minHeight: 520,
            display: 'flex',
            alignItems: 'center',
            paddingTop: 'var(--section-py)',
            paddingBottom: 'var(--section-py)',
            paddingLeft: 'var(--section-px)',
            paddingRight: 'var(--section-px)',
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-black" style={{ fontSize: 14, color: cat.acento }}>
                {String(index + 1).padStart(2, '0')} /
              </span>
              <span className="font-display font-bold uppercase" style={{ fontSize: 11, letterSpacing: '0.14em', color: cat.acento }}>
                {cat.nombre}
              </span>
            </div>

            <h2 className="font-display font-black uppercase mb-5" style={{ fontSize: 'clamp(34px, 4.2vw, 58px)', lineHeight: 0.95, color: 'var(--white)' }}>
              {l.titleWhite}
              <span style={{ color: cat.acento, display: 'block' }}>{l.titleAccent}</span>
            </h2>

            <p className="mb-8" style={{ fontSize: 14.5, color: 'var(--gray-1)', lineHeight: 1.7, maxWidth: 430 }}>
              {l.heroDescription}
            </p>

            <div className="flex flex-wrap gap-x-7 gap-y-5">
              {l.features.map((f) => (
                <div key={f.title} className="flex items-start gap-2.5" style={{ maxWidth: 190 }}>
                  <div className="flex-shrink-0" style={{ marginTop: 1 }}>
                    <Ico name={f.icon} size={17} color={cat.acento} />
                  </div>
                  <div>
                    <div className="font-display font-bold uppercase mb-0.5" style={{ fontSize: 11.5, color: 'var(--white)', letterSpacing: '0.02em' }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: 10.5, color: 'var(--gray-2)', lineHeight: 1.45 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {l.miniCta && (
              <div
                className="flex items-center justify-between gap-4 p-4 flex-wrap mt-8"
                style={{ border: `1px solid ${cat.acento}55`, background: 'rgba(10,10,10,0.6)', borderRadius: 12 }}
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} color={cat.acento} />
                  <div>
                    <div className="font-display font-bold uppercase" style={{ fontSize: 11.5, color: 'var(--white)' }}>{l.miniCta.question}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--gray-2)' }}>{l.miniCta.note}</div>
                  </div>
                </div>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-bold uppercase flex-shrink-0 px-4 py-2 transition-opacity hover:opacity-85"
                  style={{ fontSize: 10.5, color: '#fff', background: cat.acento, borderRadius: 8 }}
                >
                  {l.miniCta.buttonLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── CONTENIDO ─── */}
      <div className="relative overflow-hidden">
        {/* aurora: resplandores lentos con el color de la categoria */}
        <span
          aria-hidden
          className="absolute pointer-events-none animate-aurora-1"
          style={{ left: '-8%', top: '4%', width: 780, height: 780, borderRadius: '50%',
                   background: `radial-gradient(circle, ${cat.acento}3d, transparent 70%)` }}
        />
        <span
          aria-hidden
          className="absolute pointer-events-none animate-aurora-2"
          style={{ right: '-6%', top: '22%', width: 900, height: 900, borderRadius: '50%',
                   background: `radial-gradient(circle, ${cat.acento}33, transparent 68%)` }}
        />
        <span
          aria-hidden
          className="absolute pointer-events-none animate-aurora-3"
          style={{ left: '32%', bottom: '-14%', width: 820, height: 820, borderRadius: '50%',
                   background: `radial-gradient(circle, ${cat.acento}2b, transparent 72%)` }}
        />

      <div
        className="relative w-full mx-auto"
        style={{
          maxWidth: 1700,
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          paddingLeft: 'var(--section-px)',
          paddingRight: 'var(--section-px)',
        }}
      >
        {/* ─── CARDS: 4 per row ─── */}
        <div className="svc-grid" data-cols={Math.min(cat.items.length, 4)} style={{ marginBottom: 96 }}>
          {cat.items.map((item) => (
            <TiltCard
              key={item.slug}
              href={`/servicios/${item.slug}`}
              accent={cat.acento}
              className="group relative flex overflow-hidden"
              style={{
                borderRadius: 18,
                padding: 1,
                background: 'rgba(255,255,255,0.11)',
                minHeight: cardMinHeight,
              }}
            >
              {/* Light beam travelling around the border — all cards share one synced loop */}
              <span
                aria-hidden
                className="absolute pointer-events-none animate-beam"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '200%',
                  aspectRatio: '1',
                  background: `conic-gradient(from 0deg, transparent 0deg, transparent 268deg, ${cat.acento}55 300deg, ${cat.acento} 336deg, #ffffff 346deg, ${cat.acento} 352deg, transparent 360deg)`,
                }}
              />

              {/* Inner card — masks the beam down to a 1px ring */}
              <div
                className="relative flex-1 flex flex-col justify-between overflow-hidden"
                style={{ borderRadius: 17, background: '#0a0a0a' }}
              >
                <div className="absolute inset-0">
                  {item.cardImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.cardImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <CardImagePlaceholder acento={cat.acento} />
                  )}
                  {/* Readability gradient — no blur, so the image stays sharp */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.8) 46%, rgba(8,8,8,0.4) 76%, rgba(8,8,8,0.12) 100%)',
                    }}
                  />
                  {/* Glass sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(158deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 26%, transparent 55%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 12% 0%, ${cat.acento}24, transparent 60%)` }}
                  />
                  <div
                    className="absolute pointer-events-none"
                    style={{ top: 0, left: '6%', right: '6%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
                  />
                </div>

                <div className="relative px-5 pt-5">
                  <div
                    className="flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: 42,
                      height: 42,
                      background: `${cat.acento}26`,
                      border: `1px solid ${cat.acento}66`,
                      borderRadius: 11,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cat.acento} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div className="font-display font-black uppercase mb-1.5" style={{ fontSize: 16.5, color: 'var(--white)', lineHeight: 1.1 }}>
                    {item.nombre}
                  </div>
                  <p
                    style={{
                      fontSize: 11.5,
                      color: 'var(--gray-1)',
                      lineHeight: 1.5,
                      maxWidth: '86%',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    } as React.CSSProperties}
                  >
                    {item.descripcion}
                  </p>
                </div>

                <div
                  className="relative px-5 pb-4 pt-3 inline-flex items-center gap-1.5 font-display font-bold uppercase transition-transform group-hover:translate-x-1"
                  style={{ fontSize: 10, letterSpacing: '0.08em', color: cat.acento }}
                >
                  Consultar
                  <ArrowRight size={11} />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* ─── PROCESS + CTA ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-4">
          <div
            className="p-7"
            style={{
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(10,10,10,0.6)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <p className="font-display font-bold uppercase mb-6" style={{ fontSize: 11, letterSpacing: '0.16em', color: cat.acento }}>
              Nuestro proceso
            </p>
            <ProcesoFlow
              acento={cat.acento}
              steps={l.process.map((step) => ({
                icon: <Ico name={step.icon} size={16} color={cat.acento} />,
                title: step.title,
                desc: step.desc,
              }))}
            />
          </div>

          <div
            className="p-7 flex flex-col justify-center"
            style={{
              borderRadius: 18,
              border: `1px solid ${cat.acento}99`,
              background: `linear-gradient(135deg, ${cat.acento}1f, rgba(10,10,10,0.75) 70%)`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 44px -22px ${cat.acento}66`,
            }}
          >
            <p className="font-display font-black uppercase mb-3" style={{ fontSize: 19, color: 'var(--white)', lineHeight: 1.15 }}>
              {l.ctaTitle}
            </p>
            <p className="mb-5" style={{ fontSize: 11.5, color: 'var(--gray-1)', lineHeight: 1.5 }}>
              {l.ctaSubtitle}
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-display font-bold uppercase text-white px-6 py-3 transition-opacity hover:opacity-90"
              style={{ fontSize: 12, letterSpacing: '0.05em', background: cat.acento, borderRadius: 10 }}
            >
              Agendar llamada
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
