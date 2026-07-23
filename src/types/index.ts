import type { ReactNode } from 'react'

export type BaseComponentProps = {
  className?: string
  children?: ReactNode
}

export type SectionId =
  | 'spawn'
  | 'about'
  | 'inventory'
  | 'projects'
  | 'timeline'
  | 'achievements'
  | 'certificates'
  | 'contact'
  | 'ending'

export type BiomeId = SectionId

export type RoutePath = '/' | `#${SectionId}`

export type InventorySlotState = 'empty' | 'filled' | 'selected' | 'disabled'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type BadgeVariant = 'default' | 'grass' | 'diamond' | 'gold' | 'nether' | 'end'

export type ProgressBarVariant = 'default' | 'health' | 'experience'

export type ModalSize = 'sm' | 'md' | 'lg'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export type SectionMeta = {
  id: SectionId
  title: string
  description: string
}

export type BiomeMeta = SectionMeta & {
  label: string
}

export type ScrollProgress = {
  progress: number
  direction: 'up' | 'down'
}

export type CursorVariant = 'default' | 'hover' | 'pressed'
