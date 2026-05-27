import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import { Draggable } from 'gsap/Draggable'
import { ensureGsapRegistered, gsap } from '../lib/gsapSetup'
import './StickerPeel.css'

type InitialPosition = 'center' | { x: number; y: number }

type StickerPeelProps = {
  imageSrc: string
  rotate?: number
  peelBackHoverPct?: number
  peelBackActivePct?: number
  peelEasing?: string
  peelHoverEasing?: string
  width?: number
  shadowIntensity?: number
  lightingIntensity?: number
  initialPosition?: InitialPosition
  peelDirection?: number
  className?: string
}

const defaultPadding = 10

function centerInBounds(target: HTMLElement, boundsEl: HTMLElement) {
  const maxX = Math.max(0, boundsEl.clientWidth - target.offsetWidth)
  const maxY = Math.max(0, boundsEl.clientHeight - target.offsetHeight)
  gsap.set(target, { x: maxX / 2, y: maxY / 2 })
}

export default function StickerPeel({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = 'power3.out',
  peelHoverEasing = 'power2.out',
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = 'center',
  peelDirection = 0,
  className = '',
}: StickerPeelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragTargetRef = useRef<HTMLDivElement>(null)
  const pointLightRef = useRef<SVGFEPointLightElement | null>(null)
  const pointLightFlippedRef = useRef<SVGFEPointLightElement | null>(null)
  const draggableInstanceRef = useRef<Draggable | null>(null)

  useEffect(() => {
    const target = dragTargetRef.current
    const boundsEl = target?.parentElement
    if (!target || !boundsEl) return

    if (initialPosition === 'center') {
      centerInBounds(target, boundsEl)
      return
    }

    gsap.set(target, { x: initialPosition.x, y: initialPosition.y })
  }, [initialPosition])

  useEffect(() => {
    ensureGsapRegistered()

    const target = dragTargetRef.current
    const boundsEl = target?.parentElement
    if (!target || !boundsEl) return

    draggableInstanceRef.current = Draggable.create(target, {
      type: 'x,y',
      bounds: boundsEl,
      inertia: true,
      onDrag() {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4)
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' })
      },
      onDragEnd() {
        gsap.to(target, { rotation: 0, duration: 0.8, ease: 'power2.out' })
      },
    })[0]

    const handleResize = () => {
      if (!draggableInstanceRef.current) return

      draggableInstanceRef.current.update()

      const currentX = gsap.getProperty(target, 'x') as number
      const currentY = gsap.getProperty(target, 'y') as number
      const maxX = Math.max(0, boundsEl.clientWidth - target.offsetWidth)
      const maxY = Math.max(0, boundsEl.clientHeight - target.offsetHeight)
      const newX = Math.max(0, Math.min(currentX, maxX))
      const newY = Math.max(0, Math.min(currentY, maxY))

      if (newX !== currentX || newY !== currentY) {
        gsap.to(target, { x: newX, y: newY, duration: 0.3, ease: 'power2.out' })
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      draggableInstanceRef.current?.kill()
    }
  }, [])

  useEffect(() => {
    const updateLight = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.set(pointLightRef.current, { attr: { x, y } })

      const normalizedAngle = Math.abs(peelDirection % 360)
      if (normalizedAngle !== 180) {
        gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } })
      } else {
        gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } })
      }
    }

    const container = containerRef.current
    if (!container) return

    container.addEventListener('mousemove', updateLight)
    return () => container.removeEventListener('mousemove', updateLight)
  }, [peelDirection])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = () => container.classList.add('touch-active')
    const handleTouchEnd = () => container.classList.remove('touch-active')

    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [])

  const cssVars = useMemo(
    () =>
      ({
        '--sticker-rotate': `${rotate}deg`,
        '--sticker-p': `${defaultPadding}px`,
        '--sticker-peelback-hover': `${peelBackHoverPct}%`,
        '--sticker-peelback-active': `${peelBackActivePct}%`,
        '--sticker-peel-easing': peelEasing,
        '--sticker-peel-hover-easing': peelHoverEasing,
        '--sticker-width': `${width}px`,
        '--sticker-shadow-opacity': shadowIntensity,
        '--sticker-lighting-constant': lightingIntensity,
        '--peel-direction': `${peelDirection}deg`,
      }) as CSSProperties,
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      width,
      shadowIntensity,
      lightingIntensity,
      peelDirection,
    ],
  )

  return (
    <div className={`draggable sticker-peel-root ${className}`.trim()} ref={dragTargetRef} style={cssVars}>
      <svg width="0" height="0" aria-hidden>
        <defs>
          <filter id="pointLight">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="pointLightFlipped">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="dropShadow">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>

          <filter id="expandAndFill">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            <img
              src={imageSrc}
              alt=""
              className="sticker-image"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <div className="flap">
          <div className="flap-lighting">
            <img
              src={imageSrc}
              alt=""
              className="flap-image"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
