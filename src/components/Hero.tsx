import { useEffect, useMemo, useRef, useState } from 'react'
import { ensureGsapRegistered, gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import GeminiBadge from './GeminiBadge'
import AiChatPanel from './AiChatPanel'

import dashboardImg from '../assets/nyx/dashboard.png'
import phoneOutlineImg from '../assets/nyx/phone-outline.png'

type Mode = 'incoming' | 'outgoing'

function formatCompactINR(value: number) {
  if (Math.abs(value) >= 100000) return `₹${Math.round(value / 1000)}k`
  return `₹${Math.round(value)}`
}

function pathFromSeries(series: number[], width: number, height: number) {
  const max = Math.max(...series)
  const min = Math.min(...series)
  const span = Math.max(1e-9, max - min)
  const step = width / (series.length - 1)
  const points = series.map((v, i) => {
    const t = (v - min) / span
    return { x: i * step, y: (1 - t) * height }
  })
  const d: string[] = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`]
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d.push(
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    )
  }
  return d.join(' ')
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const [mode, setMode] = useState<Mode>('incoming')
  const [prompt, setPrompt] = useState('')

  const valueRef = useRef<HTMLSpanElement | null>(null)
  const deltaRef = useRef<HTMLSpanElement | null>(null)
  const sparkRef = useRef<SVGPathElement | null>(null)
  const heroWrapRef = useRef<HTMLDivElement | null>(null)
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const orbRef = useRef<HTMLDivElement | null>(null)

  const mini = useMemo(
    () => ({
      incoming: { total: 349904, deltaPct: 7.9, series: [4, 7, 6, 9, 11, 10, 12, 13, 12] },
      outgoing: { total: 221512, deltaPct: -2.1, series: [6, 5, 7, 6, 8, 9, 8, 7, 6] },
    }),
    [],
  )

  useEffect(() => {
    if (reducedMotion) return
    const wrap = heroWrapRef.current
    const spotlight = spotlightRef.current
    if (!wrap || !spotlight) return
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      spotlight.style.opacity = '1'
      wrap.style.setProperty('--spotlight-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
      wrap.style.setProperty('--spotlight-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
    const onLeave = () => {
      spotlight.style.opacity = '0'
    }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const target = mini[mode]
    const fromObj = { v: mini[mode === 'incoming' ? 'outgoing' : 'incoming'].total }
    gsap.to(fromObj, {
      v: target.total,
      duration: 0.95,
      ease: 'power3.out',
      onUpdate: () => {
        if (valueRef.current) valueRef.current.textContent = formatCompactINR(fromObj.v)
      },
    })
    if (deltaRef.current) {
      deltaRef.current.textContent = `${target.deltaPct > 0 ? '+' : ''}${target.deltaPct.toFixed(1)}%`
      deltaRef.current.className =
        target.deltaPct >= 0
          ? 'text-sm font-semibold text-emerald-600'
          : 'text-sm font-semibold text-[var(--color-muted-slate)]'
    }
    if (sparkRef.current) {
      const path = sparkRef.current
      const len = path.getTotalLength?.() ?? 260
      path.style.strokeDasharray = `${len}`
      path.style.strokeDashoffset = `${len}`
      gsap.to(path, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' })
    }
  }, [mode, reducedMotion, mini])

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
    tl.fromTo('.nyx-hero-title', { y: 22, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 })
      .fromTo('.nyx-hero-sub', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, '-=0.55')
      .fromTo('.nyx-hero-cta', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, '-=0.35')
      .fromTo('.nyx-hero-visual', { y: 26, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 1 }, '-=0.2')

    if (orbRef.current) {
      gsap.to(orbRef.current, {
        rotation: 360,
        duration: 24,
        ease: 'none',
        repeat: -1,
      })
    }
    return () => {
      tl.kill()
    }
  }, [reducedMotion])

  const sparkD = pathFromSeries(mini[mode].series, 220, 54)

  return (
    <section className="relative overflow-hidden pt-[84px]">
      <div
        ref={heroWrapRef}
        className="relative mx-auto w-full max-w-6xl px-4 pb-10 sm:pb-14"
        style={{ '--spotlight-x': '50%', '--spotlight-y': '30%' } as React.CSSProperties}
      >
        <div className="nyx-noise absolute inset-0" />
        <div ref={spotlightRef} className="nyx-spotlight absolute inset-0" aria-hidden />

        <div
          ref={orbRef}
          className="pointer-events-none absolute -top-32 right-[-80px] h-[420px] w-[420px] rounded-full opacity-[0.35] nyx-gemini-orb blur-3xl"
          aria-hidden
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[rgba(66,133,244,0.08)] blur-3xl" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative">
            <div className="nyx-hero-title flex flex-wrap items-center gap-2">
              <GeminiBadge />
              <span className="inline-flex items-center rounded-full bg-[rgba(34,211,238,0.12)] ring-1 ring-[rgba(34,211,238,0.35)] px-3 py-1 text-[10px] font-bold text-[var(--color-ocean-tint)]">
                AI-NATIVE FINANCE
              </span>
            </div>

            <h1 className="nyx-hero-title mt-6 text-[var(--color-midnight-ink)] font-bold tracking-[-0.08em] text-5xl leading-[0.95] sm:text-[58px]">
              Your money,{' '}
              <span className="nyx-gradient-text">explained by AI</span>
            </h1>

            <p className="nyx-hero-sub mt-4 max-w-xl text-[15px] leading-[1.55] text-[var(--color-muted-slate)]">
              <span className="font-semibold text-[var(--color-midnight-ink)]">nyx</span> connects
              your accounts and lets you ask anything — budgets, merchants, goals — with{' '}
              <span className="font-semibold nyx-gradient-text">Gemini</span> turning raw
              transactions into calm, actionable answers.
            </p>

            <form
              className="nyx-hero-cta mt-6 flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <div className="flex-1 flex items-center gap-2 rounded-full bg-white ring-1 ring-[rgba(66,133,244,0.25)] px-4 py-3 shadow-[0px_12px_32px_rgba(66,133,244,0.1)] focus-within:ring-2 focus-within:ring-[rgba(66,133,244,0.4)]">
                <span className="text-[var(--color-gemini-blue)] font-bold">✦</span>
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask: Why did I spend more this week?"
                  className="flex-1 bg-transparent text-sm font-semibold text-[var(--color-midnight-ink)] outline-none placeholder:text-[var(--color-soft-stone)]"
                />
              </div>
              <button
                type="submit"
                className="rounded-full px-6 py-3 text-sm font-bold text-white nyx-gemini-btn transition hover:brightness-110 active:scale-[0.98]"
              >
                Ask Nyx
              </button>
            </form>

            <div className="nyx-hero-cta mt-3 flex flex-wrap gap-2">
              {['Summarize my month', 'Can I afford a trip?', 'Find coffee spends'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full px-3 py-1.5 text-xs font-bold text-[var(--color-muted-slate)] bg-white/80 ring-1 ring-[rgba(55,83,144,0.14)] hover:ring-[rgba(66,133,244,0.35)] hover:text-[var(--color-midnight-ink)] transition"
                  onClick={() => setPrompt(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="mt-7 rounded-[20px] bg-white/80 ring-1 ring-[rgba(66,133,244,0.15)] shadow-[var(--shadow-xl)] overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[rgba(55,83,144,0.08)]">
                <div>
                  <div className="text-xs font-semibold text-[var(--color-muted-slate)]">
                    AI balance summary
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span
                      ref={valueRef}
                      className="text-[32px] font-bold tracking-[-0.04em] text-[var(--color-midnight-ink)]"
                    >
                      {formatCompactINR(mini.incoming.total)}
                    </span>
                    <span ref={deltaRef} className="text-sm font-semibold text-emerald-600">
                      +7.9%
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(['incoming', 'outgoing'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={
                        mode === m
                          ? 'rounded-full bg-[rgba(66,133,244,0.12)] ring-1 ring-[rgba(66,133,244,0.35)] px-3 py-2 text-xs font-bold text-[var(--color-gemini-blue)] capitalize'
                          : 'rounded-full bg-[var(--color-whisper-gray)] px-3 py-2 text-xs font-bold text-[var(--color-muted-slate)] capitalize'
                      }
                      onClick={() => setMode(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-4 pb-4 pt-2">
                <svg viewBox="0 0 220 54" width="100%" height="54">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-gemini-blue)" />
                      <stop offset="50%" stopColor="var(--color-gemini-purple)" />
                      <stop offset="100%" stopColor="var(--color-gemini-cyan)" />
                    </linearGradient>
                  </defs>
                  <path
                    ref={sparkRef}
                    d={sparkD}
                    fill="none"
                    stroke="url(#sparkGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="nyx-hero-visual relative space-y-4">
            <AiChatPanel />

            <div className="relative mx-auto max-w-[320px] opacity-90">
              <img
                className="pointer-events-none w-full"
                src={phoneOutlineImg}
                alt=""
              />
              <div className="absolute inset-[8%] rounded-[20px] overflow-hidden ring-1 ring-[rgba(66,133,244,0.2)]">
                <img src={dashboardImg} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-[rgba(32,41,76,0.75)] to-transparent">
                  <span className="text-[10px] font-bold text-white/90">Gemini insight ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
