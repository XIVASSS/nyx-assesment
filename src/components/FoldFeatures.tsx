import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { cn } from '../lib/cn'
import { useState } from 'react'

const sections = [
  {
    title: 'Stop recording expenses\nmanually.',
    body: "It's easy to forget, fall off the wagon, and miss. Nyx automatically pulls your expenses from your bank accounts and categorises them. So you can relax and focus on things that are more important than tracking expenses.",
    tags: ['No Email scraping', 'No SMS scraping'],
  },
  {
    title: 'Search. Recall\nFilter',
    body: "Just type in McDonald's for example and see all the times you have spent at McDonald's. Then type Gym Membership, realise there's no such transactions.",
    highlight: 'Coffee',
  },
  {
    title: 'Inform &\nDelight.',
    body: 'Understand your financial health without drowning in numbers. Each nosedive, each swooping rise and each calm plateau gives real actionable insights.',
    bullets: [
      'Cash flow keeps spending in check.',
      'Gain deeper insights with powerful tools.',
      'Balance trends helps make better decisions',
    ],
  },
]

export default function FoldFeatures() {
  const [open, setOpen] = useState<number | null>(0)
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="fold-section bg-[var(--color-canvas-white)]">
      <div className="fold-container max-w-[900px]">
        {sections.map((s, i) => (
          <article
            key={i}
            className="border-t border-[rgba(55,83,144,0.12)] py-14 first:border-t-0 first:pt-0"
            data-reveal="true"
          >
            <h2 className="text-[clamp(1.75rem,5vw,var(--text-heading))] font-bold leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--color-midnight-ink)] whitespace-pre-line text-left">
              {s.title}
            </h2>
            {s.tags && (
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="fold-pill px-4 py-2 text-sm font-semibold text-[var(--color-muted-slate)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <p className="fold-body mt-6 max-w-[640px] text-left">
              {s.body}
            </p>
            {s.highlight && (
              <div className="mt-8 rounded-[20px] bg-[var(--color-whisper-gray)] p-6 ring-1 ring-[rgba(55,83,144,0.1)]">
                <div className="text-sm font-bold text-[var(--color-soft-stone)]">Show Next Search Item</div>
                <div className="mt-3 text-2xl font-bold text-[var(--color-midnight-ink)]">{s.highlight}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Incoming', 'Outgoing', 'Tags', 'Today', 'This month'].map((f) => (
                    <span key={f} className="fold-pill px-3 py-1.5 text-xs font-bold text-[var(--color-midnight-ink)]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {s.bullets && (
              <ul className="mt-8 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] font-semibold text-[var(--color-midnight-ink)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-active-blue)]" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="mt-6 text-sm font-bold text-[var(--color-active-blue)]"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {open === i ? 'Show less' : 'Learn more'}
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-500',
                open === i ? 'max-h-[120px] opacity-100 mt-4' : 'max-h-0 opacity-0',
                reducedMotion && 'transition-none',
              )}
            >
              <p className="text-sm text-[var(--color-muted-slate)]">
                Built with the same calm, data-rich principles — tailored for Indian bank accounts.
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
