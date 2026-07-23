import { useScroll } from 'framer-motion'
import { useMemo } from 'react'

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()

  const progress = useMemo(() => scrollYProgress, [scrollYProgress])

  return { progress }
}
