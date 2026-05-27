import { useState } from 'react'
import nyxLogo from '../assets/nyx-logo.svg'
import menuIcon from '../assets/icons/menu.svg'
import closeIcon from '../assets/icons/close.svg'

const links = [
  { label: 'Team', href: '#' },
  { label: 'Manifesto', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Privacy', href: '#' },
]

export default function NyxNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <div className="relative w-full max-w-[52rem]">
        <nav
          className="flex h-11 items-center gap-2 rounded-full border border-[rgba(120,141,186,0.22)] bg-white/95 px-2 pl-3 shadow-[var(--shadow-md-2)] backdrop-blur-md sm:h-12 sm:px-3 sm:pl-4"
          aria-label="Main navigation"
        >
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(120,141,186,0.3)] text-[var(--color-midnight-ink)] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <img
              src={menuOpen ? closeIcon : menuIcon}
              alt=""
              className="h-4 w-4"
              decoding="async"
              draggable={false}
            />
          </button>

          <a
            href="#"
            className="flex shrink-0 items-center"
            onClick={(e) => e.preventDefault()}
            aria-label="Nyx home"
          >
            <img src={nyxLogo} alt="" className="h-5 w-auto sm:h-[22px]" />
          </a>

          <div className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--color-muted-slate)] transition-colors hover:text-[var(--color-midnight-ink)]"
                onClick={(e) => {
                  if (link.href === '#') e.preventDefault()
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#download"
            className="ml-auto shrink-0 rounded-full border border-[var(--color-deep-violet)] bg-[var(--color-active-blue)] px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:brightness-105 active:scale-[0.98] sm:px-4"
          >
            Get the app
          </a>
        </nav>

        {menuOpen && (
          <div
            className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-[rgba(120,141,186,0.2)] bg-white p-2 shadow-[var(--shadow-xl)] md:hidden"
            role="dialog"
            aria-label="Menu"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-muted-slate)] hover:bg-[var(--color-whisper-gray)] hover:text-[var(--color-midnight-ink)]"
                onClick={(e) => {
                  if (link.href === '#') e.preventDefault()
                  setMenuOpen(false)
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
