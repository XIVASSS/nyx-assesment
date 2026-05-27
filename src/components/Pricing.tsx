import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { ensureGsapRegistered, gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

type Billing = 'monthly' | 'yearly'

function priceFor(billing: Billing, monthly: number) {
  if (billing === 'monthly') return monthly
  // Yearly discount: 2 months free.
  return Math.round(monthly * 10)
}

export default function Pricing() {
  const reducedMotion = usePrefersReducedMotion()
  const [billing, setBilling] = useState<Billing>('yearly')
  const [toast, setToast] = useState<string | null>(null)

  const plans = useMemo(
    () => [
      {
        name: 'Starter',
        monthly: 0,
        highlight: false,
        desc: 'For exploring insights without commitment.',
        bullets: ['Basic cash flow overview', 'Search + recall', 'Privacy-first data handling'],
      },
      {
        name: 'Plus',
        monthly: 499,
        highlight: true,
        desc: 'Deeper trends with gentle guidance.',
        bullets: ['Advanced cash flow breakdown', 'Smart categorization', 'Priority insights + alerts'],
      },
      {
        name: 'Team',
        monthly: 1499,
        highlight: false,
        desc: 'For shared financial clarity.',
        bullets: ['Multi-account support', 'Custom dashboards', 'Exportable statements (CSV)'],
      },
    ],
    [],
  )

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()
    gsap.fromTo(
      '#nyx-pricing-cards',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
    )
  }, [billing, reducedMotion])

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]" data-reveal="true">
            PRICING
          </div>
          <h2 className="mt-2 text-[var(--color-midnight-ink)] font-bold tracking-[-0.04em] text-3xl sm:text-4xl" data-reveal="true">
            Calm insights, scaled to you
          </h2>
          <p className="mt-3 text-sm font-semibold text-[var(--color-muted-slate)] max-w-2xl" data-reveal="true">
            Toggle yearly for a cleaner price. No dark patterns—just transparency.
          </p>
        </div>

        <div className="flex items-center gap-2" data-reveal="true">
          <button
            type="button"
            className={cn(
              'rounded-full px-4 py-2 text-xs font-bold ring-1 transition',
              billing === 'monthly'
                ? 'bg-[rgba(69,154,248,0.12)] ring-[rgba(69,154,248,0.35)] text-[var(--color-active-blue)]'
                : 'bg-[var(--color-whisper-gray)] ring-[rgba(120,141,186,0.35)] text-[var(--color-muted-slate)] hover:bg-[rgba(240,241,245,0.9)]',
            )}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={cn(
              'rounded-full px-4 py-2 text-xs font-bold ring-1 transition',
              billing === 'yearly'
                ? 'bg-[rgba(69,154,248,0.12)] ring-[rgba(69,154,248,0.35)] text-[var(--color-active-blue)]'
                : 'bg-[var(--color-whisper-gray)] ring-[rgba(120,141,186,0.35)] text-[var(--color-muted-slate)] hover:bg-[rgba(240,241,245,0.9)]',
            )}
            onClick={() => setBilling('yearly')}
          >
            Yearly <span className="ml-1 text-[11px] text-[var(--color-active-blue)] font-extrabold">-16%</span>
          </button>
        </div>
      </div>

      <div id="nyx-pricing-cards" className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {plans.map((p) => {
          const price = priceFor(billing, p.monthly)
          const suffix = billing === 'monthly' ? '/mo' : '/yr'
          return (
            <div
              key={p.name}
              className={cn(
                'relative rounded-[24px] ring-1 shadow-[var(--shadow-md-2)] p-5 overflow-hidden',
                p.highlight
                  ? 'bg-white ring-[rgba(69,154,248,0.35)]'
                  : 'bg-[var(--color-whisper-gray)] ring-[rgba(55,83,144,0.14)]',
              )}
              data-reveal="true"
            >
              {p.highlight && (
                <div className="absolute top-4 right-4 rounded-full px-3 py-2 text-[11px] font-extrabold bg-[rgba(255,255,0,0.9)] text-[rgba(15,22,45,0.92)]">
                  Most popular
                </div>
              )}
              <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]">
                {p.name.toUpperCase()}
              </div>
              <div className="mt-3">
                <span className="text-[42px] leading-[1] font-bold tracking-[-0.04em] text-[var(--color-midnight-ink)]">
                  {price === 0 ? 'Free' : `₹${price}`}
                </span>
                {price === 0 ? null : (
                  <div className="text-sm font-bold text-[var(--color-muted-slate)] mt-1">
                    {suffix}
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm font-semibold text-[var(--color-muted-slate)]">
                {p.desc}
              </p>

              <ul className="mt-4 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-midnight-ink)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-active-blue)]" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={cn(
                  'mt-5 w-full rounded-full px-5 py-3 text-sm font-bold transition',
                  p.highlight
                    ? 'bg-[var(--color-active-blue)] text-white hover:brightness-105 active:brightness-95'
                    : 'bg-white ring-1 ring-[rgba(55,83,144,0.3)] text-[var(--color-midnight-ink)] hover:bg-[rgba(240,241,245,0.95)]',
                )}
                onClick={() => setToast(`Selected plan: ${p.name} (${billing}) — demo only`)}
              >
                Choose {p.name}
              </button>
            </div>
          )
        })}
      </div>

      {toast && (
        <div className="fixed left-1/2 bottom-6 -translate-x-1/2 z-[120] rounded-full bg-[rgba(15,22,45,0.86)] text-white px-5 py-3 shadow-[0px_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-[rgba(255,255,255,0.18)] text-sm font-semibold">
          {toast}
          <button className="ml-4 underline" onClick={() => setToast(null)} type="button">
            dismiss
          </button>
        </div>
      )}
    </div>
  )
}

