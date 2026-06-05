import Link from 'next/link'

export function PortfolioPreview() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-2)' }}>
      <div className="container">
        <p className="text-label mb-2">Caso de éxito</p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ border: '1px solid var(--border)' }}
        >
          <div className="p-8" style={{ borderRight: '1px solid var(--border)', background: 'var(--black-2)' }}>
            <div className="text-label mb-3" style={{ color: 'var(--red)' }}>Cliente activo · En vivo ahora</div>
            <h3 className="text-d3 mb-4">Ferreterías<br />Lemus</h3>
            <p style={{ fontSize: 13, color: 'var(--gray-2)', lineHeight: 1.8, marginBottom: 24 }}>
              20 sucursales en El Salvador con catálogo digital, pagos en línea vía Wompi y agente IA
              atendiendo consultas. Construido con Next.js 15 y Claude Haiku.
            </p>
            <div className="flex gap-6 mb-6">
              {[['20', 'Sucursales'], ['24/7', 'Operación'], ['IA', 'Integrada']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-black text-2xl" style={{ color: 'var(--red)' }}>{n}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
            <Link
              href="/portfolio"
              className="inline-flex font-display font-bold text-xs tracking-widest uppercase px-4 py-2 transition-colors hover:text-white"
              style={{ border: '1px solid var(--border)', color: 'var(--gray-1)' }}
            >
              Ver caso completo →
            </Link>
          </div>
          <div className="p-8 flex items-center justify-center" style={{ background: 'var(--black)', minHeight: 200 }}>
            <div className="text-center">
              <div className="font-display font-black text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gray-3)' }}>
                ferreterias-lemus.vercel.app
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                {['Next.js 15', 'Claude Haiku', 'Wompi', 'Vercel'].map((t) => (
                  <span key={t} className="font-display font-bold text-xs uppercase px-2 py-1" style={{ border: '1px solid var(--border)', color: 'var(--gray-2)', letterSpacing: '0.1em' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
