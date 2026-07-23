import { useId, useState, type FocusEvent, type ReactNode } from 'react'
import { cn } from '@/utils/cn'
import type { TooltipPlacement } from '@/types'

export type TooltipProps = {
  content: ReactNode
  children: ReactNode
  placement?: TooltipPlacement
  className?: string
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  className,
}: TooltipProps) {
  const tooltipId = useId()
  const [isVisible, setIsVisible] = useState(false)

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      hide()
    }
  }

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={handleBlur}
    >
      <span aria-describedby={isVisible ? tooltipId : undefined}>{children}</span>
      {isVisible ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-sm border border-border bg-surface-raised px-2 py-1 text-xs text-text-primary shadow-md',
            placementClasses[placement],
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
