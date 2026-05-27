import graffitiImg from '../assets/nyx/graffiti.png'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import StickerPeel from './StickerPeel'

const highlights = [
  'Connect all your bank accounts in minutes',
  'Track spending without manual entry',
  'See balances, bills, and trends in one place',
]

export default function PostHeroIntro() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="fold-section bg-[var(--color-canvas-white)]" data-reveal="true">
      <div className="fold-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-[680px] text-left">
            <p className="fold-caption">Built for clarity</p>

            <h2 className="mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-[1.15] tracking-[var(--tracking-heading)] text-[var(--color-midnight-ink)]">
              Know where your money goes — without the spreadsheet.
            </h2>

            <p className="fold-body mt-6 max-w-[620px]">
              Nyx connects to your bank accounts through India&apos;s Account Aggregator framework,
              so your finances stay updated automatically. No SMS scraping. No email parsing. Just a
              clear, honest view of your money.
            </p>

            <p className="fold-body mt-4 max-w-[620px]">
              From everyday spends to recurring bills and monthly trends, Nyx brings everything into
              one calm dashboard — so you can make better decisions and actually relax about money.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[var(--color-midnight-ink)] text-[15px] leading-[1.45]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-active-blue)]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="fold-intro-sticker-zone mx-auto w-full max-w-[440px]"
            aria-label="Drag the graffiti sticker — peel the corner to interact"
          >
            {reducedMotion ? (
              <img
                src={graffitiImg}
                alt=""
                className="mx-auto w-full max-w-[300px] sm:max-w-[340px] h-auto object-contain"
                decoding="async"
              />
            ) : (
              <StickerPeel
                imageSrc={graffitiImg}
                width={300}
                rotate={10}
                peelBackHoverPct={22}
                peelBackActivePct={40}
                shadowIntensity={0.55}
                lightingIntensity={0.1}
                peelDirection={0}
                initialPosition="center"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
