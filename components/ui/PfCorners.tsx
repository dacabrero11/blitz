/** Esquinas de encuadre con el "+" del sistema BLITZ */
export function PfCorners({ color = 'var(--red)', size = 13 }: { color?: string; size?: number }) {
  const pos: React.CSSProperties[] = [
    { top: -1, left: 2 },
    { top: -1, right: 2 },
    { bottom: -1, left: 2 },
    { bottom: -1, right: 2 },
  ]
  return (
    <>
      {pos.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute font-display"
          style={{ ...s, color, fontSize: size, lineHeight: 1, opacity: 0.65, pointerEvents: 'none' }}
        >
          +
        </span>
      ))}
    </>
  )
}
