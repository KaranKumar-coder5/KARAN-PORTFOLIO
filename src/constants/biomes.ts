import type { BiomeMeta } from '@/types'
import { SECTION_IDS } from './routes'

export const BIOMES: BiomeMeta[] = [
  {
    id: SECTION_IDS.spawn,
    label: 'Spawn Point',
    title: 'Spawn Point',
    description: 'Where the journey begins.',
  },
  {
    id: SECTION_IDS.about,
    label: 'Sunflower Plains',
    title: 'About',
    description: 'Story, philosophy, and identity.',
  },
  {
    id: SECTION_IDS.inventory,
    label: 'Deep Mines',
    title: 'Inventory',
    description: 'Skills and tools of the trade.',
  },
  {
    id: SECTION_IDS.projects,
    label: 'Village',
    title: 'Projects',
    description: 'Structures built along the way.',
  },
  {
    id: SECTION_IDS.timeline,
    label: 'Dark Oak Forest',
    title: 'Timeline',
    description: 'Career path and milestones.',
  },
  {
    id: SECTION_IDS.achievements,
    label: 'Monument',
    title: 'Achievements',
    description: 'Unlocked accomplishments.',
  },
  {
    id: SECTION_IDS.certificates,
    label: 'Stronghold',
    title: 'Certificates',
    description: 'Credentials and certifications.',
  },
  {
    id: SECTION_IDS.contact,
    label: 'Nether Portal',
    title: 'Contact',
    description: 'Connect and collaborate.',
  },
  {
    id: SECTION_IDS.ending,
    label: 'The End',
    title: 'Ending',
    description: 'Final gateway and farewell.',
  },
]

export const BIOME_MAP = Object.fromEntries(
  BIOMES.map((biome) => [biome.id, biome]),
) as Record<(typeof BIOMES)[number]['id'], BiomeMeta>
