import { createContext, useEffect, useState, type ReactNode } from 'react'

type ReducedMotionContextValue = {
  prefersReducedMotion: boolean
}

export const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  prefersReducedMotion: false,
})

type ReducedMotionProviderProps = {
  children: ReactNode
}

const QUERY = '(prefers-reduced-motion: reduce)'

export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}
