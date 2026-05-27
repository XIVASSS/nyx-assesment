import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

let didRegister = false

export function ensureGsapRegistered() {
  if (didRegister) return
  gsap.registerPlugin(ScrollTrigger, Draggable)
  didRegister = true
}

export { gsap, ScrollTrigger, Draggable }

