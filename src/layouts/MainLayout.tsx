import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { WorldBackground } from '@/components/ui'

type MainLayoutProps = {
  children: ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <main id="main-content" className={cn('min-h-dvh', className)}>
      <WorldBackground />
      {children}
    </main>
  )
}
