import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { MOTION_EASE, sectionVariants, childVariants } from '@/lib/motion'
import { Section, Container } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@example.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
]

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: MOTION_EASE },
  },
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.contact

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] py-[var(--spacing-section-y)]"
    >
      {/* End Portal atmosphere — purple ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(168,85,247,0.05) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 30% at 50% 55%, rgba(123,47,190,0.03) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.02) 0%, transparent 40%)',
          ].join(', '),
        }}
      />

      <Container size="narrow" className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={prefersReducedMotion ? undefined : sectionVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={prefersReducedMotion ? undefined : childVariants}>
            <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-end-400">
              {biome.label}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[0.08em] text-text-primary sm:text-4xl md:text-5xl">
              Contact
            </h2>
            <p className="mt-5 font-body text-lg text-text-secondary">
              Step through the portal. Let's build something together.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col gap-3 sm:flex-row"
            variants={prefersReducedMotion ? undefined : listVariants}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.3 }}
          >
            {LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-lg border border-stone-700/40 bg-surface px-6 py-3.5 font-body text-sm font-medium text-text-secondary transition-all duration-300 hover:border-end-700/50 hover:bg-surface-raised hover:text-text-primary hover:shadow-[0_4px_20px_rgba(168,85,247,0.08)]"
                style={{
                  boxShadow:
                    'inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 0 rgba(255,255,255,0.02)',
                }}
                variants={prefersReducedMotion ? undefined : linkVariants}
              >
                <span className="transition-colors duration-300 group-hover:text-end-400">
                  {link.icon}
                </span>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
