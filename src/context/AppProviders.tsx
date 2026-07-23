import type { ReactNode } from 'react'
import { LenisProvider } from './LenisProvider'
import { ReducedMotionProvider } from './ReducedMotionProvider'
import { SectionObserver } from './SectionObserver'
import { BiomeThemeProvider } from './BiomeThemeProvider'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LenisProvider>
      <ReducedMotionProvider>
        <SectionObserver>
          <BiomeThemeProvider>{children}</BiomeThemeProvider>
        </SectionObserver>
      </ReducedMotionProvider>
    </LenisProvider>
  )
}
