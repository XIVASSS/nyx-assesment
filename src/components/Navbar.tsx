import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import GeminiBadge from './GeminiBadge'

type NavId = 'features' | 'demo' | 'pricing' | 'faq'

export default function Navbar({ onNav }: { onNav: (id: NavId) => void }) {
  const items: Array<{ id: NavId; label: string }> = useMemo(
    () => [
      { id: 'features', label: 'Features' },
      { id: 'demo', label: 'Live demo' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'faq', label: 'FAQ' },
    ],
    [],
  )

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        scrolled
          ? 'bg-white/70 backdrop-blur border-b border-[rgba(55,83,144,0.14)] shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className="group inline-flex items-center gap-3 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(69,154,248,0.35)]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Go to top"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-full nyx-gemini-icon shadow-[0px_6px_16px_rgba(66,133,244,0.3)] overflow-hidden">
              <span className="relative font-bold text-white tracking-[-0.04em] text-sm">
                n
              </span>
            </span>
            <span className="hidden sm:inline text-[var(--color-midnight-ink)] font-semibold tracking-[-0.04em]">
              nyx
            </span>
            <span className="hidden lg:inline">
              <GeminiBadge size="sm" />
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.id}
                type="button"
                className="rounded-full px-3 py-2 text-[var(--color-muted-slate)] text-sm font-semibold transition hover:text-[var(--color-midnight-ink)] hover:bg-[rgba(69,154,248,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(69,154,248,0.35)]"
                onClick={() => onNav(it.id)}
              >
                {it.label}
              </button>
            ))}
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-white font-semibold text-sm transition hover:brightness-110 active:scale-[0.98] nyx-gemini-btn"
              onClick={() => onNav('demo')}
            >
              <span>✦</span> Ask AI
            </button>
          </nav>

          <button
            type="button"
            className="md:hidden rounded-full p-2 bg-[var(--color-whisper-gray)] ring-1 ring-[rgba(55,83,144,0.14)] shadow-[var(--shadow-sm)] transition hover:brightness-101 active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(69,154,248,0.35)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="block w-5 h-[2px] bg-[var(--color-midnight-ink)] rounded-full transition-transform duration-200" />
            <span
              className={cn(
                'block w-5 h-[2px] bg-[var(--color-midnight-ink)] rounded-full mt-1 transition-opacity duration-200',
                open ? 'opacity-0' : 'opacity-100',
              )}
            />
            <span
              className={cn(
                'block w-5 h-[2px] bg-[var(--color-midnight-ink)] rounded-full mt-1 transition-transform duration-200',
                open ? 'rotate-45 translate-y-[-5px]' : 'rotate-0 translate-y-0',
              )}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[rgba(55,83,144,0.14)] bg-white/85 backdrop-blur">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 flex flex-col gap-2">
            {items.map((it) => (
              <button
                key={it.id}
                type="button"
                className="rounded-xl px-4 py-3 text-left text-[var(--color-midnight-ink)] font-semibold transition hover:bg-[rgba(69,154,248,0.08)]"
                onClick={() => {
                  setOpen(false)
                  onNav(it.id)
                }}
              >
                {it.label}
              </button>
            ))}
            <button
              type="button"
              className="rounded-xl px-4 py-3 bg-[var(--color-active-blue)] text-white font-semibold transition hover:brightness-105 active:brightness-95"
              onClick={() => {
                setOpen(false)
                onNav('demo')
              }}
            >
              Try it now
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

