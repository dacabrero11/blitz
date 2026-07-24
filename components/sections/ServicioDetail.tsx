import Image from 'next/image'
import Link from 'next/link'
import {
  Palette, Search, Zap, Layout, FileText, MapPin, Smartphone, Shield,
  MessageCircle, Edit3, Code2, ClipboardList, Rocket, BarChart3,
  Clock, Target, Link2, Sparkles, Bot, ArrowLeft, ArrowRight,
} from 'lucide-react'
import type { Categoria, ServicioItem } from '@/lib/servicios'

const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

function WhatsAppIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.215a.75.75 0 00.921.921l5.357-1.476A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

const ICONS: Record<string, typeof Palette> = {
  palette: Palette, search: Search, zap: Zap, layout: Layout, file: FileText,
  pin: MapPin, phone: Smartphone, shield: Shield, chat: MessageCircle, edit: Edit3,
  code: Code2, clipboard: ClipboardList, rocket: Rocket, chart: BarChart3,
  clock: Clock, target: Target, link: Link2, sparkles: Sparkles, bot: Bot,
}

function DetailIcon({ name, size = 20, color }: { name: string; size?: number; color: string }) {
  if (name === 'whatsapp') return <WhatsAppIcon size={size} color={color} />
  const Icon = ICONS[name] ?? Sparkles
  return <Icon size={size} color={color} strokeWidth={1.8} />
}

export function ServicioDetail({
  categoria,
  item,
  index,
}: {
  categoria: Categoria
  item: ServicioItem
  index: number
}) {
  const d = item.detail
  const secondary = d?.secondary

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '92vh', paddingTop: 'calc(var(--nav-h) + 40px)', paddingBottom: 64, background: '#080808' }}
      >
        {item.mockupImage && (
          <Image
            src={item.mockupImage}
            alt={item.nombre}
            fill
            className="pointer-events-none"
            style={{ objectFit: 'cover', objectPosition: item.mockupPosition ?? 'center', zIndex: 0 }}
            priority
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.88) 42%, rgba(8,8,8,0.35) 68%, rgba(8,8,8,0.1) 100%)', zIndex: 1 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.75) 0%, transparent 30%)', zIndex: 1 }}
        />

        <div className="container relative" style={{ zIndex: 2 }}>
          <div className="flex items-center gap-2 mb-8 font-display font-semibold uppercase" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
            <Link href="/servicios" className="transition-colors hover:text-white" style={{ color: 'var(--gray-2)' }}>
              Servicios
            </Link>
            <span style={{ color: 'var(--gray-3)' }}>/</span>
            <span style={{ color: categoria.acento }}>{categoria.nombre}</span>
          </div>

          <div style={{ maxWidth: 580 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-black" style={{ fontSize: 15, color: categoria.acento }}>
                {String(index + 1).padStart(2, '0')} /
              </span>
              <span className="text-label" style={{ fontSize: 11 }}>{categoria.nombre}</span>
            </div>

            <h1 className="font-display font-black uppercase mb-4" style={{ fontSize: 'clamp(38px, 5vw, 64px)', lineHeight: 0.95, color: 'var(--white)' }}>
              {d ? d.titleWhite : item.nombre}
              {d && <span style={{ color: 'var(--red)', display: 'block' }}>{d.titleRed}</span>}
            </h1>

            <p className="mb-9" style={{ fontSize: 15, color: 'var(--gray-1)', lineHeight: 1.75, maxWidth: 480 }}>
              {item.descripcion}
            </p>

            {d && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                {d.features.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="flex-shrink-0" style={{ marginTop: 2 }}>
                      <DetailIcon name={f.icon} size={20} color={categoria.acento} />
                    </div>
                    <div>
                      <div className="font-display font-bold uppercase mb-0.5" style={{ fontSize: 13, color: 'var(--white)' }}>
                        {f.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--gray-2)', lineHeight: 1.5 }}>
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 font-display font-semibold uppercase transition-colors hover:text-white"
              style={{ fontSize: 12, letterSpacing: '0.05em', color: 'var(--gray-2)' }}
            >
              <ArrowLeft size={14} />
              Volver a {categoria.nombre}
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary section — varies per servicio */}
      {secondary && secondary.type === 'includes-process' && (
        <section className="section-padding" style={{ borderTop: '1px solid var(--border-2)' }}>
          <div className="container">
            <p className="text-label mb-7">Incluye:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 mb-16">
              {secondary.includes.map((inc) => (
                <div key={inc.label} className="flex items-start gap-2.5">
                  <DetailIcon name={inc.icon} size={17} color={categoria.acento} />
                  <span style={{ fontSize: 12.5, color: 'var(--gray-1)', lineHeight: 1.4 }}>{inc.label}</span>
                </div>
              ))}
            </div>

            <p className="text-label mb-8">Nuestro proceso</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
              {secondary.process.map((step, i) => (
                <div key={step.title} className="relative">
                  {i < secondary.process.length - 1 && (
                    <ArrowRight size={14} color="var(--gray-3)" className="hidden lg:block absolute" style={{ right: -22, top: 4 }} />
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-black" style={{ fontSize: 16, color: categoria.acento }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <DetailIcon name={step.icon} size={16} color={categoria.acento} />
                  </div>
                  <div className="font-display font-bold uppercase mb-1" style={{ fontSize: 13, color: 'var(--white)' }}>
                    {step.title}
                  </div>
                  <p style={{ fontSize: 11.5, color: 'var(--gray-2)', lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {secondary && secondary.type === 'howworks-cta' && (
        <section className="section-padding" style={{ borderTop: '1px solid var(--border-2)' }}>
          <div className="container grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">
            <div>
              <p className="text-label mb-8">¿Cómo funciona?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {secondary.howworks.map((step, i) => (
                  <div key={step.title} className="relative">
                    {i < secondary.howworks.length - 1 && (
                      <ArrowRight size={14} color="var(--gray-3)" className="hidden lg:block absolute" style={{ right: -22, top: 4 }} />
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-display font-black" style={{ fontSize: 16, color: categoria.acento }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <DetailIcon name={step.icon} size={16} color={categoria.acento} />
                    </div>
                    <div className="font-display font-bold uppercase mb-1" style={{ fontSize: 13, color: 'var(--white)' }}>
                      {step.title}
                    </div>
                    <p style={{ fontSize: 11.5, color: 'var(--gray-2)', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-7" style={{ border: `1px solid ${categoria.acento}55`, background: 'var(--black-2)' }}>
              <p className="font-display font-bold uppercase mb-5" style={{ fontSize: 15, color: 'var(--white)', lineHeight: 1.4 }}>
                {secondary.ctaTitle}
              </p>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wide text-white px-6 py-3 transition-opacity hover:opacity-90 w-full justify-center"
                style={{ background: '#25D366' }}
              >
                <WhatsAppIcon size={16} color="white" />
                Agendar llamada
              </a>
            </div>
          </div>
        </section>
      )}

      {!d && (
        <section className="section-padding text-center" style={{ borderTop: '1px solid var(--border-2)' }}>
          <div className="container" style={{ maxWidth: 480 }}>
            <p className="mb-6" style={{ fontSize: 14, color: 'var(--gray-1)' }}>
              Estamos preparando el detalle completo de este servicio. Escribinos y te contamos todo en minutos.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wide text-white px-8 py-3 transition-opacity hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <WhatsAppIcon size={16} color="white" />
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      )}
    </>
  )
}
