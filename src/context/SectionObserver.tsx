import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { SectionId } from '@/types'
import { SECTION_ORDER } from '@/constants'

type SectionObserverContextValue = {
  activeSection: SectionId | null
  activeSections: Set<SectionId>
}

export const SectionObserverContext = createContext<SectionObserverContextValue | null>(null)

type SectionObserverProps = {
  children: ReactNode
}

const THRESHOLD = [0, 0.25, 0.5, 0.75, 1]

export function SectionObserver({ children }: SectionObserverProps) {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const entriesRef = useRef(new Map<SectionId, IntersectionObserverEntry>())

  const updateActiveSection = useCallback(() => {
    const topSection = SECTION_ORDER.reduce<SectionId | null>((closest, id) => {
      const entry = entriesRef.current.get(id)
      if (!entry || entry.intersectionRatio <= 0) return closest
      if (!closest) return id
      const closestEntry = entriesRef.current.get(closest)
      if (!closestEntry) return id
      return entry.boundingClientRect.top < closestEntry.boundingClientRect.top ? id : closest
    }, null)

    setActiveSection((prev) => (prev === topSection ? prev : topSection))
  }, [])

  useEffect(() => {
    const sectionIds = new Set<SectionId>(SECTION_ORDER)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId
          if (!sectionIds.has(id)) continue
          if (entry.isIntersecting) {
            entriesRef.current.set(id, entry)
          } else {
            entriesRef.current.delete(id)
          }
        }
        updateActiveSection()
      },
      { threshold: THRESHOLD },
    )

    for (const id of SECTION_ORDER) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [updateActiveSection])

  const activeSections = new Set<SectionId>(
    [...entriesRef.current.keys()].filter((id) => {
      const entry = entriesRef.current.get(id)
      return entry != null && entry.intersectionRatio > 0
    }),
  )

  return (
    <SectionObserverContext.Provider value={{ activeSection, activeSections }}>
      {children}
    </SectionObserverContext.Provider>
  )
}
