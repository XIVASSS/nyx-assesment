import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'
import GeminiBadge from './GeminiBadge'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

type Message = { role: 'user' | 'ai'; text: string }

const script: Message[] = [
  { role: 'user', text: 'Why did my spending jump this week?' },
  {
    role: 'ai',
    text: 'Most of the increase came from food delivery — ₹2,840 across 6 orders. Swiggy alone is up 34% vs last week.',
  },
  { role: 'user', text: 'Can I afford a ₹15k trip next month?' },
  {
    role: 'ai',
    text: 'Yes, with a buffer. Your savings rate is 18%. I’d suggest capping dining out to ₹3k/week to stay comfortable.',
  },
]

export default function AiChatPanel({ className }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState<Message[]>([])

  const current = script[step]
  const messages = reducedMotion ? script : done

  useEffect(() => {
    if (reducedMotion || !current) return

    let cancelled = false
    const timers: number[] = []

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timers.push(id)
    }

    const advance = () => {
      setStep((s) => {
        const next = s < script.length - 1 ? s + 1 : 0
        if (next === 0) setDone([])
        return next
      })
      setTyped('')
    }

    if (current.role === 'user') {
      schedule(() => setTyped(current.text), 0)
      schedule(() => {
        setDone((d) => [...d, current])
        advance()
      }, 1500)
    } else {
      let i = 0
      const tick = () => {
        if (cancelled) return
        i += 1
        setTyped(current.text.slice(0, i))
        if (i < current.text.length) {
          schedule(tick, 16)
        } else {
          schedule(() => {
            setDone((d) => [...d, current])
            advance()
          }, 1800)
        }
      }
      schedule(tick, 0)
    }

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [step, current, reducedMotion])

  return (
    <div
      className={cn(
        'relative rounded-[28px] overflow-hidden',
        'bg-white/75 backdrop-blur-xl',
        'ring-1 ring-[rgba(66,133,244,0.22)]',
        'shadow-[0px_24px_60px_rgba(32,41,76,0.14)]',
        className,
      )}
    >
      <div className="absolute inset-0 nyx-gemini-mesh opacity-60 pointer-events-none" />

      <div className="relative p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-[10px] font-bold tracking-[0.06em] text-[var(--color-soft-stone)]">
              NYX AI COPILOT
            </div>
            <div className="text-sm font-bold text-[var(--color-midnight-ink)]">
              {reducedMotion ? 'Gemini insights' : 'Gemini is thinking…'}
            </div>
          </div>
          <GeminiBadge size="sm" />
        </div>

        <div className="space-y-3 min-h-[220px]">
          {messages.map((m, idx) => (
            <div
              key={`${idx}-${m.role}-${m.text.slice(0, 8)}`}
              className={cn(
                'max-w-[92%] rounded-[18px] px-3.5 py-2.5 text-sm font-semibold leading-[1.4]',
                m.role === 'user'
                  ? 'ml-auto bg-[var(--color-whisper-gray)] text-[var(--color-midnight-ink)] ring-1 ring-[rgba(55,83,144,0.12)]'
                  : 'mr-auto bg-white text-[var(--color-midnight-ink)] ring-1 ring-[rgba(66,133,244,0.2)] shadow-[0px_8px_20px_rgba(66,133,244,0.08)]',
              )}
            >
              {m.text}
            </div>
          ))}

          {!reducedMotion && typed && current && (
            <div
              className={cn(
                'max-w-[92%] rounded-[18px] px-3.5 py-2.5 text-sm font-semibold leading-[1.4]',
                current.role === 'user'
                  ? 'ml-auto bg-[var(--color-whisper-gray)] text-[var(--color-midnight-ink)]'
                  : 'mr-auto bg-white ring-1 ring-[rgba(66,133,244,0.25)] shadow-[0px_12px_28px_rgba(66,133,244,0.12)]',
              )}
            >
              {typed}
              {current.role === 'ai' && (
                <span className="inline-block w-[6px] h-[14px] ml-0.5 align-middle bg-[var(--color-gemini-blue)] animate-pulse rounded-sm" />
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-full bg-white/90 ring-1 ring-[rgba(66,133,244,0.2)] px-4 py-3">
          <span className="text-[var(--color-gemini-blue)] font-bold text-sm">✦</span>
          <span className="flex-1 text-sm font-semibold text-[var(--color-soft-stone)] truncate">
            Ask about budgets, merchants, goals…
          </span>
          <span className="rounded-full px-3 py-1.5 text-[11px] font-bold text-white nyx-gemini-btn">
            Send
          </span>
        </div>
      </div>
    </div>
  )
}
