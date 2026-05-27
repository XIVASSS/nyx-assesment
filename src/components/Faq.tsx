import { useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

const faqs = [
  {
    q: 'Do I need to manually record expenses?',
    a: 'No. nyx is designed to automatically pull your transactions from connected accounts and categorize them for you (demo content here).',
  },
  {
    q: 'Is this privacy-first?',
    a: 'Yes—built with a privacy-first approach. This landing page focuses on experience design with no tracking in this demo.',
  },
  {
    q: 'Can I export statements?',
    a: 'Absolutely. The live demo includes a “Download CSV” statement export (mock data).',
  },
  {
    q: 'Will animations hurt usability?',
    a: 'They’re purposeful and respect reduced-motion settings. Hover effects and micro-interactions are lightweight.',
  },
]

export default function Faq() {
  const reducedMotion = usePrefersReducedMotion()
  const [open, setOpen] = useState<number>(0)

  const items = useMemo(() => faqs, [])

  return (
    <div>
      <div data-reveal="true">
        <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]">FAQ</div>
        <h2 className="mt-2 text-[var(--color-midnight-ink)] font-bold tracking-[-0.04em] text-3xl sm:text-4xl">
          Questions, answered with calm
        </h2>
      </div>

      <div className="mt-6 space-y-2">
        {items.map((item, idx) => {
          const isOpen = open === idx
          return (
            <button
              key={item.q}
              type="button"
              onClick={() => setOpen((v) => (v === idx ? -1 : idx))}
              className={cn(
                'w-full text-left rounded-[20px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-md-2)] p-5 transition hover:-translate-y-[1px]',
              )}
              data-reveal="true"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-[var(--color-midnight-ink)]">
                    {item.q}
                  </div>
                  <div
                    className={cn(
                      'mt-3 overflow-hidden transition-[max-height,opacity,transform] duration-500',
                      isOpen ? 'max-h-[160px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2',
                      reducedMotion ? 'transition-none' : '',
                    )}
                  >
                    <p className="text-sm font-semibold text-[var(--color-muted-slate)] leading-[1.5]">
                      {item.a}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'rounded-full w-10 h-10 grid place-items-center bg-white/70 ring-1 ring-[rgba(55,83,144,0.14)] transition-transform duration-200',
                    isOpen ? 'rotate-45' : 'group-hover:rotate-[-5deg]',
                  )}
                  aria-hidden="true"
                >
                  <span className="text-[var(--color-active-blue)] font-extrabold">+</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

