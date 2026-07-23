import { useState, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { MOTION_EASE, sectionVariants, childVariants } from '@/lib/motion'
import { Section, Container, Badge } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

// ── Data ─────────────────────────────────────────────────────────────────────

type Skill = {
  name: string
  category: string
  variant: 'grass' | 'diamond' | 'gold' | 'nether' | 'default'
  description: string
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning'
}

const SKILLS: Skill[] = [
  { name: 'Languages', category: 'Languages', variant: 'grass', description: 'HTML, CSS, JavaScript, TypeScript.', level: 'Expert' },
  { name: 'Frontend', category: 'Frontend', variant: 'grass', description: 'React, Vite, Tailwind CSS, Framer Motion.', level: 'Expert' },
  { name: 'Backend', category: 'Backend', variant: 'diamond', description: 'Node.js, Express.js, REST APIs.', level: 'Advanced' },
  { name: 'Database', category: 'Database', variant: 'default', description: 'MongoDB, Mongoose. Schema design and queries.', level: 'Intermediate' },
  { name: 'Tools', category: 'Tools', variant: 'diamond', description: 'Git, GitHub, VS Code, Postman, Chrome DevTools.', level: 'Advanced' },
  { name: 'Design', category: 'Design', variant: 'nether', description: 'Figma, Responsive Design, UI/UX Fundamentals.', level: 'Advanced' },
  { name: 'AI Dev', category: 'AI Development', variant: 'nether', description: 'Prompt Engineering, AI-assisted Development, AI Workflow Design.', level: 'Intermediate' },
  { name: 'Mining', category: 'Currently Mining', variant: 'gold', description: 'Docker, AWS, Linux, Three.js. Currently learning.', level: 'Learning' },
]

// Grid: 3 cols × 3 rows = 9 slots. 8 filled, 1 empty.
const GRID_COLS = 3
const TOTAL_SLOTS = GRID_COLS * 3

// Pre-compute slot skills for performance
const SLOT_SKILLS: (Skill | undefined)[] = SKILLS.slice(0, TOTAL_SLOTS)

// ── Animation Variants ───────────────────────────────────────────────────────

const slotVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: MOTION_EASE },
  },
}

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
}

const detailVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: MOTION_EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
}

// ── Sub-components ───────────────────────────────────────────────────────────

