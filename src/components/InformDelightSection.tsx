import { useState } from 'react'

const steps = [
  'Cash flow keeps spending in check.',
  'Gain deeper insights with powerful tools.',
  'Balance trends helps make better decisions',
]

export default function InformDelightSection() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className="fold-section bg-[var(--color-canvas-white)] overflow-hidden" data-reveal="true">
      <div className="fold-container">
        <div className="lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-[var(--color-active-blue)] via-[#5eb0ff] to-[#7ee787] mb-6 shadow-[var(--shadow-md)]">
              <span className="text-white text-lg font-bold">〜</span>
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,var(--text-heading))] font-bold leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--color-midnight-ink)]">
              Inform & Delight.
            </h2>
            <p className="fold-body mt-6 max-w-[480px]">
              Understand your financial health without drowning in numbers. Each nosedive, each
              swooping rise and each calm plateau gives real actionable insights. Take decisions,
              backed by Nyx.
            </p>
          </div>

          <div className="relative fold-grid-bg rounded-[var(--radius-3xl)] p-6 sm:p-8 min-h-[420px] flex items-center justify-center gap-6">
            <div className="relative w-[200px] sm:w-[220px] shrink-0 rounded-[32px] bg-[var(--color-midnight-ink)] p-3 shadow-[var(--shadow-xl)] ring-4 ring-[rgba(32,41,76,0.08)]">
              <div className="rounded-[24px] bg-[#1a2344] overflow-hidden">
                <div className="flex justify-between px-4 pt-3 text-[10px] text-white/70 font-semibold">
                  <span>9:41</span>
                  <span>●●●</span>
                </div>
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="text-xs font-bold text-white/50 mb-2">CHART TYPE</div>
                  <div className="flex gap-2">
                    {['📈', '📊', '〰'].map((icon, i) => (
                      <span
                        key={icon}
                        className={`grid h-8 w-8 place-items-center rounded-lg text-sm ${
                          i === 0 ? 'bg-white/15' : 'bg-white/5'
                        }`}
                      >
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-3 space-y-3">
                  <div className="text-xs font-bold text-white/50">VARIABLES</div>
                  {['Incoming', 'Outgoing', 'Invested'].map((label) => (
                    <div key={label} className="flex items-center justify-between text-sm text-white/90 font-semibold">
                      <span>{label}</span>
                      <span className="h-5 w-9 rounded-full bg-white/20 relative">
                        <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                      </span>
                    </div>
                  ))}
                </div>
                <p className="px-4 pb-4 text-[9px] leading-snug text-white/40">
                  Transactions with the category Investment are counted as invested amount.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col gap-4 min-w-[140px]">
              {steps.map((step, i) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`flex items-start gap-3 text-left transition ${
                    activeStep === i ? 'opacity-100' : 'opacity-45'
                  }`}
                >
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      activeStep === i
                        ? 'bg-[var(--color-active-blue)] ring-4 ring-[rgba(69,154,248,0.25)]'
                        : 'bg-[var(--color-ash-gray)]'
                    }`}
                  />
                  <span
                    className={`text-sm leading-snug ${
                      activeStep === i
                        ? 'font-bold text-[var(--color-midnight-ink)]'
                        : 'font-medium text-[var(--color-muted-slate)]'
                    }`}
                  >
                    {step}
                  </span>
                </button>
              ))}
              <button type="button" className="fold-pill mt-2 w-fit text-xs">
                Pause
              </button>
            </div>
          </div>

          <ul className="sm:hidden mt-8 space-y-3">
            {steps.map((b, i) => (
              <li key={b} className="flex items-center gap-3 text-[15px] font-semibold text-[var(--color-midnight-ink)]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    activeStep === i ? 'bg-[var(--color-active-blue)]' : 'bg-[var(--color-ash-gray)]'
                  }`}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
