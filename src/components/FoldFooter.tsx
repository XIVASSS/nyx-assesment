export default function FoldFooter() {
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
    <footer className="bg-[var(--color-midnight-ink)] text-[var(--color-canvas-white)] py-16 sm:py-20">
      <div className="fold-container max-w-[900px] text-center">
        <h2
          className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium leading-[1.2]"
          style={{ fontFamily: 'var(--font-gt-america)' }}
        >
          Our Goal
          <br />
          To separate anxiety from money.
        </h2>
        <p className="fold-body mt-6 !text-[rgba(255,255,255,0.7)] max-w-[560px] mx-auto">
          Tom & Jerry, Jim & Pam, Chai & Biscuit are examples of desirable pairs. An example of
          undesirable pair is money & anxiety. What can software and good design do to decimate
          the pair?
        </p>
        <a
          href="#"
          className="fold-link inline-block mt-8 font-bold"
          onClick={(e) => e.preventDefault()}
        >
          Read our manifesto
        </a>

        <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.12)]">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] font-semibold text-[rgba(255,255,255,0.65)] hover:text-white transition"
                onClick={(e) => e.preventDefault()}
              >
                {l}
              </a>
            ))}
          </div>
          <p className="mt-10 text-[12px] text-[rgba(255,255,255,0.45)] font-medium">
            © {new Date().getFullYear()} Nyx. Built for the assessment.
          </p>
        </div>
      </div>
    </footer>
  )
}
