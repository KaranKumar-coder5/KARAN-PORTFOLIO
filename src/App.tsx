import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router, routerFallback } from '@/router'
import { GlobalUI } from '@/components/ui'

export function App() {
  return (
    <>
      <GlobalUI />
      <Suspense fallback={routerFallback}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}
