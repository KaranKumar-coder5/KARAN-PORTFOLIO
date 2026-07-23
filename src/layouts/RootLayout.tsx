import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type RootLayoutProps = {
  children?: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {children ?? <Outlet />}
    </>
  )
}
