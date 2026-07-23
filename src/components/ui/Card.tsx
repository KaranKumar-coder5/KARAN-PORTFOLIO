import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border-subtle bg-surface text-text-primary shadow-block',
        className,
      )}
      {...props}
    />
  )
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('border-b border-border-subtle px-5 py-4', className)}
      {...props}
    />
  )
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn('font-display text-lg text-text-accent', className)}
      {...props}
    />
  )
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p className={cn('mt-1 text-sm text-text-secondary', className)} {...props} />
  )
}

export type CardContentProps = HTMLAttributes<HTMLDivElement>

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn('px-5 py-4', className)} {...props} />
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement>

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('border-t border-border-subtle px-5 py-4', className)}
      {...props}
    />
  )
}
