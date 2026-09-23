'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useStore } from '@/context/StoreContext'
import { HeartIcon } from '@/components/Layout'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Sparkles } from 'lucide-react'

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

const TESTIMONIALS = [
  { name: 'María V.', location: 'Miami, FL', text: 'The lace bra is unlike anything I\'ve owned — it feels like wearing nothing at all. Absolute perfection.' },
  { name: 'Claudia R.', location: 'New York, NY', text: 'My pajama set arrived beautifully packaged. The fabric is so soft and the fit is impeccable. I\'ll be ordering again.' },
  { name: 'Isabella M.', location: 'Los Angeles, CA', text: 'Zul Luz understands what lingerie should feel like. Elegant, comfortable, and made with real care.' },
]

export default function Home() {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation(0.05, 0)
  const { ref: catsRef, inView: catsInView } = useScrollAnimation(0.1, 100)
  const { ref: prodsRef, inView: prodsInView } = useScrollAnimation(0.1, 200)
  const { ref: valsRef, inView: valsInView } = useScrollAnimation(0.1, 300)
  const { ref: storyRef, inView: storyInView } = useScrollAnimation(0.1, 400)
  const { ref: testiRef, inView: testiInView } = useScrollAnimation(0.1, 500)
  const [activeT, setActiveT] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { products, toggleFavorite, isFavorite } = useStore()
  const bestSellers = products.filter((product) => product.isBestSeller)

  useEffect(() => {
    const t = setInterval(() => setActiveT(i => (i + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(t)
  }, [])

  const counterData = [
    { from: 0, to: 5432, duration: 2000, label: '5K+' },
    { from: 0, to: 100, duration: 1800, label: '100%' },
    { from: 0, to: 49, duration: 2200, label: '4.9★' },
  ]

  return (
    <div className="bg-cream">

{/* Hero */}
      <section
        ref={heroRef}
        className={`relative grid lg:grid-cols-[1fr_1fr] min-h-[90vh] lg:min-h-screen ${heroInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col justify-center px-8 py-16 lg:py-0 lg:px-14 xl:px-20 order-2 lg:order-1 bg-cream">
          <div className={`transition-all duration-1000 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-[10px] tracking-[0.24em] uppercase text-wine mb-7 font-medium">Timeless Comfort &amp; Elegance</p>
            <h1 className="font-display text-[clamp(2.6rem,5vw,4.5rem)] font-light leading-[1.08] text-dark mb-7">
              Elegance,<br /><em className="italic">Comfort</em><br />&amp; Confidence
            </h1>
            <p className="text-sm text-muted leading-[1.8] max-w-[340px] mb-10">
              We celebrate femininity, comfort, and timeless elegance in every moment. Delicate fabrics and fine details, thoughtfully crafted in Colombia.
            </p>
            <div className="flex flex-wrap gap-3.5 mb-14">
              <Link href="/best-sellers" className="inline-block bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-dark transition-colors duration-300 font-medium">
                Shop Now
              </Link>
              <Link href="/about" className="inline-block border border-dark text-dark text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-dark hover:text-cream transition-all duration-300 font-medium">
                Our Story
              </Link>
            </div>
            <div className="flex items-center gap-10">
              {[['5K+', 'Clients'], ['100%', 'Colombian'], ['4.9★', 'Rated']].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="font-display text-2xl font-light text-dark">{val}</div>
                  <div className="text-[9px] tracking-[0.18em] uppercase text-muted mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden h-[55vw] sm:h-[50vw] lg:h-auto order-1 lg:order-2 bg-blush">
          <img
            src="https://images.unsplash.com/photo-1750064139819-da3bf362e7b3?w=900&h=1100&fit=crop&auto=format"
            alt="Woman in elegant silk robe relaxing"
            className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-1000"
          />
          {/* Dramatic bottom fade gradient — dissolves into cream background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F1] via-[#FAF6F1]/30 to-transparent pointer-events-none" style={{ background: 'linear-gradient(to top, #FAF6F1 0%, #FAF6F1 5%, rgba(250,246,241,0.7) 25%, rgba(250,246,241,0.15) 55%, transparent 100%)' }} />
          {/* Subtle side vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-10 left-6 bg-cream/90 backdrop-blur-sm px-4 py-3 border border-border/50">
            <p className="text-[9px] tracking-[0.18em] uppercase text-muted">Made in</p>
            <p className="font-display text-sm text-dark font-light mt-0.5 inline-flex items-center gap-1.5">
              Colombia
              <svg viewBox="0 0 30 20" className="h-3.5 w-[21px] rounded-[2px] shadow-sm" aria-hidden="true">
                <rect width="30" height="10" fill="#FCD116" />
                <rect y="10" width="30" height="5" fill="#003893" />
                <rect y="15" width="30" height="5" fill="#CE1126" />
              </svg>
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        ref={catsRef}
        className={`py-20 lg:py-28 px-5 lg:px-10 max-w-7xl mx-auto transition-all duration-700 ${catsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-3.5 font-medium">Collections</p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-dark">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="md:col-span-2 group relative overflow-hidden bg-blush" style={{ aspectRatio: '16/9' }}>
            <img src="https://images.unsplash.com/photo-1718963884192-69be3b1203e4?w=1000&h=560&fit=crop&auto=format" alt="Lingerie collection" className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/55 via-dark/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 lg:p-9">
              <p className="text-[9px] tracking-[0.2em] uppercase text-cream/60 mb-2">Zul Luz</p>
              <h3 className="font-display text-3xl lg:text-4xl font-light text-cream mb-4">Lingerie</h3>
              <Link href="/lingerie" className="inline-flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase text-cream border-b border-cream/40 pb-0.5 hover:border-cream transition-colors">
                Shop Now <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            {[
              { img: 'https://images.unsplash.com/photo-1766056278842-b754f1e093c0?w=500&h=320&fit=crop&auto=format', label: 'Sleepwear', href: '/sleepwear', alt: 'Sleepwear collection' },
              { img: 'https://images.unsplash.com/photo-1763478959183-136fe6bdcc93?w=500&h=320&fit=crop&auto=format', label: 'Lifestyle', href: '/lifestyle', alt: 'Lifestyle products' },
            ].map(cat => (
              <div key={cat.label} className="group relative overflow-hidden bg-blush flex-1" style={{ minHeight: '200px' }}>
                <img src={cat.img} alt={cat.alt} className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/55 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 lg:p-6">
                  <h3 className="font-display text-2xl font-light text-cream mb-2">{cat.label}</h3>
                  <Link href={cat.href} className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-cream/80 border-b border-cream/35 pb-0.5 hover:border-cream transition-colors">
                    Shop Now <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section
        ref={prodsRef}
        className={`py-20 lg:py-28 bg-blush-light transition-all duration-700 delay-150 ${prodsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-3.5 font-medium">Featured</p>
              <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-dark">Best Sellers</h2>
            </div>
            <Link href="/best-sellers" className="hidden lg:inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-dark border-b border-dark pb-0.5 hover:text-wine hover:border-wine transition-colors">
              View All <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {bestSellers.slice(0, 4).map((product, i) => (
              <div key={product.id} className="group" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="relative overflow-hidden bg-blush mb-4" style={{ aspectRatio: '3/4' }}>
                  <Link href={`/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-600" />
                  </Link>
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-wine text-cream text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium">{product.tag}</span>
                  )}
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-cream/90 backdrop-blur-sm border border-border/50 transition-colors duration-200 ${isFavorite(product.id) ? 'text-wine' : 'text-muted hover:text-wine'}`}
                    aria-label="Add to favorites"
                  >
                    <HeartIcon filled={isFavorite(product.id)} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-cream/95 px-3.5 py-3 transition-transform duration-300 ease-out lg:translate-y-full lg:group-hover:translate-y-0">
                    <Link
                      href={'/product/' + product.id}
                      className="w-full text-[9px] tracking-[0.16em] uppercase text-dark hover:text-wine transition-colors font-medium"
                    >
                      Select options
                    </Link>
                  </div>
                </div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-xs font-medium text-dark leading-snug mb-1 hover:text-wine transition-colors">{product.name}</h3>
                </Link>
                <p className="text-[10px] text-muted mb-1.5">{product.subtitle}</p>
                <p className="text-xs font-medium text-dark">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 lg:hidden">
            <Link href="/best-sellers" className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-dark border-b border-dark pb-0.5">
              View All Products <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        ref={valsRef}
        className={`py-20 lg:py-28 px-5 lg:px-10 max-w-7xl mx-auto transition-all duration-700 delay-100 ${valsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-dark">Why <em className="italic">Zul Luz</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {[
            { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>, title: 'Curated Collections', text: 'Each piece is thoughtfully chosen — lingerie, silk robes, and sleepwear designed for the rituals that make you feel entirely like yourself.' },
            { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: 'Effortless Comfort', text: 'Confidence, delicacy, and beauty woven into everyday moments. Wear pieces that move with you and feel like a luminous second skin.' },
            { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>, title: 'Timeless Design', text: 'Minimal silhouettes inspired by modern femininity — pieces that transcend seasons and become the quiet icons of your personal wardrobe.' },
          ].map((v, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-border text-wine mb-7 group-hover:bg-wine group-hover:text-cream group-hover:border-wine transition-all duration-300">{v.icon}</div>
              <h3 className="font-display text-xl font-light text-dark mb-4">{v.title}</h3>
              <p className="text-xs text-muted leading-[1.9]">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section
        ref={storyRef}
        className={`grid lg:grid-cols-2 overflow-hidden transition-all duration-700 delay-150 ${storyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="relative overflow-hidden h-[60vw] sm:h-[50vw] lg:h-auto bg-blush">
          <img src="https://images.unsplash.com/photo-1742794555175-0e55d742d809?w=850&h=950&fit=crop&auto=format" alt="Woman outdoors in silk sleepwear" className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-1000" />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 lg:py-0 lg:px-14 xl:px-20 bg-dark text-cream">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-7 font-medium">Our Story</p>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.9rem)] font-light text-cream leading-[1.15] mb-8">
            A brand inspired by<br /><em className="italic text-blush">transformation</em>,<br />softness &amp; inner light
          </h2>
          <p className="text-xs text-cream/65 leading-[1.9] mb-5 max-w-[340px]">
            Zul Luz was born in Colombia from the belief that every woman deserves to feel radiant in her own skin — in the quiet, intimate moments of everyday life.
          </p>
          <p className="text-xs text-cream/65 leading-[1.9] mb-11 max-w-[340px]">
            Every fabric is chosen with intention. Every silhouette celebrates rather than conceals. This is lingerie as personal ritual — soft, luminous, and entirely yours.
          </p>
          <Link href="/about" className="inline-block border border-cream/25 text-cream text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-cream hover:text-dark transition-all duration-300 self-start font-medium">
            Read Our Story
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testiRef}
        className={`py-20 lg:py-28 px-5 lg:px-10 bg-blush-light transition-all duration-700 delay-100 ${testiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-12 font-medium">Client Love</p>
          <div className="relative min-h-[160px] flex flex-col items-center justify-center">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${i === activeT ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <p className="font-display text-xl lg:text-2xl font-light italic text-dark leading-[1.5] mb-8 max-w-2xl">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-xs font-medium text-dark tracking-wide">{t.name}</p>
                  <p className="text-[10px] text-muted tracking-widest uppercase mt-1">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2.5 mt-16">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveT(i)} className={`transition-all duration-300 rounded-full ${i === activeT ? 'w-6 h-1.5 bg-wine' : 'w-1.5 h-1.5 bg-border hover:bg-muted'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Gift Banner */}
      <div className="relative overflow-hidden h-64 lg:h-80 bg-blush">
        <img src="https://images.unsplash.com/photo-1778777366990-62cd674e481a?w=1600&h=400&fit=crop&auto=format" alt="Elegant lifestyle" className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-1000" />
        <div className="absolute inset-0 bg-dark/40 flex flex-col items-center justify-center text-center px-5">
          <p className="text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-4 font-medium">Gift Ideas</p>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-cream mb-6">Give the gift of <em className="italic">elegance</em></h2>
          <Link href="/gift-ideas" className="inline-block border border-cream/50 text-cream text-[10px] tracking-[0.16em] uppercase px-8 py-3.5 hover:bg-cream hover:text-dark transition-all duration-300 font-medium">
            Shop Gift Ideas
          </Link>
        </div>
      </div>

      {/* Newsletter */}
      <section className="py-20 lg:py-28 px-5 lg:px-10 max-w-xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-4 font-medium">Stay Connected</p>
        <h2 className="font-display text-3xl lg:text-4xl font-light text-dark mb-4">Join the <em className="italic">Zul Luz</em> world</h2>
        <p className="text-xs text-muted mb-9 leading-[1.9]">Be the first to know about new arrivals, exclusive offers, and intimate moments from Colombia.</p>
        {subscribed ? (
          <div className="border border-wine/30 bg-wine/5 px-6 py-5">
            <p className="inline-flex items-center gap-1.5 text-sm font-display font-light text-wine">
              Welcome to Zul Luz. <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </p>
            <p className="text-[10px] text-muted mt-1.5 tracking-wide">You'll hear from us soon.</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true) }} className="flex flex-col sm:flex-row">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required className="flex-1 px-5 py-4 text-xs border border-border bg-cream text-dark placeholder-muted focus:outline-none focus:border-wine transition-colors" />
            <button type="submit" className="bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-7 py-4 hover:bg-dark transition-colors duration-300 font-medium whitespace-nowrap">Subscribe</button>
          </form>
        )}
        <p className="text-[10px] text-muted mt-4 tracking-wide">No spam, ever. Unsubscribe at any time.</p>
      </section>
    </div>
  )
}
