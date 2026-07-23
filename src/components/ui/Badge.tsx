import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2 py-0.5 font-body text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface-raised text-text-secondary',
        grass: 'border-grass-700 bg-grass-900/60 text-grass-300',
        diamond: 'border-diamond-700 bg-diamond-700/20 text-diamond-400',
        gold: 'border-gold-600 bg-gold-600/15 text-gold-400',
        nether: 'border-nether-700 bg-nether-700/20 text-nether-500',
        end: 'border-end-700 bg-end-700/20 text-end-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { badgeVariants }
