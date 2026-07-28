'use client'

import { useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react'

/**
 * Misma sensación que TiltCard pero sobre un <div>, para bloques que llevan
 * botones o enlaces propios dentro — meterlos en un <a> sería HTML inválido y
 * rompería sus clics.
 *
 * El giro por defecto es menor que en TiltCard: aquel envuelve tarjetas
 * pequeñas, y 15° en un panel del tamaño de media pantalla marea.
 */
export function TiltPanel({
  accent,
  children,
  className,
  style,
  maxTilt = 6,
  lift = 6,
  scale = 1.012,
}: {
  accent: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxTilt?: number
  lift?: number
  scale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState<string | undefined>(undefined)
  const [hovered, setHovered] = useState(false)

  function reducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || reducedMotion()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTransform(
      `perspective(1100px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateY(-${lift}px) scale(${scale})`
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setTransform(undefined)
      }}
      style={{
        ...style,
        transform,
        transformStyle: 'preserve-3d',
        willChange: hovered ? 'transform' : undefined,
        transition: 'transform 180ms ease-out, box-shadow 280ms ease-out',
        boxShadow: hovered
          ? `0 34px 70px -22px ${accent}70, 0 0 0 1px ${accent}45`
          : '0 14px 36px -24px rgba(0,0,0,0.95)',
      }}
    >
      {children}
    </div>
  )
}
