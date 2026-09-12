'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')

  useEffect(() => {
    // Phase 1: Show loading animation (2.2s)
    const t1 = setTimeout(() => {
      setPhase('reveal')
    }, 2200)

    // Phase 2: Inside-out transition completes (0.9s later)
    const t2 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 3100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-dark overflow-hidden
        ${phase === 'reveal' ? 'splash-reveal' : ''}
        ${phase === 'done' ? 'pointer-events-none opacity-0' : ''}
      `}
      aria-hidden="true"
    >
      {/* Radial burst overlay for inside-out effect */}
      {phase === 'reveal' && (
        <div className="splash-burst" />
      )}

      {/* Animated logo content */}
      <div className={`relative z-10 flex flex-col items-center gap-6 ${phase === 'reveal' ? 'splash-logo-exit' : ''}`}>

        {/* Decorative top line */}
        <div className="splash-line-top" />

        {/* Brand name letter by letter */}
        <div className="overflow-hidden w-full flex justify-center px-4">
          <div
            className="font-display font-light text-cream uppercase select-none whitespace-nowrap"
            style={{ fontSize: 'clamp(1.8rem, 8vw, 6.5rem)', letterSpacing: 'clamp(0.2em, 2vw, 0.5em)' }}
          >
            {'ZUL LUZ'.split('').map((char, i) => (
              <span
                key={i}
                className="splash-letter inline-block"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p className="splash-tagline text-[10px] tracking-[0.4em] uppercase text-cream/50 font-light">
          Handcrafted Luxury Lingerie
        </p>

        {/* Loading bar */}
        <div className="splash-loader-bar">
          <div className="splash-loader-fill" />
        </div>

        {/* Decorative bottom line */}
        <div className="splash-line-bottom" />
      </div>
    </div>
  )
}
