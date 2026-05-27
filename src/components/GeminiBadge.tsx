import { cn } from '../lib/cn'

type Size = 'sm' | 'md'

export default function GeminiBadge({
  className,
  size = 'md',
}: {
  className?: string
  size?: Size
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-bold ring-1',
        'bg-white/80 backdrop-blur-md',
        'ring-[rgba(66,133,244,0.25)]',
        'shadow-[0px_8px_24px_rgba(66,133,244,0.12)]',
        size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-[11px]',
        className,
      )}
    >
      <span
        className={cn(
          'grid place-items-center rounded-full nyx-gemini-icon',
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'}>
          <path
            fill="white"
            d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 15.6 6.4 19.6l2.1-6.8L3 8.8h6.8L12 2z"
          />
        </svg>
      </span>
      <span className="text-[var(--color-midnight-ink)] tracking-[0.02em]">
        Powered by <span className="nyx-gradient-text">Gemini</span>
      </span>
    </span>
  )
}
