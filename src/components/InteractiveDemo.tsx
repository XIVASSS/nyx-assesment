import { useEffect, useMemo, useRef, useState } from 'react'
import { ensureGsapRegistered, gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { cn } from '../lib/cn'

type TxType = 'incoming' | 'outgoing'

type Transaction = {
  id: string
  merchant: string
  amount: number // positive for incoming, negative for outgoing
  type: TxType
  category: string
  time: string
}

const txs: Transaction[] = [
  {
    id: 't1',
    merchant: 'State Bank of India',
    amount: 27932,
    type: 'incoming',
    category: 'Salary',
    time: 'Nov 20, 10:14 AM',
  },
  {
    id: 't2',
    merchant: 'HDFC Bank',
    amount: 2586.3,
    type: 'incoming',
    category: 'Interest',
    time: 'Nov 18, 8:03 AM',
  },
  {
    id: 't3',
    merchant: "McDonald's",
    amount: -45,
    type: 'outgoing',
    category: 'Food & drinks',
    time: 'Today, 11:30 AM',
  },
  {
    id: 't4',
    merchant: 'Uber',
    amount: -138,
    type: 'outgoing',
    category: 'Transport',
    time: 'Today, 9:52 AM',
  },
  {
    id: 't5',
    merchant: 'Amazon Pay',
    amount: -612,
    type: 'outgoing',
    category: 'Shopping',
    time: 'Yesterday, 6:40 PM',
  },
  {
    id: 't6',
    merchant: 'YouTube Premium',
    amount: -199,
    type: 'outgoing',
    category: 'Subscriptions',
    time: 'Yesterday, 2:10 PM',
  },
  {
    id: 't7',
    merchant: 'Gym Membership',
    amount: -130,
    type: 'outgoing',
    category: 'Health',
    time: 'Nov 22, 7:10 AM',
  },
  {
    id: 't8',
    merchant: 'Coffee',
    amount: -45,
    type: 'outgoing',
    category: 'Food & drinks',
    time: 'Nov 22, 8:30 AM',
  },
]

function formatINR(value: number) {
  const sign = value < 0 ? '-' : '+'
  const abs = Math.abs(value)
  const rounded = Math.round(abs)
  return `${sign}₹${rounded.toLocaleString('en-IN')}`
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function makeCSV(rows: Transaction[]) {
  const header = ['merchant', 'category', 'type', 'amount', 'time'].join(',')
  const lines = rows.map((r) =>
    [r.merchant, r.category, r.type, r.amount, r.time]
      .map((x) => `"${String(x).replaceAll('"', '""')}"`)
      .join(','),
  )
  return [header, ...lines].join('\n')
}

export default function InteractiveDemo() {
  const reducedMotion = usePrefersReducedMotion()
  const [query, setQuery] = useState('coffee')
  const [showIncoming, setShowIncoming] = useState(true)
  const [showOutgoing, setShowOutgoing] = useState(true)
  const [activeResultIndex, setActiveResultIndex] = useState(0)
  const [anxietyTune, setAnxietyTune] = useState(34)
  const [statementOpen, setStatementOpen] = useState(false)

  const barRefs = useRef<Array<HTMLDivElement | null>>([])
  const meterRef = useRef<HTMLDivElement | null>(null)
  const valuePulseRef = useRef<HTMLSpanElement | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const allow: TxType[] = []
    if (showIncoming) allow.push('incoming')
    if (showOutgoing) allow.push('outgoing')

    const res = txs.filter((t) => {
      if (!allow.includes(t.type)) return false
      if (!q) return true
      return (
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.time.toLowerCase().includes(q)
      )
    })

    return res
  }, [query, showIncoming, showOutgoing])

  const chart = useMemo(() => {
    // Fake 7-day chart, derived from filters to feel "alive".
    const incomingBase = [18, 22, 19, 28, 21, 33, 29]
    const outgoingBase = [12, 15, 13, 16, 20, 18, 14]

    const incoming = showIncoming ? incomingBase : incomingBase.map(() => 0)
    const outgoing = showOutgoing ? outgoingBase : outgoingBase.map(() => 0)

    // Anxiety: more outgoing => higher.
    const outgoingSum = outgoing.reduce((a, b) => a + b, 0)
    const total = incoming.reduce((a, b) => a + b, 0) + outgoingSum
    const derived = total > 0 ? clamp(Math.round((outgoingSum / total) * 100), 8, 92) : 30

    return { incoming, outgoing, derived }
  }, [showIncoming, showOutgoing])

  // Slider tunes the meter relative to derived outgoing activity (no setState-in-effect).
  const anxietyLevel = useMemo(() => {
    const tuned = Math.round(chart.derived + (anxietyTune - 50) * 0.55)
    return clamp(tuned, 0, 100)
  }, [chart.derived, anxietyTune])

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()

    const max = Math.max(...chart.incoming, ...chart.outgoing, 1)
    const targets = chart.incoming.map((v, i) => {
      // Bar is incoming or outgoing depending on what you're currently showing.
      const v2 = v + chart.outgoing[i] * 0.65
      return v2 / max
    })

    barRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        height: `${Math.round(48 + targets[i] * 120)}px`,
        duration: 0.6,
        ease: 'power3.out',
      })
    })

    // Pulse the result count.
    if (valuePulseRef.current) {
      gsap.fromTo(
        valuePulseRef.current,
        { scale: 0.96, filter: 'blur(0px)' },
        { scale: 1.05, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' },
      )
    }
  }, [chart, reducedMotion])

  useEffect(() => {
    if (!meterRef.current) return

    const node = meterRef.current

    if (reducedMotion) {
      node.style.setProperty('--p', String(anxietyLevel))
      return
    }

    ensureGsapRegistered()

    const curStr = getComputedStyle(node).getPropertyValue('--p').trim()
    const current = Number(curStr || anxietyLevel) || anxietyLevel
    const obj = { v: current }

    gsap.to(obj, {
      v: anxietyLevel,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: () => {
        node.style.setProperty('--p', String(Math.round(obj.v)))
      },
    })
  }, [anxietyLevel, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        const input = document.getElementById('nyx-search') as HTMLInputElement | null
        input?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [reducedMotion])

  const statementRows = useMemo(() => filtered.slice(0, 6), [filtered])
  const safeActiveIndex =
    statementRows.length === 0
      ? 0
      : clamp(activeResultIndex, 0, statementRows.length - 1)

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]" data-reveal="true">
            GEMINI LIVE PLAYGROUND
          </div>
          <h2
            className="mt-2 text-[var(--color-midnight-ink)] font-bold tracking-[-0.04em] text-3xl sm:text-4xl"
            data-reveal="true"
          >
            Ask, filter, and let <span className="nyx-gradient-text">AI explain</span>
          </h2>
          <p className="mt-3 text-sm font-semibold text-[var(--color-muted-slate)] max-w-2xl" data-reveal="true">
            Search merchants, toggle cash flow, and watch Gemini-style insights update in real time.
            Press <span className="font-bold">Ctrl+K</span> to focus the AI search bar.
          </p>
        </div>

        <div
          className="rounded-[20px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-md-2)] p-4 w-full lg:w-[360px]"
          data-reveal="true"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[var(--color-soft-stone)]">AI CONFIDENCE</div>
              <div className="mt-1 text-sm font-bold text-[var(--color-midnight-ink)]">
                Gemini stress score
              </div>
            </div>
            <div
              ref={meterRef}
              className="h-[54px] w-[54px] rounded-full relative"
              style={
                {
                  background: 'conic-gradient(var(--color-active-blue) calc(var(--p) * 1%), rgba(215,219,233,1) 0)',
                  '--p': anxietyLevel,
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-[5px] rounded-full bg-white ring-1 ring-[rgba(55,83,144,0.14)] grid place-items-center">
                <span className="text-[12px] font-bold text-[var(--color-midnight-ink)]">
                  {anxietyLevel}
                </span>
              </div>
            </div>
          </div>

          <label className="mt-4 block text-xs font-semibold text-[var(--color-muted-slate)]">
            Slide to tune the vibe
            <input
              className="mt-2 w-full"
              type="range"
              min={0}
              max={100}
              value={anxietyTune}
              onChange={(e) => setAnxietyTune(Number(e.target.value))}
            />
          </label>

          <div className="mt-2 text-[11px] font-semibold text-[var(--color-soft-stone)]">
            Derived from outgoing activity (mock data).
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Controls */}
        <div
          className="lg:col-span-7 rounded-[20px] bg-white ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-md-2)] p-4"
          data-reveal="true"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <div className="relative flex-1">
              <input
                id="nyx-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a merchant (e.g. coffee)"
                className="w-full rounded-full border border-[rgba(120,141,186,0.5)] bg-[rgba(240,241,245,0.6)] px-5 py-3 text-sm font-semibold text-[var(--color-midnight-ink)] outline-none focus:ring-2 focus:ring-[rgba(69,154,248,0.35)]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[11px] font-bold text-[var(--color-soft-stone)]">
                <span className="hidden sm:inline">Ctrl</span>
                <span>K</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-bold ring-1 transition',
                  showIncoming
                    ? 'bg-[rgba(69,154,248,0.12)] ring-[rgba(69,154,248,0.35)] text-[var(--color-active-blue)]'
                    : 'bg-[var(--color-whisper-gray)] ring-[rgba(120,141,186,0.35)] text-[var(--color-muted-slate)] hover:bg-[rgba(240,241,245,0.9)]',
                )}
                onClick={() => setShowIncoming((v) => !v)}
              >
                Incoming
              </button>
              <button
                type="button"
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-bold ring-1 transition',
                  showOutgoing
                    ? 'bg-[rgba(69,154,248,0.12)] ring-[rgba(69,154,248,0.35)] text-[var(--color-active-blue)]'
                    : 'bg-[var(--color-whisper-gray)] ring-[rgba(120,141,186,0.35)] text-[var(--color-muted-slate)] hover:bg-[rgba(240,241,245,0.9)]',
                )}
                onClick={() => setShowOutgoing((v) => !v)}
              >
                Outgoing
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                ref={valuePulseRef}
                className="rounded-full bg-[rgba(69,154,248,0.12)] ring-1 ring-[rgba(69,154,248,0.35)] px-3 py-2 text-xs font-bold text-[var(--color-active-blue)]"
              >
                {filtered.length} result{filtered.length === 1 ? '' : 's'}
              </span>
              <span className="text-xs font-semibold text-[var(--color-soft-stone)]">
                Highlighted: {statementRows[safeActiveIndex]?.merchant ?? '—'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(120,141,186,0.35)] px-4 py-2 text-xs font-bold text-[var(--color-midnight-ink)] transition hover:bg-[rgba(240,241,245,0.9)]"
                onClick={() => {
                  if (statementRows.length === 0) return
                  setActiveResultIndex((i) =>
                    (i + 1) % statementRows.length,
                  )
                }}
              >
                Show next search item
              </button>
              <button
                type="button"
                className="rounded-full bg-[rgba(69,154,248,0.12)] ring-1 ring-[rgba(69,154,248,0.35)] px-4 py-2 text-xs font-bold text-[var(--color-active-blue)] transition hover:brightness-105"
                onClick={() => setStatementOpen(true)}
              >
                Download statement
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-4 rounded-[20px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.10)] p-4 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold text-[var(--color-soft-stone)]">CASH FLOW</div>
              <div className="text-xs font-bold text-[var(--color-muted-slate)]">
                Incoming {showIncoming ? 'on' : 'off'} • Outgoing {showOutgoing ? 'on' : 'off'}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2 items-end">
              {chart.incoming.map((_, i) => {
                const inc = chart.incoming[i]
                const out = chart.outgoing[i]
                const max = Math.max(...chart.incoming, ...chart.outgoing, 1)
                const h = Math.round(48 + ((inc + out * 0.65) / max) * 120)

                return (
                  <div key={i} className="relative h-[170px] flex items-end justify-center">
                    <div className="absolute bottom-0 w-full h-[1px] bg-[rgba(55,83,144,0.14)]" />
                    <div className="absolute bottom-0 w-full h-[6px] rounded-full bg-white/60 ring-1 ring-[rgba(55,83,144,0.12)]" />
                    <div
                      ref={(node) => {
                        barRefs.current[i] = node
                      }}
                      style={{ height: `${h}px` }}
                      className={cn(
                        'absolute bottom-0 w-[10px] rounded-full',
                        // Incoming bars pop more.
                        inc >= out
                          ? 'bg-[rgba(69,154,248,0.86)] shadow-[0px_12px_30px_rgba(69,154,248,0.18)]'
                          : 'bg-[rgba(69,154,248,0.46)] shadow-[0px_12px_30px_rgba(69,154,248,0.12)]',
                      )}
                    />
                  </div>
                )
              })}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[var(--color-soft-stone)]">
              <span>Last 7 days</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--color-active-blue)]" />
                pulse
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div
          className="lg:col-span-5 rounded-[20px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-md-2)] p-4"
          data-reveal="true"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-bold text-[var(--color-soft-stone)]">RESULTS</div>
            <div className="text-xs font-bold text-[var(--color-muted-slate)]">
              Tap to focus
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {filtered.length === 0 ? (
              <div className="rounded-[16px] bg-white/70 ring-1 ring-[rgba(55,83,144,0.12)] p-4 text-sm font-semibold text-[var(--color-muted-slate)]">
                No matches. Try another merchant.
              </div>
            ) : (
              statementRows.map((t, idx) => {
                const isActive = idx === safeActiveIndex
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setActiveResultIndex(idx)}
                    className={cn(
                      'w-full text-left rounded-[16px] bg-white/70 ring-1 ring-[rgba(55,83,144,0.10)] p-3 transition',
                      'hover:-translate-y-[1px]',
                      isActive ? 'ring-[rgba(69,154,248,0.5)] shadow-[0px_18px_45px_rgba(69,154,248,0.12)]' : '',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[var(--color-midnight-ink)] truncate">
                          {t.merchant}
                        </div>
                        <div className="mt-1 text-xs font-semibold text-[var(--color-soft-stone)] truncate">
                          {t.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={cn(
                            'text-sm font-extrabold tracking-[-0.04em]',
                            t.type === 'incoming' ? 'text-[var(--color-active-blue)]' : 'text-[var(--color-midnight-ink)] opacity-90',
                          )}
                        >
                          {formatINR(t.amount)}
                        </div>
                        <div className="text-[11px] font-semibold text-[var(--color-soft-stone)]">
                          {t.time}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>

          <div className="mt-4 rounded-[16px] bg-white/70 ring-1 ring-[rgba(55,83,144,0.12)] p-3">
            <div className="text-xs font-bold text-[var(--color-soft-stone)]">INSIGHT</div>
            <div className="mt-2 text-sm font-semibold text-[var(--color-midnight-ink)] leading-[1.35]">
              {filtered.length === 0
                ? 'Try searching a merchant to get calm, data-driven highlights.'
                : `Your query "${query}" surfaces ${filtered.length} moments. Switch filters to see the story flip.`}
            </div>
          </div>
        </div>
      </div>

      {statementOpen && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[rgba(15,22,45,0.35)] backdrop-blur-sm p-4">
          <div className="w-full max-w-[720px] rounded-[24px] bg-white ring-1 ring-[rgba(55,83,144,0.18)] shadow-[0px_30px_85px_rgba(32,41,76,0.25)] overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[rgba(55,83,144,0.12)]">
              <div>
                <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]">
                  STATEMENT
                </div>
                <div className="mt-1 text-sm font-bold text-[var(--color-midnight-ink)]">
                  Download your filtered summary
                </div>
              </div>
              <button
                type="button"
                className="rounded-full bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] w-10 h-10 grid place-items-center text-[var(--color-midnight-ink)] font-extrabold"
                onClick={() => setStatementOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-[20px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.10)] p-4">
                  <div className="text-xs font-bold text-[var(--color-soft-stone)]">WHAT YOU’LL GET</div>
                  <div className="mt-2 space-y-2 text-sm font-semibold text-[var(--color-midnight-ink)]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--color-active-blue)]" />
                      CSV of up to 6 matches
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[rgba(69,154,248,0.35)]" />
                      No network calls, demo-only
                    </div>
                  </div>
                </div>
                <div className="rounded-[20px] bg-white ring-1 ring-[rgba(55,83,144,0.12)] p-4">
                  <div className="text-xs font-bold text-[var(--color-soft-stone)]">PREVIEW</div>
                  <div className="mt-3 space-y-2">
                    {statementRows.length === 0 ? (
                      <div className="text-sm font-semibold text-[var(--color-muted-slate)]">
                        No rows to export.
                      </div>
                    ) : (
                      statementRows.map((r) => (
                        <div key={r.id} className="flex items-center justify-between gap-3">
                          <div className="text-sm font-bold text-[var(--color-midnight-ink)] truncate">
                            {r.merchant}
                          </div>
                          <div className="text-sm font-extrabold text-[var(--color-midnight-ink)]">
                            {formatINR(r.amount)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs font-semibold text-[var(--color-soft-stone)]">
                  Tip: Use <span className="font-bold">Ctrl</span>+<span className="font-bold">K</span> to jump to search.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full px-5 py-3 bg-white ring-1 ring-[rgba(55,83,144,0.32)] font-bold text-[var(--color-midnight-ink)] transition hover:bg-[rgba(240,241,245,0.9)]"
                    onClick={() => setStatementOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-full px-5 py-3 bg-[var(--color-active-blue)] font-bold text-white transition hover:brightness-105 active:brightness-95 shadow-[0px_12px_30px_rgba(69,154,248,0.25)]"
                    onClick={() => {
                      const csv = makeCSV(statementRows)
                      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `nyx-statement-${query.trim() || 'all'}.csv`
                      document.body.appendChild(a)
                      a.click()
                      a.remove()
                      URL.revokeObjectURL(url)
                      setStatementOpen(false)
                    }}
                  >
                    Download CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

