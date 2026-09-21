'use client'

import { useCallback, useState, type ReactNode } from 'react'
import Layout from './Layout'
import SplashScreen from './SplashScreen'
import { StoreProvider } from '@/context/StoreContext'
import type { Product } from '@/lib/types'

export function StorefrontShell({ children, products }: { children: ReactNode; products: Product[] }) {
  const [splashDone, setSplashDone] = useState(false)
  const completeSplash = useCallback(() => setSplashDone(true), [])

  return (
    <StoreProvider products={products}>
      {!splashDone && <SplashScreen onComplete={completeSplash} />}
      {/* A transformed ancestor turns fixed drawers into document-sized elements.
          Keep the splash transition to opacity so the cart remains viewport-fixed. */}
      <div className={`transition-opacity duration-700 ${splashDone ? 'opacity-100' : 'opacity-0'}`}>
        <Layout>{children}</Layout>
      </div>
    </StoreProvider>
  )
}
