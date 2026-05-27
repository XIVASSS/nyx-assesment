import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export default function ParticleField() {
  const reducedMotion = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const pointer = { x: 0, y: 0, has: false }
    const handleMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.has = true
    }
    const handleLeave = () => {
      pointer.has = false
    }

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const particles: Particle[] = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles.length = 0
      const count = Math.round((w * h) / 42000) // adaptive density
      const safeCount = Math.max(18, Math.min(70, count))

      for (let i = 0; i < safeCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: 0.8 + Math.random() * 1.6,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // subtle base tint
      ctx.fillStyle = 'rgba(255,255,255,0.0)'
      ctx.fillRect(0, 0, w, h)

      // cursor influence
      const attract = pointer.has
        ? { x: pointer.x, y: pointer.y, k: 0.0009 }
        : null

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (attract) {
          const dx = attract.x - p.x
          const dy = attract.y - p.y
          const dist2 = dx * dx + dy * dy
          const pull = attract.k * (1 / Math.max(1200, dist2))
          p.vx += dx * pull
          p.vy += dy * pull
        }

        // drift
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99

        // wrap edges
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        // draw dot
        ctx.beginPath()
        ctx.fillStyle = 'rgba(66,133,244,0.5)'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // link nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          const maxD = 170
          if (d2 < maxD * maxD) {
            const alpha = 1 - Math.sqrt(d2) / maxD
            ctx.strokeStyle = `rgba(55,83,144,${alpha * 0.18})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      rafRef.current = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerleave', handleLeave)

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
      aria-hidden="true"
    />
  )
}

