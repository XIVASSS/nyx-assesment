const transactions = [
  { merchant: 'Swiggy', time: 'Today, 6:31 PM', amount: '- ₹398', tag: 'FOOD & DRINKS', icon: '📍' },
  { merchant: "McDonald's", time: 'Yesterday, 2:15 PM', amount: '- ₹249', tag: 'FOOD & DRINKS', icon: '🍔' },
  { merchant: 'Myntra', time: '12 Aug, 4:20 PM', amount: '- ₹1,299', tag: 'SHOPPING', icon: '👕' },
]

export default function ExpenseFeatureSection() {
  return (
    <section className="fold-section bg-[var(--color-canvas-white)]" data-reveal="true">
      <div className="fold-container">
        <div className="lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
            <div className="absolute inset-0 rounded-[var(--radius-2xl-2)] bg-[var(--color-whisper-gray)] scale-95 translate-y-4 opacity-60" aria-hidden />
            <div className="relative space-y-3">
              {transactions.map((tx, i) => (
                <div
                  key={tx.merchant}
                  className="fold-card !rounded-[var(--radius-2xl-2)] !p-4 !shadow-[var(--shadow-md)]"
                  style={{ transform: `translateY(${i * 4}px)` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-[var(--color-midnight-ink)]">{tx.merchant}</span>
                    <span className="text-xs font-semibold text-[var(--color-soft-stone)] shrink-0">
                      {tx.time}
                    </span>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="text-xl font-bold text-[var(--color-midnight-ink)]">{tx.amount}</span>
                    <span className="fold-pill !py-1 !px-2.5 text-[10px] font-bold tracking-wide">
                      <span aria-hidden>{tx.icon}</span> {tx.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-left mt-12 lg:mt-0">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-[var(--color-active-blue)] to-[#6eb5ff] text-white text-xl shadow-[var(--shadow-md)] mb-6">
              ▤
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,var(--text-heading))] font-bold leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--color-midnight-ink)]">
              Stop recording expenses manually.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {['No Email scraping', 'No SMS scraping'].map((t) => (
                <span key={t} className="fold-pill px-4 py-2 text-sm">
                  <span aria-hidden>🙈</span> {t}
                </span>
              ))}
            </div>
            <p className="fold-body mt-6 max-w-[520px]">
              It&apos;s easy to forget, fall off the wagon, and miss. It&apos;s hard to be diligent
              with expense tracking when you have to do it manually. Nyx automatically pulls your
              expenses from your bank accounts and categorises them. So you can relax and focus on
              things that are more important than tracking expenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
