import { motion, useReducedMotion } from 'framer-motion'
import { sectionVariants, childVariants } from '@/lib/motion'
import { Section, Container } from '@/components/ui'
import { BIOME_MAP } from '@/constants'

export function EndingSection() {
  const prefersReducedMotion = useReducedMotion()
  const biome = BIOME_MAP.ending

  return (
    <Section
      id={biome.id}
      ariaLabel={biome.title}
      container={false}
      className="relative overflow-hidden bg-[rgba(15,15,26,0.88)] pb-32 pt-[var(--spacing-section-y)]"
    >
      {/* End Portal atmosphere — layered purple glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 55% 40% at 50% 45%, rgba(168,85,247,0.05) 0%, transparent 70%)',
            'radial-gradient(ellipse 35% 25% at 50% 50%, rgba(123,47,190,0.03) 0%, transparent 60%)',
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
              The End
            </h2>
          </motion.div>

          <motion.div
            className="mt-8 max-w-lg"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            <p className="font-body text-lg leading-relaxed text-text-secondary">
              You've reached the end of this world. But every ending is a new beginning.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-text-muted">
              Thank you for exploring. If you'd like to collaborate, the Nether Portal
              is just above.
            </p>
          </motion.div>

          {/* Decorative end portal frame */}
          <motion.div
            className="mt-12 flex gap-1.5"
            variants={prefersReducedMotion ? undefined : childVariants}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const isActive = i >= 2 && i <= 4
              return (
                <span
                  key={i}
                  className="relative block h-3 w-3 rounded-[2px]"
                  style={{
                    backgroundColor: isActive
                      ? 'var(--color-end-500)'
                      : 'var(--color-stone-700)',
                    opacity: isActive ? 0.8 : 0.3,
                    boxShadow: isActive
                      ? '0 0 8px rgba(168,85,247,0.3), 0 0 16px rgba(168,85,247,0.1)'
                      : 'none',
                  }}
                />
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
