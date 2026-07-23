import { cn } from '@/utils/cn'

export type PageLoaderProps = {
  label?: string
  className?: string
}

export function PageLoader({ label = 'Loading world...', className }: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex min-h-[50dvh] flex-col items-center justify-center gap-3 text-text-secondary',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 rounded-block border-2 border-grass-500 border-t-transparent"
      />
      <span className="font-display text-sm tracking-wide text-text-accent">{label}</span>
    </div>
  )
}
