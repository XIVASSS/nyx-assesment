export default function Footer() {
  const linkGroups: Array<{ title: string; links: string[] }> = [
    { title: 'Product', links: ['Features', 'Demo', 'Pricing', 'Security'] },
    { title: 'Company', links: ['Manifesto', 'Careers', 'Blog', 'Wall of love'] },
    { title: 'Help', links: ['Help Center', 'Legal', 'Privacy', 'Terms'] },
  ]

  return (
    <footer className="mt-[var(--section-gap)] border-t border-[rgba(55,83,144,0.14)] bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="text-xs font-bold tracking-[0.04em] text-[var(--color-soft-stone)]">
              NYX
            </div>
            <div className="mt-2 text-[var(--color-midnight-ink)] font-bold tracking-[-0.04em] text-2xl">
              AI finance, <span className="nyx-gradient-text">powered by Gemini</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-[var(--color-muted-slate)]">
              Nyx is your AI-native money copilot — calm clarity for every transaction.
            </div>
          </div>

          {linkGroups.map((g) => (
            <div key={g.title} className="md:col-span-1">
              <div className="text-sm font-bold text-[var(--color-midnight-ink)]">
                {g.title}
              </div>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm font-semibold text-[var(--color-muted-slate)] hover:text-[var(--color-midnight-ink)] transition"
                      onClick={(e) => e.preventDefault()}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs font-semibold text-[var(--color-soft-stone)]">
            © {new Date().getFullYear()} Nyx. Built for the assessment.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="rounded-full px-4 py-2 text-xs font-bold bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] hover:bg-[rgba(240,241,245,0.9)] transition"
              onClick={(e) => e.preventDefault()}
            >
              Privacy
            </a>
            <a
              href="#"
              className="rounded-full px-4 py-2 text-xs font-bold bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] hover:bg-[rgba(240,241,245,0.9)] transition"
              onClick={(e) => e.preventDefault()}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

