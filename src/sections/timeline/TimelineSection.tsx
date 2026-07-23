import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { MOTION_EASE, sectionVariants, childVariants } from '@/lib/motion'
import { Section, Container } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

type Milestone = {
  date: string
  title: string
  description: string
  side: 'left' | 'right'
}

const MILESTONES: Milestone[] = [
  {
    date: '2020',
    title: 'First Line of Code',
    description:
      'Started learning HTML, CSS, and JavaScript. Built a static portfolio page and never looked back.',
    side: 'left',
  },
  {
    date: '2021',
    title: 'Discovered React',
    description:
      'Fell in love with component-based architecture. Built my first SPA and learned state management.',
    side: 'right',
  },
  {
    date: '2022',
    title: 'Full-Stack Shift',
    description:
      'Expanded into Node.js and MongoDB. Built backend APIs and learned database design.',
    side: 'left',
  },
  {
    date: '2023',
    title: 'Creative Development',
    description:
      'Explored creative coding and animation. Started building experiences, not just interfaces.',
    side: 'right',
  },
  {
    date: '2024',
    title: 'Internship & Certifications',
    description:
      'Completed a 3-week Full Stack Java Internship at MIST Solutions. Earned HackerRank certifications in Java and Data Structures.',
    side: 'left',
  },
  {
    date: '2024',
    title: 'Building Real Projects',
    description:
      'Built the Grocery Management System, designed SafeRoute for social impact, and crafted this portfolio.',
    side: 'right',
  },
]

const itemVariants: Variants = {
  hidden: (side: 'left' | 'right') => ({
    opacity: 0,
    x: side === 'left' ? -28 : 28,
    filter: 'blur(4px)',
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: MOTION_EASE },
  },
}

function TimelineItem({
  milestone,
  index,
}: {
  milestone: Milestone
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const isRight = milestone.side === 'right'
  const isLast = index === MILESTONES.length - 1

  return (
    <motion.div
      className="relative grid items-start gap-6 md:grid-cols-[1fr_40px_1fr] md:gap-8"
      custom={milestone.side}
      variants={prefersReducedMotion ? undefined : itemVariants}
    >
      {/* Left content */}
      <div className={isRight ? 'md:order-1' : 'md:order-1 md:text-right'}>
        {!isRight && <MilestoneCard milestone={milestone} isLast={isLast} />}
      </div>

      {/* Center node */}
      <div className="relative z-10 mx-auto flex flex-col items-center md:order-2 md:mx-0">
        {/* Node dot with glow */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(circle, rgba(93,140,62,0.3) 0%, transparent 70%)',
            }}
          />
          <div className="relative h-3 w-3 rounded-full border-2 border-grass-400 bg-background transition-colors duration-300" />
        </div>
        {/* Connector — gradient fade */}
        {!isLast && (
          <div
            aria-hidden="true"
            className="hidden h-full w-px md:block"
            style={{
              background:
                'linear-gradient(to bottom, rgba(93,140,62,0.3) 0%, rgba(93,140,62,0.15) 50%, rgba(93,140,62,0.3) 100%)',
            }}
          />
        )}
      </div>

      {/* Right content */}
      <div className={isRight ? 'md:order-3' : 'md:order-3'}>
        {isRight && <MilestoneCard milestone={milestone} isLast={isLast} />}
      </div>
    </motion.div>
  )
}

function MilestoneCard({
  milestone,
  isLast,
}: {
  milestone: Milestone
  isLast: boolean
}) {
  return (
    <div
      className={`rounded-lg border p-5 transition-all duration-300 sm:p-6 ${
        isLast
          ? 'border-grass-700/40 bg-surface hover:border-grass-600/50 hover:shadow-[0_4px_20px_rgba(93,140,62,0.08)]'
          : 'border-stone-700/40 bg-surface hover:border-grass-700/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
      }`}
      style={{
        boxShadow:
          'inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 0 rgba(255,255,255,0.02)',
      }}
    >
      <span
        className={`mb-2.5 inline-block rounded-full px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.2em] ${
          isLast
            ? 'bg-grass-500/10 text-grass-400'
            : 'bg-stone-800 text-grass-500'
        }`}
      >
        {milestone.date}
      </span>
      <h3 className="mb-2.5 font-display text-base font-semibold tracking-[0.06em] text-text-primary sm:text-lg">
        {milestone.title}
      </h3>
      <p className="font-body text-sm leading-relaxed text-text-secondary">
        {milestone.description}
      </p>
    </div>
  )
}

export function TimelineSection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.timeline

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] py-[var(--spacing-section-y)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(93,140,62,0.04) 0%, transparent 70%)',
        }}
      />

      <Container size="default" className="relative z-10 max-w-4xl">
        <motion.div
          variants={prefersReducedMotion ? undefined : sectionVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-grass-500">
              {biome.label}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[0.08em] text-text-primary sm:text-4xl md:text-5xl">
              Timeline
            </h2>
            <p className="mt-4 font-body text-lg text-text-secondary">
              A path through the forest. Each stop a milestone.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-6 md:gap-10">
            {/* Vertical line — gradient connector */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(93,140,62,0.2) 10%, rgba(93,140,62,0.15) 90%, transparent 100%)',
              }}
            />

            {MILESTONES.map((milestone, index) => (
              <TimelineItem
                key={milestone.date}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
