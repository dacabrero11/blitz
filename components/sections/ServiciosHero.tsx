import Image from 'next/image'

export function ServiciosHero() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ paddingTop: 'calc(var(--nav-h) + 64px)', borderBottom: '1px solid var(--border-2)', background: '#080808', minHeight: '70vh', display: 'flex', alignItems: 'center' }}
    >
      <Image
        src="/hero-servicios.jpg"
        alt="Servicios digitales BLITZ"
        fill
        className="pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(1.6) contrast(0.88)', zIndex: 0 }}
        priority
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.72) 35%, rgba(8,8,8,0.15) 65%, rgba(8,8,8,0.05) 100%)', zIndex: 1 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.5) 0%, transparent 30%)', zIndex: 1 }}
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
