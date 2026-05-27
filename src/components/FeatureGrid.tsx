import { useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

type Feature = {
  title: string
  desc: string
  bullets: string[]
}

function Icon({ index }: { index: number }) {
  const stroke = 'var(--color-deep-violet)'
  const common = { fill: 'none', stroke, strokeWidth: 2, strokeLinecap: 'round' as const }
  switch (index) {
    case 0:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M20 7l-8 5-8-5" />
          <path {...common} d="M4 17l8-5 8 5" />
          <path {...common} d="M12 22V12" />
        </svg>
      )
    case 1:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M20 21V8" />
          <path {...common} d="M4 21V3" />
          <path {...common} d="M20 8l-8 4-8-4" />
          <path {...common} d="M12 12v9" />
        </svg>
      )
    case 2:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M12 7v5l3 2" />
        </svg>
      )
    case 3:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 12h16" />
          <path {...common} d="M7 7l-3 5 3 5" />
          <path {...common} d="M17 7l3 5-3 5" />
        </svg>
      )
    case 4:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 7h10v10H7z" />
          <path {...common} d="M7 7l-2-2" />
          <path {...common} d="M17 17l2 2" />
          <path {...common} d="M17 7l2-2" />
          <path {...common} d="M7 17l-2 2" />
        </svg>
      )
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
        </svg>
      )
  }
}

export default function FeatureGrid() {
  const reducedMotion = usePrefersReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  const features: Feature[] = useMemo(
    () => [
      {
        title: 'Ask in natural language',
        desc: 'Gemini understands questions like “Can I afford this?” or “Why is Swiggy up 40%?”',
        bullets: ['Plain English or Hinglish.', 'Context across accounts.', 'Instant answers.'],
      },
      {
        title: 'Smart search & recall',
        desc: 'Find every coffee spend, subscription, or merchant — then let AI summarize patterns.',
        bullets: ['Merchant memory.', 'Time filters.', 'One-click summaries.'],
      },
      {
        title: 'AI-written money stories',
        desc: 'Weekly narratives explain trends without drowning you in charts.',
        bullets: ['Human-readable.', 'Actionable next steps.', 'Calm tone.'],
      },
      {
        title: 'Predictive cash flow',
        desc: 'Gemini forecasts incoming vs outgoing so you see problems before they hit.',
        bullets: ['7-day pulse.', 'Bill reminders.', 'Savings nudges.'],
      },
      {
        title: 'Private & secure',
        desc: 'Bank-grade encryption. No email or SMS scraping — only regulated account data.',
        bullets: ['Encrypted at rest.', 'On-demand AI.', 'You stay in control.'],
      },
      {
        title: 'Goals & what-if plans',
        desc: 'Model trips, gadgets, or rent changes — AI shows impact on your runway.',
        bullets: ['Scenario planning.', 'Soft limits.', 'Gentle guardrails.'],
      },
    ],
    [],
  )

  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]">
            FEATURES
          </div>
          <h2 className="mt-2 text-[var(--color-midnight-ink)] font-bold tracking-[-0.04em] text-3xl sm:text-4xl">
            Built for <span className="nyx-gradient-text">AI-native</span> money decisions
          </h2>
        </div>
        <div className="hidden md:block text-sm font-semibold text-[var(--color-muted-slate)] max-w-[320px]">
          Hover for micro details. Click to expand. Motion is purposeful—not distracting.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, idx) => {
          const isOpen = open === idx
          return (
            <button
              key={f.title}
              type="button"
              data-reveal="true"
              onClick={() => setOpen((v) => (v === idx ? null : idx))}
              className={cn(
                'group text-left rounded-[20px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-md-2)] p-5 transition',
                'hover:-translate-y-[2px] hover:shadow-[0px_18px_45px_rgba(32,41,76,0.10)]',
              )}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/70 ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-subtle)]">
                  <Icon index={idx} />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--color-midnight-ink)]">
                    {f.title}
                  </div>
                  <p className="mt-2 text-sm leading-[1.5] text-[var(--color-muted-slate)]">
                    {f.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs font-bold text-[var(--color-soft-stone)]">
                  {isOpen ? 'Less detail' : 'Learn more'}
                </div>
                <div
                  className={cn(
                    'rounded-full h-9 w-9 grid place-items-center bg-white/70 ring-1 ring-[rgba(55,83,144,0.14)]',
                    'transition-transform duration-200',
                    isOpen ? 'rotate-45' : 'group-hover:rotate-[-5deg]',
                  )}
                >
                  <span className="text-[var(--color-active-blue)] font-extrabold">+</span>
                </div>
              </div>

              <div
                className={cn(
                  'mt-3 overflow-hidden transition-[max-height,opacity,transform] duration-500',
                  isOpen ? 'max-h-[220px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2',
                  reducedMotion ? 'transition-none' : '',
                )}
              >
                <ul className="space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="text-sm font-semibold text-[var(--color-midnight-ink)] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--color-active-blue)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

