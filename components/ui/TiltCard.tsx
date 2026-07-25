'use client'

import Link from 'next/link'
import { useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react'

const MAX_TILT = 7 // degrees

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
      `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-5px) scale(1.02)`
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
        transition: 'transform 180ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out',
        borderColor: hovered ? `${accent}aa` : 'rgba(255,255,255,0.10)',
        boxShadow: hovered
          ? `0 22px 48px -16px ${accent}66, inset 0 1px 0 rgba(255,255,255,0.10)`
          : '0 10px 30px -18px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {children}
    </Link>
  )
}
