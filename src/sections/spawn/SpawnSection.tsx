import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MOTION_EASE } from '@/lib/motion'
import { Section } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

/* ── Intro content ─────────────────────────────────────── */
const INTRO_TITLE = "K' CRAFT"
const INTRO_TAGLINE = 'Crafting Ideas. Mining Problems. Building Solutions.'

/* ── Hero content ──────────────────────────────────────── */
const HERO_TEXT = 'KaranCraft'
const HERO_SUBTITLE = 'A Developer Portfolio'

/* ═════════════════════════════════════════════════════════
   SPAWN SECTION (merged intro + hero)
   200vh sticky section with scroll-crossfade between
   intro title and hero content.
   ═════════════════════════════════════════════════════════ */
export function SpawnSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  /* ── Intro fades out: visible 0 → gone by 0.35 ────── */
  const introOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.35], [0, -48])
  const introFilter = useTransform(
    scrollYProgress,
    [0, 0.35],
    ['blur(0px)', 'blur(6px)'],
  )

  /* ── Hero fades in: hidden until 0.2, fully visible 0.5 ── */
  const heroOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const heroY = useTransform(scrollYProgress, [0.2, 0.5], [32, 0])
  const heroFilter = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    ['blur(6px)', 'blur(0px)'],
  )

  /* ── Scroll indicator: visible early, fades by 0.08 ── */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  const biome = BIOME_MAP.spawn

  return (
    <div ref={sectionRef}>
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden py-0"
      style={{ minHeight: '200dvh' }}
    >
      {/* ── Intro content (first viewport) ─────────────── */}
      <motion.div
        className="sticky top-0 flex h-dvh flex-col items-center justify-center px-[var(--spacing-section-x)]"
        style={{
          opacity: prefersReducedMotion ? 1 : introOpacity,
          y: prefersReducedMotion ? 0 : introY,
          filter: prefersReducedMotion ? 'none' : introFilter,
        }}
      >
        <motion.h1
          className="text-center font-display text-5xl font-bold tracking-[0.18em] text-white sm:text-6xl md:text-8xl lg:text-9xl"
          style={{
            textShadow:
              '0 2px 4px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.25), 0 0 120px rgba(255,200,100,0.2)',
          }}
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.5, ease: MOTION_EASE }}
        >
          {INTRO_TITLE}
        </motion.h1>

        <motion.p
          className="mt-5 max-w-md text-center font-body text-sm tracking-[0.12em] text-white/60 sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: MOTION_EASE }}
        >
          {INTRO_TAGLINE}
        </motion.p>
      </motion.div>

      {/* ── Hero content (second viewport) ─────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex h-dvh flex-col items-center px-[var(--spacing-section-x)]"
        style={{
          justifyContent: '42%',
          opacity: prefersReducedMotion ? 1 : heroOpacity,
          y: prefersReducedMotion ? 0 : heroY,
          filter: prefersReducedMotion ? 'none' : heroFilter,
        }}
      >
        <motion.h1
          className="text-center font-display text-4xl font-bold tracking-[0.15em] text-white sm:text-5xl md:text-7xl lg:text-8xl"
          style={{
            textShadow:
              '0 2px 4px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.25), 0 0 120px rgba(255,200,100,0.2)',
          }}
          initial={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: MOTION_EASE }}
        >
          {HERO_TEXT}
        </motion.h1>

        {/* Accent line */}
        <motion.div
          aria-hidden="true"
          className="mt-5 h-px w-12 bg-white/30"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: MOTION_EASE }}
        />

        <motion.p
          className="mt-5 text-center font-body text-lg text-white/70 sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: MOTION_EASE }}
        >
          {HERO_SUBTITLE}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: MOTION_EASE }}
          style={{ opacity: prefersReducedMotion ? 1 : indicatorOpacity }}
        >
          <motion.span
            aria-hidden="true"
            className="block text-white/50"
            animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 8l5 5 5-5" />
            </svg>
          </motion.span>
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/40">
            scroll
          </span>
        </motion.div>
      </motion.div>
    </Section>
    </div>
  )
}
