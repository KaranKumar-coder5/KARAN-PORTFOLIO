import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { LENIS_DEFAULT_OPTIONS } from '@/lib/lenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type LenisContextValue = {
  lenis: Lenis | null
  isEnabled: boolean
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  isEnabled: false,
})

export function useLenis(): LenisContextValue {
  return useContext(LenisContext)
}

type LenisProviderProps = {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      setLenis(null)
      return
    }

    const instance = new Lenis(LENIS_DEFAULT_OPTIONS)
    lenisRef.current = instance
    setLenis(instance)

    let frameId = 0
    const raf = (time: number) => {
      instance.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [prefersReducedMotion])

  const value = useMemo(
    () => ({
      lenis,
      isEnabled: lenis !== null,
    }),
    [lenis],
  )

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}
