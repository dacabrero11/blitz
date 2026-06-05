'use client'

import { useEffect, useRef } from 'react'

const CHARS = '01アイウエカキクサシスタチ</>{}[]=+-*ABCDEFGHIJ'

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const cx = cv.getContext('2d')!

    function resize() {
      cv!.width = cv!.offsetWidth
      cv!.height = cv!.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fs = 13
    const colW = 16
    let drops: number[] = []

    function initDrops() {
      const cols = Math.floor(cv!.width / colW)
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -(cv!.height / fs)))
    }
    initDrops()

    const interval = setInterval(() => {
      const W = cv!.width
      const H = cv!.height
      const alpha = 0.18

      cx.fillStyle = 'rgba(8,8,8,0.08)'
      cx.fillRect(0, 0, W, H)
      cx.font = `${fs}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const x = i * colW + (colW - fs) / 2
        const y = drops[i] * fs

        // Bright head
        cx.fillStyle = `rgba(255,90,90,${Math.min(alpha * 2.5, 0.95)})`
        cx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y)

        // Mid trail
        cx.fillStyle = `rgba(229,62,62,${alpha})`
        cx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fs)
        cx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fs * 2)

        // Dim tail
        cx.fillStyle = `rgba(229,62,62,${alpha * 0.4})`
        cx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fs * 3)
        cx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fs * 4)

        drops[i]++
        if (y > H && Math.random() > 0.97) drops[i] = Math.floor(Math.random() * -20)
      }
    }, 45)

    window.addEventListener('resize', () => { resize(); initDrops() })

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Red glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(229,62,62,0.07), transparent 70%)',
          zIndex: 1,
        }}
      />
    </>
  )
}
