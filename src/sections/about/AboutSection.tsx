import { type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { MOTION_EASE, sectionVariants } from '@/lib/motion'
import { Section, Container, Badge } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

// ── Content ──────────────────────────────────────────────────────────────────

const BIOGRAPHY = [
  "I'm a full-stack developer who believes the best interfaces feel alive. My work lives at the intersection of engineering precision and creative expression — where clean code meets meaningful experiences.",
  "I started with a single HTML file and a curiosity that hasn't slowed down since. Today, I build production applications, interactive experiences, and tools that solve real problems.",
]

const PHILOSOPHY =
  "Software should be crafted, not assembled. Every component earns its place. Every interaction tells a story. I obsess over the details that most people never notice — because that's where quality lives."

const STRENGTHS: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: 'Problem Solver',
    description: 'I break complex challenges into elegant, maintainable solutions.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Creative Builder',
    description: 'I turn abstract ideas into polished, interactive realities.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M3 7h14M7 7v10" />
      </svg>
    ),
  },
  {
    title: 'Continuous Learner',
    description: 'I stay curious. New tools, new patterns, new ways to think.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10c3-5 6-5 8 0s5 5 8 0" />
        <path d="M2 14c3-5 6-5 8 0s5 5 8 0" />
      </svg>
    ),
  },
]

const IDENTITY_FACTS: { label: string; value: string }[] = [
  { label: 'Based in', value: 'India' },
  { label: 'Focus', value: 'Full-Stack & Creative Dev' },
  { label: 'Tools', value: 'React, TypeScript, Node.js' },
  { label: 'Superpower', value: 'Turning caffeine into code' },
]

const SKILL_TAGS = [
  { label: 'React', variant: 'grass' as const },
  { label: 'TypeScript', variant: 'diamond' as const },
  { label: 'Node.js', variant: 'grass' as const },
  { label: 'MongoDB', variant: 'default' as const },
  { label: 'Figma', variant: 'gold' as const },
  { label: 'Framer Motion', variant: 'nether' as const },
  { label: 'Tailwind CSS', variant: 'grass' as const },
]

// ── Animation Variants ───────────────────────────────────────────────────────

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: MOTION_EASE, staggerChildren: 0.08 },
  },
}

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: MOTION_EASE, delay: 0.15, staggerChildren: 0.08 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: MOTION_EASE },
  },
}

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: MOTION_EASE },
  },
}

const tagListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

// ── Sub-components ───────────────────────────────────────────────────────────

function IdentityCard({ label, value }: { label: string; value: string }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="group rounded-lg border border-border-subtle bg-surface p-4 transition-all duration-300 hover:border-gold-600/40 hover:bg-surface-raised hover:shadow-md"
      variants={prefersReducedMotion ? undefined : cardVariants}
    >
      <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-gold-500/70">
        {label}
      </span>
      <span className="mt-1 block font-body text-sm font-medium text-text-primary">
        {value}
      </span>
    </motion.div>
  )
}

function StrengthCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: ReactNode
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="group rounded-lg border border-border-subtle bg-surface p-5 transition-all duration-300 hover:border-grass-700/60 hover:bg-surface-raised hover:shadow-md"
      variants={prefersReducedMotion ? undefined : cardVariants}
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-grass-700/40 bg-grass-900/30 text-grass-400 transition-colors duration-300 group-hover:border-grass-600/60 group-hover:bg-grass-900/50 group-hover:text-grass-300">
        {icon}
      </div>
      <h3 className="font-display text-sm font-semibold tracking-[0.04em] text-text-primary">
        {title}
      </h3>
      <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </motion.div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.about

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] py-[var(--spacing-section-y)]"
    >
      {/* Warm sunlight radial — top-left, like sun filtering through leaves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 25% 35%, rgba(255,224,102,0.025) 0%, transparent 65%)',
        }}
      />

      {/* Secondary grass accent — bottom-right depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 75% 65%, rgba(93,140,62,0.03) 0%, transparent 60%)',
        }}
      />

      <Container size="wide" className="relative z-10">
        <motion.div
          className="grid gap-10 lg:grid-cols-[55fr_45fr] lg:items-start lg:gap-14"
          variants={prefersReducedMotion ? undefined : sectionVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* ─── Left Column — Identity ─────────────────────────────────── */}
          <motion.div
            className="flex flex-col"
            variants={prefersReducedMotion ? undefined : leftVariants}
          >
            {/* Biome label */}
            <motion.p
              className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-gold-500/80"
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              {biome.label}
            </motion.p>

            {/* Section title */}
            <motion.h2
              className="font-display text-3xl font-bold tracking-[0.08em] text-text-primary sm:text-4xl md:text-5xl"
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              About
            </motion.h2>

            {/* Name & role */}
            <motion.div
              className="mt-4"
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              <p className="font-display text-lg font-semibold text-text-primary">
                Karan
              </p>
              <p className="mt-0.5 font-body text-sm text-text-muted">
                Full-Stack Developer & Creative Builder
              </p>
            </motion.div>

            {/* Accent divider */}
            <motion.div
              aria-hidden="true"
              className="mt-6 h-px w-16"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-gold-500), transparent)',
              }}
              variants={prefersReducedMotion ? undefined : cardVariants}
            />

            {/* Biography */}
            <motion.div
              className="mt-6 flex flex-col gap-4"
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              {BIOGRAPHY.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-body text-base leading-[1.75] text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Philosophy */}
            <motion.div
              className="mt-6 rounded-md border-l-2 border-gold-500/30 bg-surface/50 py-3 pl-4 pr-3"
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              <p className="font-body text-sm italic leading-relaxed text-text-secondary/80">
                {PHILOSOPHY}
              </p>
            </motion.div>

            {/* Skill tags */}
            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              variants={prefersReducedMotion ? undefined : tagListVariants}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
            >
              {SKILL_TAGS.map((tag) => (
                <motion.div key={tag.label} variants={tagVariants}>
                  <Badge variant={tag.variant}>{tag.label}</Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right Column — Cards ───────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-8"
            variants={prefersReducedMotion ? undefined : rightVariants}
          >
            {/* Identity facts */}
            <div>
              <motion.h3
                className="mb-4 font-display text-xs uppercase tracking-[0.18em] text-text-muted"
                variants={prefersReducedMotion ? undefined : cardVariants}
              >
                Identity
              </motion.h3>
              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={prefersReducedMotion ? undefined : cardVariants}
              >
                {IDENTITY_FACTS.map((fact) => (
                  <IdentityCard key={fact.label} {...fact} />
                ))}
              </motion.div>
            </div>

            {/* Strengths */}
            <div>
              <motion.h3
                className="mb-4 font-display text-xs uppercase tracking-[0.18em] text-text-muted"
                variants={prefersReducedMotion ? undefined : cardVariants}
              >
                Strengths
              </motion.h3>
              <div className="flex flex-col gap-3">
                {STRENGTHS.map((strength) => (
                  <StrengthCard key={strength.title} {...strength} />
                ))}
              </div>
            </div>

            {/* Crafting philosophy */}
            <motion.div
              className="rounded-lg border border-border-subtle bg-surface p-5"
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              <h3 className="font-display text-xs uppercase tracking-[0.18em] text-text-muted">
                Crafting Philosophy
              </h3>
              <div className="mt-3 flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 block h-2 w-2 flex-shrink-0 rounded-full bg-grass-500"
                />
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  Build for the person who uses it. Optimize for clarity, not cleverness.
                  Leave the code better than you found it.
                </p>
              </div>
              <div className="mt-3 flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                />
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  Great software is invisible. Users should feel helped, not impressed.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
