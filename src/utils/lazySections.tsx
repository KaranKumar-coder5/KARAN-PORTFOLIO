import { Suspense, lazy, type LazyExoticComponent, type ReactNode } from 'react'
import { PageLoader } from '@/components/ui'
import { SECTION_ORDER } from '@/constants'
import type { SectionId } from '@/types'

type SectionComponent = React.ComponentType<Record<string, never>>

const SECTION_MANIFEST: Record<SectionId, string> = {
  spawn: 'SpawnSection',
  about: 'AboutSection',
  inventory: 'InventorySection',
  projects: 'ProjectsSection',
  timeline: 'TimelineSection',
  achievements: 'AchievementsSection',
  certificates: 'CertificatesSection',
  contact: 'ContactSection',
  ending: 'EndingSection',
}

function createLazySection(id: SectionId): LazyExoticComponent<SectionComponent> {
  const componentName = SECTION_MANIFEST[id]
  return lazy(() =>
    import(`@/sections/${id}/${componentName}.tsx`).then((mod) => ({
      default: mod[componentName],
    })),
  )
}

const lazySections = Object.fromEntries(
  SECTION_ORDER.map((id) => [id, createLazySection(id)]),
) as Record<SectionId, LazyExoticComponent<SectionComponent>>

export const LazySpawnSection = lazySections.spawn
export const LazyAboutSection = lazySections.about
export const LazyInventorySection = lazySections.inventory
export const LazyProjectsSection = lazySections.projects
export const LazyTimelineSection = lazySections.timeline
export const LazyAchievementsSection = lazySections.achievements
export const LazyCertificatesSection = lazySections.certificates
export const LazyContactSection = lazySections.contact
export const LazyEndingSection = lazySections.ending

export function SectionSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader label="Loading biome..." />}>{children}</Suspense>
}
