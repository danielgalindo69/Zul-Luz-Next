'use client'

import { useCallback, useState, type ReactNode } from 'react'
import Layout from './Layout'
import SplashScreen from './SplashScreen'
import { StoreProvider } from '@/context/StoreContext'

export function StorefrontShell({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(false)
  const completeSplash = useCallback(() => setSplashDone(true), [])

  return (
    <StoreProvider>
      {!splashDone && <SplashScreen onComplete={completeSplash} />}
      {/* A transformed ancestor turns fixed drawers into document-sized elements.
          Keep the splash transition to opacity so the cart remains viewport-fixed. */}
      <div className={`transition-opacity duration-700 ${splashDone ? 'opacity-100' : 'opacity-0'}`}>
        <Layout>{children}</Layout>
      </div>
    </StoreProvider>
  )
}
