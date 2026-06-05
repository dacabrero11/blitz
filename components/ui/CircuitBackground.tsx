'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  connections: number[]
}

interface Particle {
  nodeIndex: number
  nextNode: number
  progress: number
  speed: number
  alpha: number
}

export function CircuitBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let raf: number
    let nodes: Node[] = []
    let particles: Particle[] = []

    function buildGrid() {
      if (!canvas) return
      nodes = []
      const w = canvas.width
      const h = canvas.height

      // Build grid of nodes with some randomness
      const cols = Math.ceil(w / 80) + 1
      const rows = Math.ceil(h / 80) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = (Math.random() - 0.5) * 20
          const jitterY = (Math.random() - 0.5) * 20
          nodes.push({
            x: c * 80 + jitterX,
            y: r * 80 + jitterY,
            connections: [],
          })
        }
      }

      // Connect horizontally and vertically with some skips
      for (let i = 0; i < nodes.length; i++) {
        const r = Math.floor(i / cols)
        const c = i % cols
        // right
        if (c < cols - 1 && Math.random() > 0.25) nodes[i].connections.push(i + 1)
        // down
        if (r < rows - 1 && Math.random() > 0.25) nodes[i].connections.push(i + cols)
      }

      // Spawn initial particles
      particles = []
      for (let i = 0; i < 6; i++) {
        spawnParticle()
      }
    }

    function spawnParticle() {
      const startNode = Math.floor(Math.random() * nodes.length)
      const node = nodes[startNode]
      if (!node || node.connections.length === 0) return
      const nextIdx = Math.floor(Math.random() * node.connections.length)
      particles.push({
        nodeIndex: startNode,
        nextNode: node.connections[nextIdx],
        progress: 0,
        speed: 0.004 + Math.random() * 0.006,
        alpha: 0.6 + Math.random() * 0.4,
      })
    }

    function draw() {
      if (!canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Draw static circuit lines
      ctx.strokeStyle = 'rgba(229,62,62,0.05)'
      ctx.lineWidth = 0.8

      for (let i = 0; i < nodes.length; i++) {
        const from = nodes[i]
        for (const toIdx of from.connections) {
          const to = nodes[toIdx]
          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.stroke()
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(229,62,62,0.12)'
        ctx.fill()
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const from = nodes[p.nodeIndex]
        const to = nodes[p.nextNode]
        if (!from || !to) { particles.splice(i, 1); continue }

        // Draw trail
        const px = from.x + (to.x - from.x) * p.progress
        const py = from.y + (to.y - from.y) * p.progress

        // Glowing dot
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 6)
        grd.addColorStop(0, `rgba(255,100,100,${p.alpha})`)
        grd.addColorStop(0.4, `rgba(229,62,62,${p.alpha * 0.5})`)
        grd.addColorStop(1, 'rgba(229,62,62,0)')
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Bright core
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,200,200,${p.alpha})`
        ctx.fill()

        // Trail behind
        const trailLen = 0.15
        const trailStart = Math.max(0, p.progress - trailLen)
        const tsx = from.x + (to.x - from.x) * trailStart
        const tsy = from.y + (to.y - from.y) * trailStart
        const grad = ctx.createLinearGradient(tsx, tsy, px, py)
        grad.addColorStop(0, 'rgba(229,62,62,0)')
        grad.addColorStop(1, `rgba(229,62,62,${p.alpha * 0.4})`)
        ctx.beginPath()
        ctx.moveTo(tsx, tsy)
        ctx.lineTo(px, py)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        p.progress += p.speed

        // Reached next node
        if (p.progress >= 1) {
          p.nodeIndex = p.nextNode
          const node = nodes[p.nodeIndex]
          if (node && node.connections.length > 0) {
            const nextIdx = Math.floor(Math.random() * node.connections.length)
            p.nextNode = node.connections[nextIdx]
            p.progress = 0
          } else {
            particles.splice(i, 1)
            spawnParticle()
          }
        }
      }

      // Keep particle count stable
      if (particles.length < 6) spawnParticle()

      raf = requestAnimationFrame(draw)
    }

    buildGrid()
    draw()

    window.addEventListener('resize', () => { resize(); buildGrid() })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
