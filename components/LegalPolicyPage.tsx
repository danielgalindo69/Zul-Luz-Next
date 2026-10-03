import type { ReactNode } from 'react'

type PolicySection = {
  title: string
  content: ReactNode
}

type LegalPolicyPageProps = {
  eyebrow: string
  title: string
  intro: string
  lastUpdated: string
  sections: PolicySection[]
}

export function LegalPolicyPage({ eyebrow, title, intro, lastUpdated, sections }: LegalPolicyPageProps) {
  return (
    <main className="bg-cream pt-28 text-dark sm:pt-32">
      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 lg:pb-24">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-wine">{eyebrow}</p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-dark/70 sm:text-lg">{intro}</p>
        <p className="mt-5 text-xs tracking-wide text-dark/50">Last updated: {lastUpdated}</p>
      </section>

      <section className="border-y border-border bg-white/45">
        <div className="mx-auto max-w-4xl space-y-10 px-5 py-14 sm:px-8 sm:py-16">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-display text-2xl leading-tight text-dark sm:text-3xl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-dark/75 sm:text-base">{section.content}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <p className="text-sm leading-6 text-dark/55">
          For questions about these policies, contact us at{' '}
          <a className="text-wine underline underline-offset-4 hover:text-dark" href="mailto:info@zulluz.shop">
            info@zulluz.shop
          </a>
          .
        </p>
      </section>
    </main>
  )
}
