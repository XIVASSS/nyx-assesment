import { useEffect, useRef } from 'react'
import { ensureGsapRegistered, gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import phoneOutlineImg from '../assets/nyx/phone-outline.png'

export default function BankConnectSection() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="fold-section relative bg-[var(--color-canvas-white)] overflow-hidden"
    >
      <div className="fold-container max-w-[720px] text-center">
        <div className="relative mx-auto w-full max-w-[380px]">
          <img
            src={phoneOutlineImg}
            alt=""
            className="mx-auto w-full max-w-[320px] h-auto opacity-90"
          />

          <div
            ref={cardRef}
            className="fold-card absolute left-1/2 top-[18%] w-[88%] max-w-[340px] -translate-x-1/2 !rounded-[var(--radius-2xl-2)] !p-0 overflow-hidden ring-1 ring-[rgba(55,83,144,0.1)]"
          >
            <div className="flex items-center justify-between bg-[#e8f5e9] px-4 py-3">
              <div className="h-8 w-8 rounded-full bg-white ring-1 ring-[rgba(55,83,144,0.1)] grid place-items-center text-xs font-bold">
                A
              </div>
              <div className="flex items-center gap-2 text-[var(--color-soft-stone)]">
                <span className="text-xs font-semibold">Slide to connect</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-sm">
                  ⎋
                </span>
              </div>
            </div>
            <div className="px-5 py-6 text-left">
              <div className="text-[22px] font-bold text-[var(--color-midnight-ink)]">
                ICICI Bank
              </div>
              <div className="mt-4 text-[10px] font-bold tracking-[0.08em] text-[var(--color-soft-stone)]">
                ACCOUNT NUMBER
              </div>
              <div className="text-[15px] font-bold text-[var(--color-midnight-ink)]">
                A***2586
              </div>
            </div>
            <div className="absolute -bottom-2 left-4 right-4 h-4 rounded-full bg-[rgba(32,41,76,0.06)] blur-md" aria-hidden />
          </div>
        </div>

        <p className="fold-body mt-12 max-w-[560px] mx-auto">
          Nyx establishes connection to your banks through the Government regulated Account
          Aggregator Framework. OTP is required to connect bank accounts,{' '}
          <a href="#" className="fold-link">
            see the list of banks that support Nyx.
          </a>
        </p>
      </div>

      <div className="fold-grid-bg absolute inset-x-0 bottom-0 h-[45%] pointer-events-none" aria-hidden />
    </section>
  )
}
