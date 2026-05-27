import GeminiBadge from './GeminiBadge'

const caps = [
  {
    title: 'Natural language queries',
    desc: 'Ask in plain English — or Hinglish. Gemini understands context across your accounts.',
    tag: 'Multimodal',
  },
  {
    title: 'Proactive insights',
    desc: 'Weekly digests, anomaly alerts, and gentle nudges before you overspend.',
    tag: 'Always on',
  },
  {
    title: 'Private by design',
    desc: 'Insights are generated on-demand. Your data stays encrypted and never sold.',
    tag: 'Secure',
  },
  {
    title: 'Actionable plans',
    desc: 'Turn “Can I afford this?” into clear yes/no guidance with suggested limits.',
    tag: 'Goals',
  },
]

export default function AiCapabilities() {
  return (
    <section className="relative" data-reveal="true">
      <div className="rounded-[28px] overflow-hidden ring-1 ring-[rgba(66,133,244,0.18)] bg-white shadow-[var(--shadow-xl)]">
        <div className="relative px-6 py-8 sm:px-10 sm:py-10 nyx-gemini-mesh">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold tracking-[0.06em] text-[var(--color-soft-stone)]">
                GEMINI INTELLIGENCE
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-[var(--color-midnight-ink)]">
                Finance that <span className="nyx-gradient-text">talks back</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm font-semibold text-[var(--color-muted-slate)] leading-[1.5]">
                Nyx is an AI-native money OS. Gemini reads your cash flow, categories, and habits —
                then explains what matters in seconds.
              </p>
            </div>
            <GeminiBadge />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caps.map((c) => (
              <div
                key={c.title}
                className="rounded-[20px] bg-white/85 backdrop-blur-sm ring-1 ring-[rgba(55,83,144,0.12)] p-5 transition hover:-translate-y-0.5 hover:shadow-[0px_16px_40px_rgba(66,133,244,0.1)]"
              >
                <span className="inline-block rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.04em] text-[var(--color-gemini-blue)] bg-[rgba(66,133,244,0.1)] ring-1 ring-[rgba(66,133,244,0.2)]">
                  {c.tag}
                </span>
                <div className="mt-3 text-sm font-bold text-[var(--color-midnight-ink)]">
                  {c.title}
                </div>
                <p className="mt-2 text-sm font-semibold text-[var(--color-muted-slate)] leading-[1.45]">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
