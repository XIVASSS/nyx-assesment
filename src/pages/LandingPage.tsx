import { useEffect } from 'react'
import { ensureGsapRegistered, gsap, ScrollTrigger } from '../lib/gsapSetup'
import NyxNav from '../components/NyxNav'
import FoldHero from '../components/FoldHero'
import PostHeroIntro from '../components/PostHeroIntro'
import SwipeToPaySection from '../components/SwipeToPaySection'
import NyxBentoEnding from '../components/NyxBentoEnding'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

export default function LandingPage() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    document.title = 'Nyx — Manage your money with clarity'
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()

    const ctx = gsap.context(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="true"]'))
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div className="min-h-screen bg-[var(--color-canvas-white)] text-[var(--color-midnight-ink)]">
      <NyxNav />
      <main className="pt-[68px] sm:pt-[72px]">
        <FoldHero />
        <PostHeroIntro />
        <SwipeToPaySection />
      </main>
      <NyxBentoEnding />
    </div>
  )
}
