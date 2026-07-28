/* Aurora de fondo: tres focos que derivan y respiran.
   Solo markup, sin cliente: las animaciones viven en globals.css y
   únicamente mueven transform y opacity. */
export function AuroraBg({ color = '#E53E3E' }: { color?: string }) {
  return (
    <>
      <span
        aria-hidden
        className="agent-aurora animate-aurora-1"
        style={{ left: '-12%', top: '-18%', width: 720, height: 720, background: `radial-gradient(circle, ${color}52, transparent 70%)` }}
      />
      <span
        aria-hidden
        className="agent-aurora animate-aurora-2"
        style={{ right: '-10%', top: '18%', width: 820, height: 820, background: `radial-gradient(circle, ${color}42, transparent 68%)` }}
      />
      <span
        aria-hidden
        className="agent-aurora animate-aurora-3"
        style={{ left: '38%', bottom: '-24%', width: 760, height: 760, background: `radial-gradient(circle, ${color}3a, transparent 72%)` }}
      />
    </>
  )
}