function InventorySlotButton({
  skill,
  isSelected,
  onSelect,
  index,
}: {
  skill: Skill | undefined
  isSelected: boolean
  onSelect: (skill: Skill | undefined) => void
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const isEmpty = !skill

  return (
    <motion.button
      type="button"
      className={`
        group relative flex items-center justify-center
        aspect-square max-w-[80px] rounded-[var(--radius-block)]
        border transition-all duration-200
        ${isEmpty
          ? 'border-stone-800/80 bg-stone-900/60'
          : isSelected
            ? 'border-diamond-500/60 bg-stone-800/90 shadow-[0_0_12px_rgba(74,237,217,0.15)]'
            : 'border-stone-700/60 bg-stone-900/80 hover:border-stone-500/50 hover:bg-stone-800/70 hover:shadow-[0_0_8px_rgba(74,237,217,0.08)]'
        }
      `}
      style={{
        boxShadow: isEmpty
          ? 'inset 2px 2px 4px rgb(0 0 0 / 0.5), inset -1px -1px 0 rgb(255 255 255 / 0.03)'
          : isSelected
            ? 'inset 2px 2px 4px rgb(0 0 0 / 0.4), inset -1px -1px 0 rgb(255 255 255 / 0.06), 0 0 12px rgba(74,237,217,0.15)'
            : 'inset 2px 2px 4px rgb(0 0 0 / 0.5), inset -1px -1px 0 rgb(255 255 255 / 0.04)',
      }}
      variants={prefersReducedMotion ? undefined : slotVariants}
      onClick={() => onSelect(skill)}
      aria-label={skill ? `${skill.name} — ${skill.category}` : `Empty slot ${index + 1}`}
      aria-pressed={isSelected}
    >
      {skill && (
        <>
          {/* Skill icon/initial */}
          <span
            className="select-none font-display text-sm font-bold"
            style={{
              color: `var(--color-${skill.variant === 'default' ? 'stone' : skill.variant}-400)`,
              textShadow: `0 0 8px var(--color-${skill.variant === 'default' ? 'stone' : skill.variant}-500)`,
            }}
          >
            {skill.name.slice(0, 2)}
          </span>

          {/* Rarity pip */}
          <span
            aria-hidden="true"
            className="absolute bottom-0.5 right-0.5 block h-1 w-1 rounded-full"
            style={{
              backgroundColor: `var(--color-${skill.variant === 'default' ? 'stone' : skill.variant}-500)`,
              opacity: 0.6,
            }}
          />
        </>
      )}

      {/* Empty slot crosshair */}
      {isEmpty && (
        <span aria-hidden="true" className="block h-px w-3 bg-stone-700/30" />
      )}
    </motion.button>
  )
}

function DetailPanel({ skill }: { skill: Skill | null }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative min-h-[140px]">
      <AnimatePresence mode="wait">
        {skill ? (
          <motion.div
            key={skill.name}
            className="rounded-lg border border-stone-700/50 bg-stone-900/90 p-5"
            style={{
              boxShadow:
                'inset 2px 2px 4px rgb(0 0 0 / 0.3), inset -1px -1px 0 rgb(255 255 255 / 0.04), 0 4px 16px rgb(0 0 0 / 0.3)',
            }}
            variants={prefersReducedMotion ? undefined : detailVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Skill name */}
                <h3 className="font-display text-lg font-bold tracking-[0.06em] text-text-primary">
                  {skill.name}
                </h3>

                {/* Category + level */}
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge variant={skill.variant}>{skill.category}</Badge>
                  <span className="font-body text-xs text-text-muted">
                    {skill.level}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                  {skill.description}
                </p>
              </div>

              {/* Skill icon large */}
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md border border-stone-700/40 bg-stone-800/80"
                style={{
                  boxShadow: 'inset 1px 1px 3px rgb(0 0 0 / 0.4)',
                }}
              >
                <span
                  className="font-display text-xl font-bold"
                  style={{
                    color: `var(--color-${skill.variant === 'default' ? 'stone' : skill.variant}-400)`,
                    textShadow: `0 0 12px var(--color-${skill.variant === 'default' ? 'stone' : skill.variant}-500)`,
                  }}
                >
                  {skill.name.slice(0, 2)}
                </span>
              </div>
            </div>

            {/* Proficiency bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-text-muted">
                  Proficiency
                </span>
                <span className="font-body text-[10px] text-text-muted">
                  {skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '65%' : '40%'}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-800">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: `var(--color-${skill.variant === 'default' ? 'stone' : skill.variant}-500)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '65%' : '40%',
                  }}
                  transition={{ duration: 0.6, delay: 0.15, ease: MOTION_EASE }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-stone-800/60 bg-stone-900/40"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-body text-sm text-text-muted/50">
              Select a skill to inspect
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export function InventorySection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.inventory
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const handleSelect = useCallback((skill: Skill | undefined) => {
    setSelectedSkill((prev) => {
      if (!skill) return null
      return prev?.name === skill.name ? null : skill
    })
  }, [])

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] py-[var(--spacing-section-y)]"
    >
      {/* Deep Mines atmosphere — dark stone radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(42,42,42,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Faint diamond accent — cool highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 70% 35%, rgba(74,237,217,0.02) 0%, transparent 60%)',
        }}
      />

      <Container size="wide" className="relative z-10">
        <motion.div
          variants={prefersReducedMotion ? undefined : sectionVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section header */}
          <motion.div
            className="mb-10 max-w-2xl"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-diamond-500">
              {biome.label}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[0.08em] text-text-primary sm:text-4xl md:text-5xl">
              Inventory
            </h2>
            <p className="mt-4 font-body text-lg text-text-secondary">
              Tools and technologies I reach for when building. Select an item to inspect.
            </p>
          </motion.div>

          {/* Inventory frame */}
          <div
            className="rounded-lg border border-stone-700/50 bg-stone-900/50 p-4 sm:p-5"
            style={{
              boxShadow:
                'inset 2px 2px 6px rgb(0 0 0 / 0.4), inset -1px -1px 0 rgb(255 255 255 / 0.03)',
            }}
          >
            {/* Inventory title bar */}
            <div className="mb-4 flex items-center justify-between border-b border-stone-700/30 pb-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="block h-2 w-2 rounded-full bg-diamond-500"
                />
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  Skill Slots
                </span>
              </div>
              <span className="font-body text-[10px] text-text-muted/60">
                {SKILLS.length} / {TOTAL_SLOTS}
              </span>
            </div>

            {/* Inventory grid */}
            <motion.div
              className="grid grid-cols-3 justify-center gap-1.5 sm:gap-2"
              variants={prefersReducedMotion ? undefined : gridContainerVariants}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.05 }}
              role="group"
              aria-label="Skill inventory grid"
            >
              {SLOT_SKILLS.map((skill, i) => (
                <InventorySlotButton
                  key={i}
                  skill={skill}
                  isSelected={selectedSkill?.name === skill?.name}
                  onSelect={handleSelect}
                  index={i}
                />
              ))}
            </motion.div>

            {/* Detail panel */}
            <div className="mt-4">
              <DetailPanel skill={selectedSkill} />
            </div>
          </div>

          {/* Category legend */}
          <motion.div
            className="mt-6 flex flex-wrap gap-4"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            {[
              { label: 'Languages', variant: 'grass' as const },
              { label: 'Frontend', variant: 'grass' as const },
              { label: 'Backend', variant: 'diamond' as const },
              { label: 'Database', variant: 'default' as const },
              { label: 'Tools', variant: 'diamond' as const },
              { label: 'Design', variant: 'nether' as const },
              { label: 'AI Dev', variant: 'nether' as const },
              { label: 'Learning', variant: 'gold' as const },
            ].map((cat) => (
              <div key={cat.label} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: `var(--color-${cat.variant}-500)`,
                  }}
                />
                <span className="font-body text-[11px] text-text-muted">
                  {cat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
