import { cn } from '@/utils/cn'
import type { ProgressBarVariant } from '@/types'

export type ProgressBarProps = {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: ProgressBarVariant
  className?: string
}

const trackVariantClasses: Record<ProgressBarVariant, string> = {
  default: 'bg-surface-raised',
  health: 'bg-nether-700/30',
  experience: 'bg-grass-900/40',
}

const fillVariantClasses: Record<ProgressBarVariant, string> = {
  default: 'bg-diamond-500',
  health: 'bg-nether-500',
  experience: 'bg-emerald-500',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'default',
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), max)
  const percentage = max === 0 ? 0 : (clampedValue / max) * 100

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between gap-2 text-xs text-text-secondary">
          {label ? <span>{label}</span> : <span />}
          {showValue ? (
            <span aria-hidden="true">
              {Math.round(clampedValue)}/{max}
            </span>
          ) : null}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clampedValue}
        aria-label={label}
        className={cn(
          'h-3 overflow-hidden rounded-sm border border-border-subtle shadow-slot',
          trackVariantClasses[variant],
        )}
      >
        <div
          className={cn('h-full rounded-sm transition-[width] duration-300 ease-out', fillVariantClasses[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
