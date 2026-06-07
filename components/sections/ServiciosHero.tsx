import { MatrixBackground } from '@/components/ui/MatrixBackground'

export function ServiciosHero() {
  return (
    <section
      className="section-padding relative overflow-hidden grid-bg"
      style={{ paddingTop: 'calc(var(--nav-h) + 64px)', borderBottom: '1px solid var(--border-2)' }}
    >
      <MatrixBackground />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.1) 100%)', zIndex: 2 }}
      />
      <div className="container relative" style={{ zIndex: 3 }}>
        <p className="text-label mb-2">Lo que hacemos</p>
        <h1 className="text-d1">
          Servicios
          <span style={{ color: 'var(--red)', display: 'block' }}>digitales.</span>
        </h1>
        <p className="mt-4 max-w-xl" style={{ color: 'var(--gray-1)', fontSize: 14, lineHeight: 1.8 }}>
          Desde agentes de IA hasta identidad de marca. Todo lo que tu negocio necesita para crecer digitalmente — en un solo lugar.
        </p>
      </div>
    </section>
  )
}
