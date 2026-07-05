'use client'

import Link from 'next/link'

/* ─── CASO DE ÉXITO — DATTO BUSINESS NETWORK ── */
export function CaseStudyDatto() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        <p className="text-label mb-2">Caso de éxito</p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ border: '1px solid var(--border)' }}
        >
          {/* Imagen */}
          <div
            className="relative"
            style={{ borderRight: '1px solid var(--border)', background: 'var(--black-2)', minHeight: 320 }}
          >
            {/* Reemplazar /public/portfolio/datto-hero.jpg por la captura real del Hero de dattogroup.com */}
            <img
              src="/portfolio/datto-hero.jpg"
              alt="Sitio web de Datto Business Network"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
              onError={(e) => {
                const img = e.currentTarget
                img.style.display = 'none'
                const fallback = img.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            {/* Fallback visible solo si la imagen real todavía no existe */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ display: 'none', background: 'linear-gradient(135deg, var(--black-2) 0%, var(--black) 100%)' }}
            >
              <div className="text-center px-6">
                <div className="font-display font-black text-xl mb-2" style={{ color: 'var(--red)' }}>DATTO</div>
                <div style={{ fontSize: 11, color: 'var(--gray-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Vista previa próximamente
                </div>
              </div>
            </div>
            <div
              className="absolute"
              style={{
                bottom: 16, left: 16,
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#fff', background: 'rgba(0,0,0,0.55)', padding: '6px 12px',
                border: '1px solid var(--border)',
              }}
            >
              dattogroup.com
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8">
            <div className="text-label mb-3" style={{ color: 'var(--red)' }}>En vivo · Producción</div>
            <h3 className="text-d3 mb-4">
              Datto Business<br />Network
            </h3>
            <p style={{ fontSize: 13, color: 'var(--gray-2)', lineHeight: 1.8, marginBottom: 24 }}>
              Sitio web corporativo completo para una empresa salvadoreña de soluciones tecnológicas
              empresariales — servicio técnico, licenciamiento y hardware de última generación.
              Dominio propio, formulario de contacto integrado y experiencia optimizada para mobile.
            </p>

            <div className="flex flex-wrap gap-6 mb-6">
              {[
                ['100%', 'Responsive'],
                ['9+', 'Categorías catálogo'],
                ['1', 'Dominio propio'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-black text-2xl" style={{ color: 'var(--red)' }}>{n}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Testimonio — placeholder hasta recibir la cita de Melvin */}
            <div
              className="p-5 mb-6"
              style={{ background: 'var(--black-2)', border: '1px solid var(--border)', borderLeft: '2px solid var(--red)' }}
            >
              <p style={{ fontSize: 13, color: 'var(--gray-1)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {/* TODO: reemplazar con la cita real de Melvin Cardoza cuando la envíe */}
                "Testimonio próximamente — Melvin Cardoza, Datto Business Network."
              </p>
            </div>

            <div className="flex gap-6 flex-wrap items-center">
              <Link
                href="https://dattogroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-xs uppercase tracking-widest transition-colors hover:text-white"
                style={{ color: 'var(--red)' }}
              >
                Ver sitio en vivo ↗
              </Link>
              <Link
                href="/contacto"
                className="inline-flex font-display font-bold text-xs tracking-widest uppercase px-4 py-2 transition-colors hover:text-white"
                style={{ border: '1px solid var(--border)', color: 'var(--gray-1)' }}
              >
                Quiero un caso como este →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
