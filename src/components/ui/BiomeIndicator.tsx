import { useActiveBiome } from '@/hooks/useActiveBiome'
import { SECTION_ORDER } from '@/constants'
import { BIOME_MAP } from '@/constants'
import type { SectionId } from '@/types'
import { cn } from '@/utils/cn'

const BIOME_DOT_COLORS: Record<SectionId, string> = {
  spawn: 'bg-gold-400',
  about: 'bg-grass-300',
  inventory: 'bg-stone-300',
  projects: 'bg-gold-500',
  timeline: 'bg-grass-700',
  achievements: 'bg-gold-400',
  certificates: 'bg-stone-500',
  contact: 'bg-nether-500',
  ending: 'bg-end-400',
}

const BIOME_GLOW_COLORS: Record<SectionId, string> = {
  spawn: 'rgba(255,224,102,0.4)',
  about: 'rgba(139,196,106,0.4)',
  inventory: 'rgba(184,184,184,0.4)',
  projects: 'rgba(255,215,0,0.4)',
  timeline: 'rgba(61,92,40,0.4)',
  achievements: 'rgba(255,224,102,0.4)',
  certificates: 'rgba(122,122,122,0.4)',
  contact: 'rgba(193,68,14,0.4)',
  ending: 'rgba(168,85,247,0.4)',
}

export function BiomeIndicator() {
  const { activeSection } = useActiveBiome()

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    >
      {SECTION_ORDER.map((id) => {
        const isActive = activeSection === id
        const biome = BIOME_MAP[id]

        return (
          <button
            key={id}
            aria-label={biome.title}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'group relative flex items-center transition-all duration-300',
            )}
          >
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                isActive ? 'h-3 w-3' : 'h-1.5 w-1.5',
                isActive ? BIOME_DOT_COLORS[id] : 'bg-stone-700',
              )}
              style={
                isActive
                  ? { boxShadow: `0 0 10px ${BIOME_GLOW_COLORS[id]}` }
                  : undefined
              }
            />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-sm bg-surface-raised px-2 py-1 text-xs text-text-primary opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
              {biome.title}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
