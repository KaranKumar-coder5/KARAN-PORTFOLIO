import { MainLayout } from '@/layouts'
import { SectionSuspense } from '@/utils/lazySections'
import {
  LazyAboutSection,
  LazyAchievementsSection,
  LazyCertificatesSection,
  LazyContactSection,
  LazyEndingSection,
  LazyInventorySection,
  LazyProjectsSection,
  LazySpawnSection,
  LazyTimelineSection,
} from '@/utils/lazySections'

export function HomePage() {
  return (
    <MainLayout>
      <SectionSuspense>
        <LazySpawnSection />
        <LazyAboutSection />
        <LazyInventorySection />
        <LazyProjectsSection />
        <LazyTimelineSection />
        <LazyAchievementsSection />
        <LazyCertificatesSection />
        <LazyContactSection />
        <LazyEndingSection />
      </SectionSuspense>
    </MainLayout>
  )
}
