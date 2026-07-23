import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import type { SectionId } from '@/types'
import { Container } from './Container'

export type SectionProps = HTMLAttributes<HTMLElement> & {
  id: SectionId | string
  ariaLabel: string
  children: ReactNode
  container?: boolean
  containerClassName?: string
}

export function Section({
  id,
  ariaLabel,
  children,
  className,
  container = true,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('py-[var(--spacing-section-y)]', className)}
      {...props}
    >
      {container ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  )
}
