import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from '@/context'
import { registerGsapPlugins } from '@/lib'
import { App } from '@/App'
import '@/styles/globals.css'

registerGsapPlugins()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
