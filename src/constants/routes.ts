import type { SectionId } from '@/types'

export const ROUTES = {
  home: '/',
} as const

export const SECTION_IDS = {
  spawn: 'spawn',
  about: 'about',
  inventory: 'inventory',
  projects: 'projects',
  timeline: 'timeline',
  achievements: 'achievements',
  certificates: 'certificates',
  contact: 'contact',
  ending: 'ending',
} as const satisfies Record<SectionId, SectionId>

export const SECTION_ORDER: SectionId[] = [
  SECTION_IDS.spawn,
  SECTION_IDS.about,
  SECTION_IDS.inventory,
  SECTION_IDS.projects,
  SECTION_IDS.timeline,
  SECTION_IDS.achievements,
  SECTION_IDS.certificates,
  SECTION_IDS.contact,
  SECTION_IDS.ending,
]

export function getSectionHash(id: SectionId): `#${SectionId}` {
  return `#${id}`
}
