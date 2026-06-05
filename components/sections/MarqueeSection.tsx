const ITEMS = [
  'Agente de Ventas',
  'Agente Secretario',
  'Agente de Contenido',
  'Agente de Análisis',
  'Super Agente',
  'Next.js 15',
  'Claude IA',
  'El Salvador',
  'WhatsApp',
  'Automatización',
]

export function MarqueeSection() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden"
      style={{
        borderTop: '1px solid var(--border-2)',
        borderBottom: '1px solid var(--border-2)',
        background: 'var(--black-2)',
        padding: '12px 0',
      }}
    >
      <div className="animate-marquee flex whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 font-display font-semibold uppercase tracking-widest"
            style={{ fontSize: 11, color: 'var(--gray-3)', padding: '0 28px' }}
          >
            <span style={{ color: 'var(--red)' }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
