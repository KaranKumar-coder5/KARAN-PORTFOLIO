import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { MOTION_EASE, sectionVariants, childVariants } from '@/lib/motion'
import { Section, Container, Badge } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

type Certificate = {
  name: string
  issuer: string
  date: string
  category: 'frontend' | 'backend' | 'cloud' | 'general'
}

const CERTIFICATES: Certificate[] = [
  {
    name: 'Java (Basic)',
    issuer: 'HackerRank',
    date: '2024',
    category: 'backend',
  },
  {
    name: 'Data Structures (Basic)',
    issuer: 'HackerRank',
    date: '2024',
    category: 'backend',
  },
  {
    name: 'Full Stack Java Internship',
    issuer: 'MIST Solutions',
    date: '2024',
    category: 'backend',
  },
]

const CATEGORY_CONFIG = {
  frontend: { variant: 'grass' as const, iconColor: 'text-grass-400' },
  backend: { variant: 'diamond' as const, iconColor: 'text-diamond-400' },
  cloud: { variant: 'gold' as const, iconColor: 'text-gold-400' },
  general: { variant: 'default' as const, iconColor: 'text-text-muted' },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: MOTION_EASE },
  },
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const prefersReducedMotion = useReducedMotion()
  const category = CATEGORY_CONFIG[certificate.category]

  return (
    <motion.div
      className="group flex items-start gap-4 rounded-lg border border-stone-700/40 bg-surface p-4 transition-all duration-300 hover:border-grass-700/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] sm:p-5"
      variants={prefersReducedMotion ? undefined : cardVariants}
      style={{
        boxShadow:
          'inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 0 rgba(255,255,255,0.02)',
      }}
    >
      {/* Icon area */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-stone-700/40 bg-surface-raised">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={category.iconColor}
        >
          <rect x="2" y="1" width="14" height="16" rx="2" />
          <path d="M6 5h6M6 8h6M6 11h3" />
        </svg>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-sm font-semibold tracking-[0.04em] text-text-primary">
          {certificate.name}
        </h3>
        <p className="mt-1 font-body text-xs text-text-secondary">
          {certificate.issuer} · {certificate.date}
        </p>
      </div>

      <Badge variant={category.variant} className="shrink-0">
        {certificate.category}
      </Badge>
    </motion.div>
  )
}

export function CertificatesSection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.certificates

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] py-[var(--spacing-section-y)]"
    >
      {/* Warm lantern glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 55% 35% at 50% 30%, rgba(255,224,102,0.035) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 25% at 50% 60%, rgba(255,215,0,0.015) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      <Container size="narrow" className="relative z-10">
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
              Certificates
            </h2>
            <p className="mt-4 font-body text-lg text-text-secondary">
              Credentials collected along the journey.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3"
            variants={prefersReducedMotion ? undefined : listVariants}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.1 }}
          >
            {CERTIFICATES.map((certificate) => (
              <CertificateCard key={certificate.name} certificate={certificate} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
