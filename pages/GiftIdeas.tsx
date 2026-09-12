'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { getGiftIdeas } from '@/lib/catalog'
import { useStore } from '@/context/StoreContext'
import { HeartIcon } from '@/components/Layout'

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

const GIFT_GUIDES = [
  { label: 'Under $50', filter: (p: { price: number }) => p.price < 50 },
  { label: '$50 – $100', filter: (p: { price: number }) => p.price >= 50 && p.price <= 100 },
  { label: 'Over $100', filter: (p: { price: number }) => p.price > 100 },
  { label: 'All Gifts', filter: () => true },
]

export default function GiftIdeas() {
  const [activeGuide, setActiveGuide] = useState(3)
  const { toggleFavorite, isFavorite, addToCart } = useStore()
  const allGifts = getGiftIdeas()
  const s1 = useInView(0.05)
  const s2 = useInView(0.1)
  const s3 = useInView(0.1)

  const filteredGifts = allGifts.filter(GIFT_GUIDES[activeGuide].filter)

  return (
    <div className="bg-cream">
      {/* Hero */}
      <div
        ref={s1.ref}
        className={`relative overflow-hidden bg-blush transition-opacity duration-700 ${s1.inView ? 'opacity-100' : 'opacity-0'}`}
        style={{ height: 'clamp(300px, 45vw, 520px)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1778777366990-62cd674e481a?w=1600&h=600&fit=crop&auto=format"
          alt="Gift ideas"
          className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-1500"
        />
        <div className="absolute inset-0 bg-dark/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <p className="text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-4 font-medium">Zul Luz</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-cream mb-4">
            Give the gift of <em className="italic">elegance</em>
          </h1>
          <p className="text-xs text-cream/70 max-w-md leading-[1.8]">
            Every Zul Luz piece arrives in our signature tissue-wrapped packaging — beautiful the moment it's unwrapped.
          </p>
        </div>
      </div>

      {/* Gift packaging note */}
      <div className="bg-wine text-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          {[
            { icon: '🎁', text: 'Complimentary gift wrapping on every order' },
            { icon: '✉️', text: 'Handwritten gift message on request' },
            { icon: '🚚', text: 'Express shipping available at checkout' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span className="text-[10px] tracking-[0.1em]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div
        ref={s2.ref}
        className={`py-14 lg:py-20 px-5 lg:px-10 max-w-7xl mx-auto transition-all duration-700 ${s2.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-3 font-medium">Gift Guides</p>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-dark mb-6">Shop by Budget</h2>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {GIFT_GUIDES.map((guide, i) => (
              <button
                key={guide.label}
                onClick={() => setActiveGuide(i)}
                className={`px-5 py-2.5 text-[10px] tracking-[0.14em] uppercase font-medium border transition-all duration-200 ${activeGuide === i ? 'bg-wine border-wine text-cream' : 'border-border text-muted hover:border-dark hover:text-dark'}`}
              >
                {guide.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gift Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredGifts.map((product, i) => (
            <div key={product.id} className="group" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="relative overflow-hidden bg-blush mb-4" style={{ aspectRatio: '3/4' }}>
                <Link href={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500" />
                </Link>
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-wine text-cream text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium">{product.tag}</span>
                )}
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-cream/90 border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-200 ${isFavorite(product.id) ? 'text-wine opacity-100' : 'text-muted hover:text-wine'}`}
                >
                  <HeartIcon filled={isFavorite(product.id)} />
                </button>
                <div className="absolute inset-x-0 bottom-0 bg-cream/95 py-3 px-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <button
                    onClick={() => addToCart(product, 1, product.colors[0].name, product.sizes[0])}
                    className="w-full text-[9px] tracking-[0.16em] uppercase text-dark hover:text-wine transition-colors font-medium"
                  >
                    + Add to Bag
                  </button>
                </div>
              </div>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-xs font-medium text-dark hover:text-wine transition-colors mb-1">{product.name}</h3>
              </Link>
              <p className="text-[10px] text-muted mb-1">{product.subtitle}</p>
              <p className="text-xs font-medium text-dark">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gift experience section */}
      <section
        ref={s3.ref}
        className={`py-16 lg:py-20 bg-blush-light transition-all duration-700 delay-100 ${s3.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-4 font-medium">The Zul Luz Gift Experience</p>
          <h2 className="font-display text-2xl lg:text-3xl font-light text-dark mb-8">Beautiful from the first touch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {[
              { step: '01', title: 'Choose Your Piece', text: 'Select any item from our collection — each one is gift-ready from the moment you add it to your bag.' },
              { step: '02', title: 'We Wrap It Beautifully', text: 'Your order is wrapped in Zul Luz tissue paper, placed in our signature box, and tied with a ribbon.' },
              { step: '03', title: 'Add a Personal Note', text: 'At checkout, add a handwritten gift message and we\'ll include it in your package at no extra charge.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="font-display text-3xl font-light text-wine/30 mb-3">{item.step}</div>
                <h3 className="font-display text-lg font-light text-dark mb-3">{item.title}</h3>
                <p className="text-xs text-muted leading-[1.8]">{item.text}</p>
              </div>
            ))}
          </div>
          <Link href="/best-sellers" className="inline-block bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-dark transition-colors duration-300 font-medium">
            Shop All Gifts
          </Link>
        </div>
      </section>
    </div>
  )
}
