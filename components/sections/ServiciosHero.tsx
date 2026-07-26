export function ServiciosHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 'calc(var(--nav-h) + 78px)',
        paddingBottom: 72,
        paddingLeft: 'var(--section-px)',
        paddingRight: 'var(--section-px)',
        background: '#080808',
      }}
    >
      {/* resplandor sutil: da profundidad sin competir con los heroes de categoria */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 120% at 12% 0%, rgba(229,62,62,0.13), transparent 62%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(229,62,62,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(229,62,62,0.05) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
        }}
      />
      {/* fundido al negro hacia abajo, para que la seccion siguiente no corte en seco */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: 120, background: 'linear-gradient(0deg, #080808, transparent)' }}
      />

      <div className="relative w-full mx-auto" style={{ maxWidth: 1700 }}>
        <p className="text-label mb-3">Lo que hacemos</p>
        <h1 className="text-d1">
          Servicios
          <span style={{ color: 'var(--red)', display: 'block' }}>digitales.</span>
        </h1>
        <p className="mt-5" style={{ color: 'var(--gray-1)', fontSize: 14.5, lineHeight: 1.75, maxWidth: 520 }}>
          Desde agentes de IA hasta identidad de marca. Todo lo que tu negocio necesita para crecer digitalmente — en un solo lugar.
        </p>
      </div>
    </section>
  )
}
