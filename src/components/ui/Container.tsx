import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article' | 'main'
  size?: 'default' | 'narrow' | 'wide'
}

const sizeClasses = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-7xl',
} as const

export function Container({
  as: Component = 'div',
  size = 'default',
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full px-[var(--spacing-section-x)]', sizeClasses[size], className)}
      {...props}
    />
  )
}
