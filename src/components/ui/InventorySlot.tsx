import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import type { InventorySlotState } from '@/types'

export type InventorySlotProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  state?: InventorySlotState
  label?: string
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
} as const

const stateClasses: Record<InventorySlotState, string> = {
  empty: 'bg-stone-900/80 hover:bg-stone-700/60',
  filled: 'bg-stone-700/70 hover:bg-stone-500/50',
  selected: 'ring-2 ring-gold-500 bg-stone-700/80',
  disabled: 'cursor-not-allowed opacity-50',
}

export function InventorySlot({
  state = 'empty',
  label,
  children,
  size = 'md',
  className,
  disabled,
  type = 'button',
  ...props
}: InventorySlotProps) {
  const isDisabled = disabled || state === 'disabled'

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-label={label}
      aria-pressed={state === 'selected'}
      className={cn(
        'relative inline-flex items-center justify-center rounded-block border border-stone-700 shadow-slot transition-preset',
        sizeClasses[size],
        stateClasses[state],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
