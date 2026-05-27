import { useEffect, useRef } from 'react'
import { ensureGsapRegistered, gsap, ScrollTrigger } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

const stats = [
  { label: 'AI queries answered / day', value: 12, suffix: 'k+' },
  { label: 'Auto-categorized transactions', value: 98, suffix: '%' },
  { label: 'Avg. insight response time', value: 2, suffix: 's' },
]

export default function AnimatedStats() {
  const reducedMotion = usePrefersReducedMotion()
  const els = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()

    const triggers: gsap.core.Tween[] = []
    for (let i = 0; i < stats.length; i++) {
      const el = els.current[i]
      if (!el) continue

      const obj = { v: 0 }
      const suffix = stats[i].suffix
      const targetValue = stats[i].value

      triggers.push(
        gsap.fromTo(obj, { v: 0 }, {
          v: targetValue,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = suffix ? `${Math.round(obj.v)}${suffix}` : `${Math.round(obj.v)}`
          },
        }),
      )
    }

    return () => {
      triggers.forEach((t) => t.kill())
      ScrollTrigger.refresh()
    }
  }, [reducedMotion])

  return (
    <div className="relative">
      <div
        className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        data-reveal="true"
      >
        <div>
          <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]">
            GEMINI-POWERED METRICS
          </div>
          <h2 className="mt-2 text-[var(--color-midnight-ink)] font-bold tracking-[-0.04em] text-3xl sm:text-4xl">
            AI that <span className="nyx-gradient-text">works in the background</span>
          </h2>
        </div>
        <div className="text-sm font-semibold text-[var(--color-muted-slate)] max-w-md">
          Real-time categorization, anomaly detection, and summaries — no manual spreadsheets.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-[20px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-md-2)] p-5"
            data-reveal="true"
          >
            <div className="text-xs font-bold text-[var(--color-soft-stone)]">
              {s.label}
            </div>
            <div className="mt-2">
              <span
                ref={(node) => {
                  els.current[i] = node
                }}
                className="text-[32px] font-bold leading-[1.19] tracking-[-0.04em] text-[var(--color-midnight-ink)]"
              >
                {stats[i].suffix ? `0${stats[i].suffix}` : '0'}
              </span>
            </div>
            <div className="mt-3 h-[6px] rounded-full bg-[rgba(120,141,186,0.20)] overflow-hidden">
              <div
                className="h-full w-2/3 rounded-full bg-[var(--color-active-blue)] opacity-80 animate-[pulseWidth_2.4s_infinite]"
                style={{ width: `${Math.min(100, 20 + i * 28)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulseWidth {
          0% { filter: saturate(1); transform: translateX(-10%); opacity: 0.7;}
          55% { filter: saturate(1.2); transform: translateX(0%); opacity: 1;}
          100% { filter: saturate(1); transform: translateX(10%); opacity: 0.7;}
        }
      `}</style>
    </div>
  )
}

