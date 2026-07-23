import { useContext } from 'react'
import { SectionObserverContext } from '@/context/SectionObserver'

export function useActiveBiome() {
  const ctx = useContext(SectionObserverContext)
  if (!ctx) {
    throw new Error('useActiveBiome must be used within a SectionObserver provider')
  }
  return ctx
}
