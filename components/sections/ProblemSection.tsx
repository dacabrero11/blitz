const PROBLEMS = [
  {
    n: '01',
    title: 'Tu negocio cierra. La competencia no.',
    desc: 'Mientras duermes, un cliente pregunta por WhatsApp y nadie responde. Lo atendió otra empresa.',
  },
  {
    n: '02',
    title: 'Una página web estática no vende.',
    desc: 'Tener presencia digital no es suficiente. Necesitas una web que convierta visitantes en clientes reales.',
  },
  {
    n: '03',
    title: 'Contratar personal es caro y lento.',
    desc: 'Un agente de IA hace el trabajo de 3 empleados a una fracción del costo, sin renunciar los lunes.',
  },
  {
    n: '04',
    title: 'No sabes qué pasa con tus datos.',
    desc: 'Sin análisis en tiempo real, tomas decisiones a ciegas. Tus competidores ya saben lo que tú ignoras.',
  },
]

export function ProblemSection() {
  return (
    <section
      className="section-padding"
      style={{ borderBottom: '1px solid var(--border-2)' }}
    >
      <div className="container">
        <p className="text-label mb-8">El problema</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROBLEMS.map(({ n, title, desc }) => (
            <div
              key={n}
              className="relative p-5"
              style={{
                background: 'var(--black-2)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: 2, background: 'var(--red)' }}
              />
              <div
                className="font-display font-black leading-none mb-2"
                style={{ fontSize: 44, color: 'rgba(229,62,62,0.1)' }}
              >
                {n}
              </div>
              <h3
                className="font-display font-bold uppercase mb-2"
                style={{ fontSize: 16, color: 'var(--white)' }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--gray-2)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
