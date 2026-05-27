import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ensureGsapRegistered, gsap } from '../lib/gsapSetup'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import phoneOutlineImg from '../assets/nyx/phone-outline.png'
import SbiLogo from './SbiLogo'
import checkIcon from '../assets/icons/check.svg'
import closeIcon from '../assets/icons/close.svg'
import dashboardImg from '../assets/nyx/dashboard.png'

const THUMB_SIZE = 44
const TRACK_INSET = 4
const COMPLETE_THRESHOLD = 0.82
const DASHBOARD_WIDTH = 2280
const DASHBOARD_HEIGHT = 1694

export default function SwipeToPaySection() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLButtonElement>(null)
  const dragging = useRef(false)
  const [dragOffset, setDragOffset] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [maxDrag, setMaxDrag] = useState(0)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const offset = done ? maxDrag : (dragOffset ?? 0)

  const updateMaxDrag = useCallback(() => {
    if (!trackRef.current) return
    setMaxDrag(Math.max(0, trackRef.current.clientWidth - THUMB_SIZE - TRACK_INSET * 2))
  }, [])

  useEffect(() => {
    updateMaxDrag()
    window.addEventListener('resize', updateMaxDrag)
    return () => window.removeEventListener('resize', updateMaxDrag)
  }, [updateMaxDrag])

  useEffect(() => {
    if (reducedMotion) return
    ensureGsapRegistered()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  useEffect(() => {
    if (!isDashboardOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDashboardOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isDashboardOpen])

  const snapComplete = useCallback(() => {
    setDone(true)
    setDragOffset(maxDrag)
    if (thumbRef.current && !reducedMotion) {
      gsap.to(thumbRef.current, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 })
    }
  }, [maxDrag, reducedMotion])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (done) return
    dragging.current = true
    thumbRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || done || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - THUMB_SIZE / 2 - TRACK_INSET
    const clamped = Math.max(0, Math.min(maxDrag, x))
    setDragOffset(clamped)
    if (maxDrag > 0 && clamped / maxDrag >= COMPLETE_THRESHOLD) {
      dragging.current = false
      snapComplete()
    }
  }

  const handlePointerUp = () => {
    if (!dragging.current || done) return
    dragging.current = false
    if (maxDrag > 0 && offset / maxDrag >= COMPLETE_THRESHOLD) {
      snapComplete()
    } else {
      setDragOffset(null)
    }
  }

  const progress = maxDrag > 0 ? offset / maxDrag : 0
  const labelOpacity = done ? 0 : Math.max(0.35, 1 - progress * 1.4)

  return (
    <section
      ref={sectionRef}
      className="fold-section relative bg-[var(--color-canvas-white)] overflow-hidden"
    >
      <div className="fold-container">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
          <div className="order-1">
            <button
              type="button"
              className="fold-dashboard-preview mx-auto block max-w-[720px] rounded-[28px] bg-[var(--color-whisper-gray)] p-3 sm:p-4 ring-1 ring-[rgba(55,83,144,0.1)] shadow-[var(--shadow-xl)] overflow-hidden"
              onClick={() => setIsDashboardOpen(true)}
              aria-label="Open dashboard in full screen"
            >
              <img
                src={dashboardImg}
                alt="Nyx dashboard"
                className="w-full h-auto block rounded-[var(--radius-3xl)]"
                decoding="async"
              />
            </button>
          </div>

          <div className="order-2">
            <div className="relative mx-auto w-full max-w-[420px]">
              <img
                src={phoneOutlineImg}
                alt=""
                className="mx-auto w-full max-w-[380px] h-auto opacity-95"
              />

              <article className="fold-swipe-card absolute left-1/2 top-[10%] w-[88%] max-w-[308px] -translate-x-1/2">
            <div
              ref={trackRef}
              className="fold-swipe-track"
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-label="Swipe to pay with State Bank of India"
            >
              <div
                className="fold-swipe-progress"
                style={{ width: `${TRACK_INSET + offset + THUMB_SIZE / 2}px` }}
                aria-hidden
              />

              <span className="fold-swipe-label" style={{ opacity: labelOpacity }}>
                {done ? 'Paid' : 'Swipe to pay'}
              </span>

              <button
                ref={thumbRef}
                type="button"
                className="fold-swipe-thumb"
                style={{
                  transform: `translate3d(${TRACK_INSET + offset}px, -50%, 0)`,
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                disabled={done}
                aria-label={done ? 'Payment complete' : 'Drag right to confirm payment'}
              >
                {done ? (
                  <img
                    src={checkIcon}
                    alt=""
                    className="fold-swipe-thumb-check"
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <span className="fold-swipe-thumb-logo-wrap">
                    <SbiLogo size={30} className="fold-swipe-sbi-logo" />
                  </span>
                )}
              </button>
            </div>

            <div className="fold-swipe-card-body">
              <div className="fold-swipe-bank-row">
                <h3 className="fold-swipe-bank-name">State Bank of India</h3>
                <span className="fold-swipe-bank-logo-wrap shrink-0">
                  <SbiLogo size={26} className="fold-swipe-bank-logo" />
                </span>
              </div>
              <div className="fold-swipe-account-row">
                <span className="fold-swipe-account-label">Account number</span>
                <span className="fold-swipe-account-value">****6852</span>
              </div>
            </div>
          </article>
            </div>
          </div>
        </div>

        <p className="fold-body mt-12 max-w-[640px] mx-auto text-center">
          Nyx establishes connection to your banks through the Government regulated Account
          Aggregator Framework. OTP is required to connect bank accounts,{' '}
          <a href="#" className="fold-link" onClick={(e) => e.preventDefault()}>
            see the list of banks that support Nyx.
          </a>
        </p>
      </div>

      <div className="fold-grid-bg absolute inset-x-0 bottom-0 h-[45%] pointer-events-none" aria-hidden />

      {isDashboardOpen &&
        createPortal(
          <div
            className="fold-dashboard-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Nyx dashboard full screen preview"
          >
            <div className="fold-dashboard-modal-toolbar">
              <button
                type="button"
                className="fold-dashboard-close"
                onClick={() => setIsDashboardOpen(false)}
                aria-label="Close full screen dashboard"
              >
                <img src={closeIcon} alt="" className="fold-dashboard-close-icon" decoding="async" />
                Close
              </button>
            </div>
            <div className="fold-dashboard-modal-stage">
              <img
                src={dashboardImg}
                alt="Nyx dashboard full screen"
                className="fold-dashboard-modal-image"
                width={DASHBOARD_WIDTH}
                height={DASHBOARD_HEIGHT}
                decoding="async"
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
