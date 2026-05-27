import { useEffect, useRef } from 'react'
import { ensureGsapRegistered, gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

import phoneFullImg from '../assets/nyx/phone-with-full-view.png'
import geminiImg from '../assets/nyx/gemini.png'

export default function FoldHero() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()

    const ctx = gsap.context(() => {
      gsap.from('.fold-hero-headline > *', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      })

      if (sectionRef.current && stageRef.current && phoneRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            pin: stageRef.current,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        tl.to(phoneRef.current, { y: 18, scale: 0.985, duration: 1, ease: 'power2.inOut' }, 0)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="fold-hero fold-paper relative overflow-x-hidden">
      <div className="fold-hero-glow pointer-events-none" aria-hidden />

      <div className="fold-container relative z-10 pt-4 sm:pt-6">
        <div className="fold-hero-gemini-wrap" aria-hidden>
          <span className="fold-hero-gemini-label">Powered by</span>
          <img
            src={geminiImg}
            alt="Gemini"
            className="fold-hero-gemini-mark"
            width={240}
            height={80}
            decoding="async"
          />
        </div>

        <div className="fold-hero-headline mx-auto max-w-[760px] text-center pb-8 sm:pb-12">
          <h1 className="fold-display fold-hero-title relative">
            <span
              className="absolute -top-6 left-1/2 -translate-x-[calc(50%+4.5rem)] sm:-translate-x-[calc(50%+6rem)] text-[1.5rem] sm:text-[2rem] leading-none"
              aria-hidden
            >
              😜
            </span>
            personal finance in our hand you realax
          </h1>

          <p className="fold-body fold-hero-copy mx-auto mt-5 max-w-[980px]">
            Nyx securely connects to your bank accounts and gives a clear picture of your
            finances. So you can make better decisions and lead a healthier financial life.
          </p>
        </div>

        <div className="fold-hero-scroll-zone">
          <div ref={stageRef} className="fold-hero-stage">
            <div className="fold-hero-visual">
              <img
                ref={phoneRef}
                src={phoneFullImg}
                alt="Nyx app on phone"
                className={`fold-hero-phone mx-auto w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-auto object-contain ${
                  reducedMotion ? 'relative z-10' : ''
                }`}
              />
            </div>
          </div>
        </div>

        <div className="pb-16 sm:pb-20" aria-hidden />
      </div>
    </section>
  )
}
