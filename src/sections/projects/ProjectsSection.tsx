import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { MOTION_EASE, sectionVariants, childVariants } from '@/lib/motion'
import { Section, Container, Badge } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

type Project = {
  name: string
  description: string
  tags: { label: string; variant: 'grass' | 'diamond' | 'gold' | 'nether' | 'default' }[]
  link?: string
  repo?: string
  featured?: boolean
}

const PROJECTS: Project[] = [
  {
    name: "K' CRAFT",
    description:
      'Minecraft-inspired interactive developer portfolio designed as an immersive experience rather than a traditional portfolio. Built with React, TypeScript, Tailwind CSS, and Framer Motion while emphasizing storytelling, smooth animations, and modern UI engineering.',
    tags: [
      { label: 'React', variant: 'grass' },
      { label: 'TypeScript', variant: 'diamond' },
      { label: 'Tailwind CSS', variant: 'grass' },
      { label: 'Framer Motion', variant: 'nether' },
    ],
    link: '#',
    repo: '#',
    featured: true,
  },
  {
    name: 'SafeRoute',
    description:
      'AI-powered safety-first navigation platform that recommends safer travel routes by evaluating multiple safety indicators such as crime reports, street lighting, crowd density, CCTV coverage, emergency facilities, and community reports. Includes Safety Score generation, SOS alerts, live location sharing, and safe-place recommendations to support safer mobility.',
    tags: [
      { label: 'React', variant: 'grass' },
      { label: 'AI/ML', variant: 'nether' },
      { label: 'Maps API', variant: 'diamond' },
    ],
    link: '#',
    repo: '#',
  },
  {
    name: 'Grocery Management System',
    description:
      'Full-stack inventory management application featuring product management, stock tracking, shopping cart, order processing, and MongoDB-powered backend using Node.js and Express.',
    tags: [
      { label: 'React', variant: 'grass' },
      { label: 'Node.js', variant: 'grass' },
      { label: 'MongoDB', variant: 'default' },
    ],
    link: '#',
    repo: '#',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: MOTION_EASE },
  },
}

const featuredVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: MOTION_EASE },
  },
}

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

function ProjectCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion()
  const isFeatured = project.featured === true

  return (
    <motion.article
      className={`
        group relative flex flex-col rounded-lg border transition-all duration-300
        ${isFeatured
          ? 'col-span-full border-gold-600/25 bg-surface p-7 sm:p-8 hover:border-gold-500/40 hover:shadow-[0_0_30px_rgba(255,215,0,0.06)]'
          : 'border-stone-700/40 bg-surface p-6 hover:border-grass-700/50 hover:bg-surface-raised hover:shadow-[0_8px_24px_rgb(0,0,0,0.3)]'
        }
      `}
      style={{
        boxShadow: isFeatured
          ? 'inset 2px 2px 6px rgb(0 0 0 / 0.3), inset -1px -1px 0 rgb(255 255 255 / 0.04), 0 4px 20px rgb(0 0 0 / 0.25)'
          : 'inset 2px 2px 4px rgb(0 0 0 / 0.35), inset -1px -1px 0 rgb(255 255 255 / 0.03)',
      }}
      variants={prefersReducedMotion ? undefined : isFeatured ? featuredVariants : cardVariants}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="mb-4 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="block h-1.5 w-1.5 rounded-full bg-gold-500"
          />
          <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-500/80">
            Featured Project
          </span>
        </div>
      )}

      {/* Top row — name + links */}
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3
          className={`font-display font-semibold tracking-[0.06em] text-text-primary ${
            isFeatured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          {project.name}
        </h3>
        <div className="flex shrink-0 gap-1.5">
          {project.repo && (
            <a
              href={project.repo}
              className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-all duration-200 hover:bg-surface-raised hover:text-text-primary"
              aria-label={`${project.name} source code`}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-all duration-200 hover:bg-surface-raised hover:text-text-primary"
              aria-label={`${project.name} live demo`}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 11.5l7-7M11.5 4.5H6.5M11.5 4.5v5" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className={`mb-5 flex-1 font-body leading-relaxed text-text-secondary ${
          isFeatured ? 'text-base' : 'text-sm'
        }`}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag.label} variant={tag.variant}>
            {tag.label}
          </Badge>
        ))}
      </div>
    </motion.article>
  )
}

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.projects

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] py-[var(--spacing-section-y)]"
    >
      {/* Forge atmosphere — warm ember glow from above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 25%, rgba(255,215,0,0.02) 0%, transparent 65%)',
        }}
      />

      {/* Secondary warm depth — bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 50% 75%, rgba(193,68,14,0.015) 0%, transparent 60%)',
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
            className="mb-12 max-w-2xl"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-gold-500/80">
              {biome.label}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[0.08em] text-text-primary sm:text-4xl md:text-5xl">
              Projects
            </h2>
            <p className="mt-4 font-body text-lg text-text-secondary">
              Things I've built. Each one a lesson learned and a problem solved.
            </p>
          </motion.div>

          {/* Project grid */}
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
            variants={prefersReducedMotion ? undefined : gridVariants}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.1 }}
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
