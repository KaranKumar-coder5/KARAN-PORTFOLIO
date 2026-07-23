import { motion, useScroll, useTransform } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 z-50 h-[2px] w-full"
    >
      <motion.div
        className="h-full origin-left"
        style={{
          width,
          background:
            'linear-gradient(90deg, var(--color-grass-500), var(--color-diamond-500), var(--color-gold-400), var(--color-nether-500), var(--color-end-400))',
        }}
      />
    </div>
  )
}
