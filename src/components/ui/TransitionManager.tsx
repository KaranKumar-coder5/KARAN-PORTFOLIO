import { useActiveBiome } from '@/hooks/useActiveBiome'
import type { SectionId } from '@/types'

const BIOME_BG_COLORS: Record<SectionId, string> = {
  spawn: 'rgba(50,50,90,0.2)',
  about: 'rgba(31,46,20,0.2)',
  inventory: 'rgba(42,42,42,0.2)',
  projects: 'rgba(50,50,90,0.2)',
  timeline: 'rgba(31,46,20,0.25)',
  achievements: 'rgba(50,50,30,0.2)',
  certificates: 'rgba(42,42,42,0.2)',
  contact: 'rgba(60,20,10,0.25)',
  ending: 'rgba(25,15,50,0.3)',
}

export function TransitionManager() {
  const { activeSection } = useActiveBiome()

  const color = activeSection ? BIOME_BG_COLORS[activeSection] : 'transparent'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-colors duration-700 ease-out"
      style={{ backgroundColor: color }}
    />
  )
}
