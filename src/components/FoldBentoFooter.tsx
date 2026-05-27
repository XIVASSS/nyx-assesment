function QrLarge() {
  return (
    <div className="mx-auto grid grid-cols-7 grid-rows-7 gap-1 p-3 bg-white rounded-lg max-w-[140px]">
      {Array.from({ length: 49 }).map((_, i) => (
        <span
          key={i}
          className={`block aspect-square rounded-[1px] ${
            i % 3 === 0 || i % 7 === 0 || i < 8 || i > 40 ? 'bg-white' : 'bg-[var(--color-midnight-ink)]'
          }`}
        />
      ))}
    </div>
  )
}

export default function FoldBentoFooter() {
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

  return (
    <footer id="download" className="fold-section bg-[var(--color-canvas-white)] pb-16">
      <div className="fold-container">
        <div className="fold-bento-grid">
          <div className="fold-bento-card fold-bento-card--blue flex flex-col items-center justify-center p-8 min-h-[220px]">
            <div className="flex gap-2 mb-4 text-white/80 text-xs font-bold">
              <span></span>
              <span>▶</span>
            </div>
            <QrLarge />
            <p className="mt-4 text-white font-bold text-lg">Scan & Download</p>
          </div>

          <div className="fold-bento-card fold-bento-card--team relative min-h-[220px] overflow-hidden p-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-graphite)] to-[var(--color-ash-gray)]" />
            <div className="absolute inset-0 flex items-end p-4">
              <span className="fold-pill !bg-white !shadow-[var(--shadow-md)]">
                Team →
              </span>
            </div>
          </div>

          <div className="fold-bento-card fold-bento-card--privacy flex flex-col justify-between p-6 min-h-[280px] md:min-h-[460px]">
            <svg
              viewBox="0 0 120 200"
              className="w-16 h-28 text-[var(--color-deep-violet)] opacity-40 mx-auto rotate-12"
              aria-hidden
            >
              <circle cx="60" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
              <rect x="54" y="44" width="12" height="140" rx="4" fill="currentColor" opacity="0.5" />
            </svg>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xl" aria-hidden>
                👁
              </span>
              <span className="text-[var(--color-active-blue)] font-bold text-sm leading-snug">
                Our approach to Privacy.
              </span>
            </div>
          </div>

          <div className="fold-bento-card fold-bento-card--links p-6 min-h-[220px]">
            <nav className="flex flex-col gap-2.5">
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm font-semibold text-[var(--color-active-blue)] hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  {l}
                </a>
              ))}
            </nav>
          </div>

          <div className="fold-bento-card fold-bento-card--meta p-6 flex flex-col justify-center min-h-[120px]">
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
    </footer>
  )
}
