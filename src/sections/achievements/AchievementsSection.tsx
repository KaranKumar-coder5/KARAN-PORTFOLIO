import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { MOTION_EASE, sectionVariants, childVariants } from '@/lib/motion'
import { Section, Container, Badge } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

type Achievement = {
  icon: string
  title: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: '🏗',
    title: 'Full-Stack Builder',
    description: 'Built a full-stack Grocery Management System using React, Node.js, Express, MongoDB, and Mongoose.',
    rarity: 'rare',
  },
  {
    icon: '🌍',
    title: 'Social Impact',
    description: 'Designed SafeRoute, an AI-powered safety-first navigation concept supporting UN SDG 5.',
    rarity: 'rare',
  },
  {
    icon: '⚡',
    title: 'Portfolio Crafted',
    description: 'Designed and developed K\'CRAFT, an immersive Minecraft-inspired developer portfolio.',
    rarity: 'epic',
  },
  {
    icon: '💼',
    title: 'Java Intern',
    description: 'Completed a 3-week Full Stack Java Internship at MIST Solutions, Peelamedu, Coimbatore.',
    rarity: 'epic',
  },
  {
    icon: '🏆',
    title: 'Certified Developer',
    description: 'Earned HackerRank certifications in Java (Basic) and Data Structures (Basic).',
    rarity: 'legendary',
  },
]

const RARITY_CONFIG = {
  common: {
    color: 'default' as const,
    label: 'Common',
    border: 'border-stone-700/40',
    hoverBorder: 'hover:border-stone-600/50',
    hoverShadow: 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
    glow: '',
    iconBg: 'bg-stone-800/60',
  },
  rare: {
    color: 'diamond' as const,
    label: 'Rare',
    border: 'border-diamond-700/25',
    hoverBorder: 'hover:border-diamond-600/40',
    hoverShadow: 'hover:shadow-[0_4px_20px_rgba(74,237,217,0.06)]',
    glow: '',
    iconBg: 'bg-diamond-700/10',
  },
  epic: {
    color: 'gold' as const,
    label: 'Epic',
    border: 'border-gold-600/20',
    hoverBorder: 'hover:border-gold-500/35',
    hoverShadow: 'hover:shadow-[0_4px_24px_rgba(255,215,0,0.06)]',
    glow: '',
    iconBg: 'bg-gold-600/10',
  },
  legendary: {
    color: 'nether' as const,
    label: 'Legendary',
    border: 'border-nether-700/30',
    hoverBorder: 'hover:border-nether-500/40',
    hoverShadow: 'hover:shadow-[0_4px_28px_rgba(193,68,14,0.08)]',
    glow: 'absolute -inset-px rounded-lg bg-gradient-to-b from-nether-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100',
    iconBg: 'bg-nether-700/15',
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: MOTION_EASE },
  },
}

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const prefersReducedMotion = useReducedMotion()
  const config = RARITY_CONFIG[achievement.rarity]

  return (
    <motion.div
      className={`group relative flex flex-col items-center rounded-lg border p-6 text-center transition-all duration-300 ${config.border} ${config.hoverBorder} ${config.hoverShadow} bg-surface`}
      variants={prefersReducedMotion ? undefined : cardVariants}
      style={{
        boxShadow:
          'inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 0 rgba(255,255,255,0.02)',
      }}
    >
      {/* Legendary glow overlay */}
      {config.glow && <div aria-hidden="true" className={config.glow} />}

      {/* Icon */}
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg ${config.iconBg}`}
      >
        <span className="text-3xl" role="img" aria-label={achievement.title}>
          {achievement.icon}
        </span>
      </div>

      {/* Rarity badge */}
      <Badge variant={config.color} className="mb-3">
        {config.label}
      </Badge>

      {/* Title */}
      <h3 className="mb-2 font-display text-sm font-semibold tracking-[0.06em] text-text-primary">
        {achievement.title}
      </h3>

      {/* Description */}
      <p className="font-body text-xs leading-relaxed text-text-secondary">
        {achievement.description}
      </p>
    </motion.div>
  )
}

export function AchievementsSection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.achievements

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] py-[var(--spacing-section-y)]"
    >
      {/* Warm lantern glow — top center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 35% at 50% 25%, rgba(255,215,0,0.04) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(255,224,102,0.02) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      <Container size="wide" className="relative z-10">
        <motion.div
          variants={prefersReducedMotion ? undefined : sectionVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            className="mb-12 text-center"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-gold-500">
              {biome.label}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[0.08em] text-text-primary sm:text-4xl md:text-5xl">
              Achievements
            </h2>
            <p className="mt-4 font-body text-lg text-text-secondary">
              Unlocked milestones along the way.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            variants={prefersReducedMotion ? undefined : gridVariants}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.1 }}
          >
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementCard key={achievement.title} achievement={achievement} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
