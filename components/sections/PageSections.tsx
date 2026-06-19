'use client'

import { useState } from 'react'
import { MatrixBackground } from '@/components/ui/MatrixBackground'

/* ─── PORTFOLIO HERO ── */
export function PortfolioHero() {
  return (
    <section
      className="section-padding relative overflow-hidden grid-bg"
      style={{ paddingTop: 'calc(var(--nav-h) + 64px)', borderBottom: '1px solid var(--border-2)' }}
    >
      <MatrixBackground />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.15) 100%)', zIndex: 2 }} />
      <div className="container relative" style={{ zIndex: 3 }}>
        <p className="text-label mb-2">Portfolio</p>
        <h1 className="text-d1">
          Resultados
          <span style={{ color: 'var(--red)', display: 'block' }}>reales.</span>
        </h1>
      </div>
    </section>
  )
}

/* ─── CASE STUDY ── */
export function CaseStudy() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        <p className="text-label mb-2">Casos de éxito</p>
        <div className="p-8" style={{ border: '1px solid var(--border)', background: 'var(--black-2)' }}>
          <h2 className="text-d2 mb-4">Próximamente<br /><span style={{ color: 'var(--red)' }}>en vivo.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-label mb-2">¿Qué documentamos?</p>
              <p style={{ fontSize: 13, color: 'var(--gray-2)', lineHeight: 1.8 }}>
                Negocios salvadoreños que implementaron agentes IA de BLITZ y transformaron
                su operación. Resultados reales, medibles, con números concretos.
              </p>
            </div>
            <div>
              <p className="text-label mb-2">¿Querés ser el primero?</p>
              <p style={{ fontSize: 13, color: 'var(--gray-2)', lineHeight: 1.8 }}>
                Si tu negocio adopta BLITZ ahora, documentamos tu caso de éxito
                y te damos visibilidad gratuita en nuestro portfolio cuando lancemos.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
            {[['5', 'Agentes activos'], ['24/7', 'Atención IA'], ['$0', 'Costo consulta'], ['30 min', 'Primera llamada']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display font-black text-2xl" style={{ color: 'var(--red)' }}>{n}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20agendar%20una%20llamada"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-bold text-xs uppercase tracking-widest transition-colors hover:text-white"
              style={{ color: 'var(--red)' }}
            >
              Agendar llamada gratis ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT HERO ── */
export function ContactHero() {
  return (
    <section
      className="section-padding relative overflow-hidden grid-bg"
      style={{ paddingTop: 'calc(var(--nav-h) + 64px)', borderBottom: '1px solid var(--border-2)' }}
    >
      <MatrixBackground />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.15) 100%)', zIndex: 2 }} />
      <div className="container relative" style={{ zIndex: 3 }}>
        <p className="text-label mb-2">Contacto</p>
        <h1 className="text-d1">
          Hablemos
          <span style={{ color: 'var(--red)', display: 'block' }}>ahora.</span>
        </h1>
        <p className="mt-4" style={{ color: 'var(--gray-1)', fontSize: 14 }}>
          Primera consulta gratis. Respuesta en menos de 2 horas.
        </p>
      </div>
    </section>
  )
}

/* ─── ROI CALCULATOR ── */
export function RoiCalculator() {
  const [employees, setEmployees] = useState(3)
  const [hours, setHours] = useState(4)
  const hourlyRate = 3.5
  const monthlySavings = Math.round(employees * hours * hourlyRate * 22)

  return (
    <section
      className="section-padding"
      style={{ borderBottom: '1px solid var(--border-2)', background: 'var(--black-2)' }}
    >
      <div className="container max-w-2xl">
        <p className="text-label mb-2">Calculadora de ROI</p>
        <h2 className="text-d2 mb-8">
          ¿Cuánto puedes
          <span style={{ color: 'var(--red)', display: 'block' }}>ahorrar?</span>
        </h2>

        <div className="flex flex-col gap-6 mb-8">
          <div>
            <label className="text-label mb-3 block" style={{ color: 'var(--gray-1)' }}>
              Empleados en atención al cliente: <span style={{ color: 'var(--white)' }}>{employees}</span>
            </label>
            <input
              type="range" min={1} max={20} value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--red)' }}
            />
          </div>
          <div>
            <label className="text-label mb-3 block" style={{ color: 'var(--gray-1)' }}>
              Horas diarias en tareas repetitivas: <span style={{ color: 'var(--white)' }}>{hours}h</span>
            </label>
            <input
              type="range" min={1} max={12} value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--red)' }}
            />
          </div>
        </div>

        <div
          className="p-6 text-center relative"
          style={{ border: '1px solid rgba(229,62,62,0.4)', background: 'rgba(229,62,62,0.05)' }}
        >
          <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: 'var(--red)' }} />
          <div className="text-label mb-1">Ahorro mensual estimado</div>
          <div className="font-display font-black" style={{ fontSize: 56, color: 'var(--white)', lineHeight: 1 }}>
            ${monthlySavings.toLocaleString('es-SV')}
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray-2)', marginTop: 4 }}>
            Al automatizar con agentes Blitz
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT FORM ── */
const WA_URL = 'https://wa.me/50379102453?text=Hola%20Blitz%2C%20quiero%20información%20sobre%20sus%20servicios'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hola Blitz, soy ${form.name}. ${form.message || 'Quiero información sobre sus servicios.'}`
    )
    window.open(`https://wa.me/50379102453?text=${text}`, '_blank')
    setSent(true)
  }

  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container max-w-xl">
        <p className="text-label mb-2">Enviar mensaje</p>
        <h2 className="text-d2 mb-8">Tu primera
          <span style={{ color: 'var(--red)', display: 'block' }}>consulta es gratis.</span>
        </h2>

        {sent ? (
          <div className="text-center p-8" style={{ border: '1px solid var(--red)', background: 'rgba(229,62,62,0.05)' }}>
            <div className="font-display font-black text-2xl mb-2" style={{ color: 'var(--red)' }}>¡Mensaje enviado!</div>
            <p style={{ color: 'var(--gray-1)', fontSize: 13 }}>Te redirigimos a WhatsApp. Respondemos en menos de 2 horas.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[
              { name: 'name', placeholder: 'Nombre', type: 'text' },
              { name: 'email', placeholder: 'Correo electrónico', type: 'email' },
              { name: 'phone', placeholder: 'Teléfono (opcional)', type: 'tel' },
            ].map(({ name, placeholder, type }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-700 transition-colors"
                style={{ border: '1px solid var(--border)', color: 'var(--white)', background: 'var(--black-2)' }}
              />
            ))}
            <textarea
              name="message"
              placeholder="¿En qué te podemos ayudar?"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-700 resize-none"
              style={{ border: '1px solid var(--border)', color: 'var(--white)', background: 'var(--black-2)' }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 font-display font-bold text-sm uppercase tracking-wide text-white py-3 transition-opacity hover:opacity-90"
                style={{ background: '#25D366', clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              >
                Enviar por WhatsApp
              </button>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-sm uppercase tracking-wide text-white px-5 py-3 transition-opacity hover:opacity-90"
                style={{ background: 'var(--red)', clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              >
                Directo
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
