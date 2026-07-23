import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-body font-semibold transition-preset disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-grass-500 text-night-900 shadow-md hover:bg-grass-300 focus-visible:ring-2 focus-visible:ring-gold-500',
        secondary:
          'bg-diamond-500 text-night-900 shadow-md hover:bg-diamond-400 focus-visible:ring-2 focus-visible:ring-gold-500',
        outline:
          'border border-border bg-transparent text-text-primary hover:bg-surface-raised',
        ghost: 'bg-transparent text-text-primary hover:bg-surface-raised',
        danger:
          'bg-nether-500 text-text-primary shadow-md hover:bg-nether-700 focus-visible:ring-2 focus-visible:ring-gold-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-sm',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { buttonVariants }
