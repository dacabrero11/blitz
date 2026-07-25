'use client'

import Link from 'next/link'
import { useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react'

const MAX_TILT = 15 // degrees

interface TiltCardProps {
  href: string
  accent: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Card wrapper that tilts in 3D following the cursor, with a soft accent glow on hover.
 * Falls back to a static card when the user prefers reduced motion.
 */
export function TiltCard({ href, accent, children, className, style }: TiltCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [transform, setTransform] = useState<string | undefined>(undefined)
  const [hovered, setHovered] = useState(false)

  function reducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el || reducedMotion()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTransform(
      `perspective(650px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-10px) scale(1.04)`
    )
  }

  function handleEnter() {
    setHovered(true)
  }

  function handleLeave() {
    setHovered(false)
    setTransform(undefined)
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 140ms ease-out, box-shadow 250ms ease-out',
        boxShadow: hovered
          ? `0 30px 60px -18px ${accent}80, 0 0 0 1px ${accent}55`
          : '0 12px 32px -20px rgba(0,0,0,0.95)',
      }}
    >
      {children}
    </Link>
  )
}
