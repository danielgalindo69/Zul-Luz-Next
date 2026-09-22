'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

export default function AboutUs() {
  const s1 = useInView(0.1)
  const s2 = useInView(0.1)
  const s3 = useInView(0.1)
  const s4 = useInView(0.1)

  return (
    <div className="bg-cream">
      {/* Hero */}
      <div className="relative h-[29rem] overflow-hidden bg-blush sm:h-[30rem] lg:h-[min(45vw,32.5rem)]">
        <img
          src="https://images.unsplash.com/photo-1742794555175-0e55d742d809?w=1600&h=600&fit=crop&auto=format"
          alt="Zul Luz brand story"
          className="h-full w-full object-cover object-[62%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/35 to-dark/10 sm:bg-dark/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-11 text-left sm:items-center sm:justify-center sm:px-5 sm:pb-0 sm:text-center">
          <p className="text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-4 font-medium">Our Story</p>
          <h1 className="max-w-[20rem] font-display text-[2.65rem] font-light leading-[1.04] text-cream sm:max-w-none sm:text-[clamp(2.5rem,5vw,4rem)] sm:leading-normal">
            Born in Colombia,<br /><em className="italic">for every woman</em>
          </h1>
        </div>
      </div>

      {/* Origin Story */}
      <section
        ref={s1.ref}
        className={`mx-auto max-w-4xl px-6 py-14 transition-all duration-700 sm:px-8 sm:py-20 lg:px-10 lg:py-28 ${s1.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="mb-8 text-left sm:mb-16 sm:text-center">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-4 font-medium">The Beginning</p>
          <h2 className="font-display text-[2rem] lg:text-4xl font-light text-dark mb-7 sm:mb-8 leading-[1.15] sm:leading-[1.2]">
            A brand inspired by <em className="italic">transformation</em>,<span className="hidden sm:inline"><br /></span>{' '}softness, and inner light
          </h2>
          <p className="text-sm text-muted leading-[1.9] mb-6">
            Zul Luz was born from a simple but powerful belief: every woman deserves to feel radiant in her own skin — not just on special occasions, but in the quiet, intimate moments of everyday life. The moments of getting dressed in the morning, wrapping yourself in a robe, sliding into soft pajamas at night.
          </p>
          <p className="text-sm text-muted leading-[1.9]">
            The name <em className="italic font-display text-base text-dark">Zul Luz</em> is a fusion of words meaning "blue" and "light" — an homage to the Colombian sky at dawn, that particular quality of early morning luminosity that feels both intimate and expansive. We wanted our brand to hold that feeling.
          </p>
        </div>
      </section>

      {/* Split Story */}
      <section
        ref={s2.ref}
        className={`grid lg:grid-cols-2 overflow-hidden transition-all duration-700 delay-100 ${s2.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-blush sm:aspect-[5/4] lg:aspect-auto lg:min-h-[36rem]">
          <img
            src="https://images.unsplash.com/photo-1750064164897-093dc853c98a?w=850&h=950&fit=crop&auto=format"
            alt="Colombian craftsmanship"
            className="h-full w-full object-cover object-[center_20%] transition-transform duration-1000 hover:scale-[1.03] sm:object-center"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 lg:py-0 lg:px-14 xl:px-20 bg-blush-light">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-6 font-medium">Craftsmanship</p>
          <h2 className="font-display text-3xl lg:text-[2.2rem] font-light text-dark leading-[1.2] mb-7">
            Every stitch is a deliberate act of care
          </h2>
          <p className="text-xs text-dark/70 leading-[1.9] mb-5 max-w-[380px]">
            We work with a small family-run atelier in Medellín, Colombia — a city with generations of expertise in fine garment construction. Our patterns are cut by hand, our lace is sourced from specialist mills in Colombia and Europe, and every finished piece is inspected before it leaves.
          </p>
          <p className="text-xs text-dark/70 leading-[1.9] max-w-[380px]">
            This isn't mass production. Every Zul Luz piece is made in small batches, which means longer lead times and limited quantities — but also a garment with real intention behind it.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section
        ref={s3.ref}
        className={`py-20 lg:py-28 px-5 lg:px-10 max-w-7xl mx-auto transition-all duration-700 ${s3.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-4 font-medium">What we stand for</p>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-dark">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Made with Integrity',
              text: 'We partner with artisans who are fairly paid and work in safe conditions. Every supplier we use has been visited personally. This matters to us as much as the final product.',
            },
            {
              title: 'Thoughtful Materials',
              text: 'We source the finest microfiber, lace, and silk-touch fabrics we can find — materials that feel luxurious without being fragile. We test every fabric for comfort, durability, and washability before it enters a design.',
            },
            {
              title: 'Inclusive Sizing',
              text: 'Our range runs XS through XL and we\'re actively working toward expanded size offerings. We believe elegance has no size, and every woman deserves to find her perfect fit.',
            },
            {
              title: 'Minimal Packaging',
              text: 'Our packaging uses recycled tissue paper, FSC-certified boxes, and soy-based inks. We\'re continually reducing our footprint while maintaining the unboxing experience our clients love.',
            },
            {
              title: 'Woman-Founded',
              text: 'Zul Luz was founded by a Colombian woman who wanted to see herself reflected in luxury lingerie — not in the aspirational images of European houses, but in a brand that understood her body, her climate, and her story.',
            },
            {
              title: 'Colombian Heritage',
              text: 'Colombia has a rich tradition of textile craftsmanship that is rarely celebrated internationally. Zul Luz exists to change that — to put Colombian skill and artistry on the global stage where it belongs.',
            },
          ].map((v, i) => (
            <div key={i} className="border border-border p-7 hover:border-wine/30 hover:shadow-sm transition-all duration-300">
              <h3 className="font-display text-lg font-light text-dark mb-4">{v.title}</h3>
              <p className="text-xs text-muted leading-[1.9]">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Second split */}
      <section
        ref={s4.ref}
        className={`grid lg:grid-cols-2 overflow-hidden transition-all duration-700 delay-100 ${s4.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="flex flex-col justify-center px-8 py-16 lg:py-0 lg:px-14 xl:px-20 bg-dark text-cream">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-6 font-medium">Our Community</p>
          <h2 className="font-display text-3xl lg:text-[2.2rem] font-light text-cream leading-[1.2] mb-7">
            A community of women who choose <em className="italic text-blush">themselves</em>
          </h2>
          <p className="text-xs text-cream/65 leading-[1.9] mb-6 max-w-[380px]">
            Our clients aren't just buyers — they're women who've decided that how they feel at home matters. That getting dressed in something beautiful isn't vain or frivolous — it's an act of self-respect.
          </p>
          <p className="text-xs text-cream/65 leading-[1.9] mb-10 max-w-[380px]">
            We share their stories on our Instagram and in our monthly newsletter. If you've found your ritual with Zul Luz, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/best-sellers" className="inline-block bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-cream hover:text-dark transition-all duration-300 font-medium">
              Shop Now
            </Link>
            <a href="#" className="inline-block border border-cream/25 text-cream text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-cream hover:text-dark transition-all duration-300 font-medium">
              Follow Us
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-blush sm:aspect-[5/4] lg:aspect-auto lg:min-h-[36rem]">
          <img
            src="https://images.unsplash.com/photo-1778777366990-62cd674e481a?w=850&h=950&fit=crop&auto=format"
            alt="Zul Luz community"
            className="h-full w-full object-cover object-[center_20%] transition-transform duration-1000 hover:scale-[1.03] sm:object-center"
          />
        </div>
      </section>
    </div>
  )
}
