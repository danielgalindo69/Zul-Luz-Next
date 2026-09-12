import { useRef, useEffect, useState } from 'react'

/**
 * Hook para animaciones de entrada en scroll con Framer Motion
 * Retorna { ref, inView } compatible con el patrón existente
 * Añade un delay opcional antes de que inView sea true
 */
export function useScrollAnimation(threshold = 0.1, delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const timeout = setTimeout(() => setInView(true), delay)
          return () => clearTimeout(timeout)
        }
      },
      { threshold }
    )

    if (ref.current) obs.observe(ref.current)
    return () => { obs.disconnect() }
  }, [threshold, delay])

  return { ref, inView }
}