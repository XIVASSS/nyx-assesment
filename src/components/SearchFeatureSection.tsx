import GlassSurface from './GlassSurface'
import { nyxGlass } from '../lib/glassPresets'

const filters = ['INCOMING', 'OUTGOING', 'TAGS', 'TODAY', 'THIS MONTH', 'THIS WEEK']

export default function SearchFeatureSection() {
  return (
    <section className="fold-section bg-[var(--color-canvas-white)]" data-reveal="true">
      <div className="fold-container max-w-[720px] text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.12)] text-[var(--color-active-blue)] text-xl mb-6">
          ⌕
        </div>

        <div className="relative mb-8">
          <h2 className="text-[clamp(1.75rem,5vw,var(--text-heading))] font-bold leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] text-[var(--color-midnight-ink)] relative z-0 pb-6">
            Search. Recall. Filter.
          </h2>
          <div className="relative z-10 -mt-4 mx-auto max-w-[480px]">
            <div className="flex items-center gap-3 rounded-full bg-[var(--color-midnight-ink)] px-5 py-3.5 shadow-[var(--shadow-xl)]">
              <span className="h-4 w-0.5 bg-[var(--color-active-blue)] rounded-full animate-pulse" aria-hidden />
              <span className="flex-1 text-left text-[var(--color-canvas-white)] font-semibold text-lg">
                Commute
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white text-sm">
                ↻
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <span key={f} className="fold-pill !bg-white !text-[11px] !font-bold !tracking-wide">
              {f}
            </span>
          ))}
        </div>

        <GlassSurface {...nyxGlass.card} className="max-w-[480px] mx-auto">
          <div className="w-full p-4 text-left">
            <div className="flex justify-between text-sm font-semibold text-[var(--color-soft-stone)]">
              <span>Metro</span>
              <span>12 Aug, 08:50 AM</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold text-[var(--color-midnight-ink)]">- ₹50</span>
              <span className="fold-pill !py-1.5 !px-3 text-xs font-bold">
                🚗 TRANSPORT
              </span>
            </div>
          </div>
        </GlassSurface>

        <p className="fold-body mt-10 max-w-[560px] mx-auto text-left sm:text-center">
          Just type in McDonald&apos;s for example and see all the times you have spent at
          McDonald&apos;s. Then type Gym Membership, realise there&apos;s no such transactions.
          Look yourself in the mirror, stop eating from McDonald&apos;s so much.
        </p>
      </div>
    </section>
  )
}
