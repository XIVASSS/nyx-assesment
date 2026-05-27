import bento1 from '../assets/nyx/bento-1.png'
import bento2 from '../assets/nyx/bento-2.png'
import bento3 from '../assets/nyx/bento-3.png'
import coinImg from '../assets/nyx/coin-image.png'

const links = [
  'Manifesto',
  'Careers',
  'Blog',
  'Discord',
  'Wall of love',
  'Twitter',
  'Instagram',
  'LinkedIn',
  'Help Center',
  'Legal',
  'Privacy Policy',
  'Terms of Service',
]

export default function NyxBentoEnding() {
  return (
    <footer id="download" className="fold-section bg-[var(--color-canvas-white)] pb-16 pt-8 md:pt-12 overflow-visible" data-reveal="true">
      <div className="fold-container">
        <div className="fold-bento-grid">
          <div className="fold-bento-card fold-bento-card--media fold-bento-card--leftTop relative overflow-hidden p-0">
            <img
              src={bento2}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top"
              decoding="async"
              loading="lazy"
            />
          </div>

          <div className="fold-bento-card fold-bento-card--media fold-bento-card--leftBottom relative overflow-hidden p-0">
            <img
              src={bento1}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              decoding="async"
              loading="lazy"
            />
          </div>

          <div className="fold-bento-card fold-bento-card--privacy flex flex-col justify-end p-5 md:p-6">
            <div className="fold-bento-coin-slot" aria-hidden>
              <img src={coinImg} alt="" className="fold-bento-coin" decoding="async" loading="lazy" />
            </div>
            <div className="fold-bento-privacy-footer flex items-center gap-2 relative z-[1]">
              <span className="text-xl" aria-hidden>
                👁
              </span>
              <a
                href="#"
                className="text-[var(--color-active-blue)] font-bold text-sm leading-snug hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Our approach to Privacy.
              </a>
            </div>
          </div>

          <div className="fold-bento-card fold-bento-card--links p-6">
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              {links.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-sm font-semibold text-[var(--color-active-blue)] hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="fold-bento-card fold-bento-card--meta overflow-hidden p-0 flex flex-col">
            <div className="fold-bento-meta-photo">
              <img
                src={bento3}
                alt=""
                className="h-full w-full object-cover object-top"
                decoding="async"
                loading="lazy"
              />
            </div>
            <div className="fold-bento-meta-body p-6">
              <p className="text-sm font-medium text-[var(--color-muted-slate)]">
                © {new Date().getFullYear()} Nyx Labs Inc.
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted-slate)]">
                Reach out at{' '}
                <a href="mailto:hello@nyx.app" className="fold-link">
                  hello@nyx.app
                </a>
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-slate)]">
                Built for the assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
