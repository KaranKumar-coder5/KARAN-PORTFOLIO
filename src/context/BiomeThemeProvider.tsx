import { useContext, useEffect } from 'react'
import { SectionObserverContext } from './SectionObserver'

const BIOME_CSS_VAR = '--biome-color'

const BIOME_COLORS: Record<string, string> = {
  spawn: 'var(--color-gold-400)',
  about: 'var(--color-grass-300)',
  inventory: 'var(--color-stone-300)',
  projects: 'var(--color-gold-500)',
  timeline: 'var(--color-grass-700)',
  achievements: 'var(--color-gold-400)',
  certificates: 'var(--color-stone-500)',
  contact: 'var(--color-nether-500)',
  ending: 'var(--color-end-400)',
}

export function BiomeThemeProvider({ children }: { children: React.ReactNode }) {
  const ctx = useContext(SectionObserverContext)

  useEffect(() => {
    const root = document.documentElement
    const color = ctx?.activeSection ? BIOME_COLORS[ctx.activeSection] : null

    if (color) {
      root.style.setProperty(BIOME_CSS_VAR, color)
    } else {
      root.style.removeProperty(BIOME_CSS_VAR)
    }

    return () => {
      root.style.removeProperty(BIOME_CSS_VAR)
    }
  }, [ctx?.activeSection])

  return <>{children}</>
}
