import type { Variants } from 'framer-motion'

export const MOTION_EASE = [0.16, 1, 0.3, 1] as const

export const SPRING_CONFIG = {
  default: { stiffness: 300, damping: 30 },
  gentle: { stiffness: 120, damping: 20 },
  snappy: { stiffness: 500, damping: 35 },
  slow: { stiffness: 80, damping: 15 },
} as const

export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
} as const

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
} as const

export const defaultTransition = {
  duration: 0.3,
  ease: MOTION_EASE,
} as const

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: MOTION_EASE, staggerChildren: 0.08 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
}

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: MOTION_EASE },
  },
}

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: MOTION_EASE, staggerChildren: 0.06 },
  },
}
