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
      <div className={`transition-all duration-700 ${splashDone ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'}`}>
        <Layout>{children}</Layout>
      </div>
    </StoreProvider>
  )
}
