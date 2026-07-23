import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { SPRING_CONFIG } from '@/lib/motion'

const HOVER_SELECTORS = 'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'

export function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, SPRING_CONFIG.default)
  const springY = useSpring(cursorY, SPRING_CONFIG.default)
  const cursorScale = useMotionValue(1)
  const springScale = useSpring(cursorScale, SPRING_CONFIG.snappy)

  const dotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(HOVER_SELECTORS)) {
        setIsHovering(true)
        cursorScale.set(2)
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(HOVER_SELECTORS)) {
        setIsHovering(false)
        cursorScale.set(1)
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [cursorX, cursorY, cursorScale])

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    document.body.classList.toggle('has-custom-cursor', mq.matches)
    return () => document.body.classList.remove('has-custom-cursor')
  }, [])

  return (
    <motion.div
      ref={dotRef}
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 rounded-full mix-blend-difference"
      animate={{
        backgroundColor: isHovering ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
      }}
      transition={{ duration: 0.15 }}
    />
  )
}
