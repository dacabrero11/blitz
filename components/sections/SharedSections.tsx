'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ─── PROCESS ──────────────────────────────────────────── */
const STEPS = [
  { n: '01', title: 'Brief', desc: 'Hablamos por WhatsApp. Entendemos tu negocio, tus clientes y tus metas en 30 minutos.' },
  { n: '02', title: 'Diseño', desc: 'Diseñamos tu sitio y definimos qué agentes necesitas. Tú apruebas antes de construir.' },
  { n: '03', title: 'Desarrollo', desc: 'Construimos con Next.js 15. Integramos los agentes IA. Probamos todo antes de lanzar.' },
  { n: '04', title: 'Lanzamiento', desc: 'Tu sitio en vivo en Vercel. Los agentes operando. Tú vendes mientras duermes.' },
]

export function ProcessSection() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        <p className="text-label mb-2">Cómo funciona</p>
        <h2 className="text-d2 mb-10">
          Del brief al<br />
          <span style={{ color: 'var(--red)' }}>lanzamiento.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
          <div
            className="absolute hidden md:block"
            style={{ top: 20, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(229,62,62,0.3), transparent)' }}
          />
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="relative">
              <div
                className="flex items-center justify-center font-display font-black mb-4"
                style={{
                  width: 40, height: 40,
                  border: '1px solid var(--red)',
                  color: 'var(--red)',
                  fontSize: 15,
                  background: 'var(--black)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                }}
              >
                {n}
              </div>
              <h3 className="font-display font-bold uppercase mb-2" style={{ fontSize: 16, color: 'var(--white)' }}>{title}</h3>
              <p style={{ fontSize: 12, color: 'var(--gray-2)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ──────────────────────────────────────────────── */
const FAQS = [
  { q: '¿Cuánto cuesta?', a: 'Depende del proyecto y los agentes que necesites. Hablamos por WhatsApp y te damos una propuesta sin compromiso.' },
  { q: '¿Necesito saber programar?', a: 'Para nada. Nosotros nos encargamos de todo — diseño, desarrollo, configuración de los agentes y el lanzamiento.' },
  { q: '¿Funciona para mi tipo de negocio?', a: 'Si tienes clientes, te sirve. Hemos trabajado con ferreterías, restaurantes, clínicas y tiendas de todo tipo.' },
  { q: '¿Cuánto tiempo tarda en estar listo?', a: 'Entre 1 y 3 semanas dependiendo de la complejidad. Proyectos simples pueden estar en línea antes.' },
  { q: '¿Qué pasa después del lanzamiento?', a: 'Te damos soporte post-lanzamiento. Los agentes se pueden actualizar y mejorar en cualquier momento.' },
  { q: '¿Puedo ver un demo antes de decidir?', a: 'Claro. STRIKER, el agente que estás usando ahora mismo, es un ejemplo real de lo que construimos.' },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)', background: 'var(--black-2)' }}>
      <div className="container max-w-3xl">
        <p className="text-label mb-2">Preguntas frecuentes</p>
        <h2 className="text-d2 mb-10">
          Sin rodeos.
          <span style={{ color: 'var(--red)', display: 'block' }}>Sin letra chica.</span>
        </h2>
        <div className="flex flex-col">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-white"
                style={{ color: open === i ? 'var(--white)' : 'var(--gray-1)' }}
              >
                <span className="font-display font-bold uppercase tracking-wide" style={{ fontSize: 15 }}>{q}</span>
                <span className="font-display font-bold text-xl ml-4 shrink-0" style={{ color: 'var(--red)', transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {open === i && (
                <p className="pb-5" style={{ fontSize: 13, color: 'var(--gray-2)', lineHeight: 1.8 }}>{a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA FINAL ────────────────────────────────────────── */
const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function CtaFinal() {
  return (
    <section
      className="section-padding relative overflow-hidden text-center"
      style={{
        background: 'var(--black)',
        borderBottom: '1px solid var(--border-2)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(229,62,62,0.1), transparent 70%)' }}
      />
      <div className="relative container max-w-2xl">
        <p className="text-label mb-4">¿Listo?</p>
        <h2 className="text-d1 mb-4">
          Activa tus
          <span style={{ color: 'var(--red)', display: 'block' }}>agentes.</span>
        </h2>
        <p className="mb-8" style={{ color: 'var(--gray-1)', fontSize: 14 }}>
          Primera consulta gratis. Sin compromisos. Respuesta en menos de 2 horas.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-clip inline-flex items-center gap-2 font-display font-bold text-sm tracking-wide uppercase text-white px-7 py-3.5 transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.215a.75.75 0 00.921.921l5.357-1.476A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            +503 7910 2453
          </a>
          <Link
            href="/contacto"
            className="btn-clip inline-flex items-center gap-2 font-display font-bold text-sm tracking-wide uppercase px-7 py-3.5 transition-colors hover:text-white"
            style={{ border: '1px solid var(--border)', color: 'var(--gray-1)' }}
          >
            Enviar mensaje
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ───────────────────────────────────────────── */
export function FooterSection() {
  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between gap-4"
      style={{
        padding: '24px var(--section-px)',
        borderTop: '1px solid var(--border-2)',
        background: 'var(--black)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center font-display font-black text-white"
          style={{
            width: 22, height: 22, fontSize: 7, background: 'var(--red)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
          }}
        >
          &lt;/&gt;
        </div>
        <span className="font-display font-black text-sm tracking-wide" style={{ color: 'var(--white)' }}>BLITZ</span>
        <span style={{ width: 1, height: 16, background: 'var(--border)', display: 'inline-block' }} />
        <span className="font-display font-semibold text-xs uppercase tracking-widest" style={{ color: 'var(--gray-3)', letterSpacing: '0.14em' }}>
          Automatiza. Conecta. Crece.
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/dacabrero11"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-semibold text-xs uppercase tracking-widest transition-colors hover:text-white"
          style={{ color: 'var(--gray-3)', letterSpacing: '0.12em' }}
        >
          GitHub
        </a>
        <span className="text-xs" style={{ color: 'var(--gray-3)' }}>© 2025 Blitz · El Salvador</span>
      </div>
    </footer>
  )
}
