'use client'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center bg-cream px-5 text-center">
      <p className="font-display text-2xl font-light text-dark">Something went wrong</p>
      <button type="button" onClick={reset} className="mt-5 border border-dark px-5 py-3 text-[10px] tracking-[0.16em] uppercase">Try again</button>
    </main>
  )
}
