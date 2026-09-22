'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/context/StoreContext'
import type { Product } from '@/lib/types'
import { NAV_DATA } from './MegaMenu'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ActiveLink } from './ActiveLink'

// Vector Heart Icon used throughout the product grids and product pages.
export function HeartIcon({ filled, className = '' }: { filled: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? '#8C3F55' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth="1.2"
      stroke={filled ? '#8C3F55' : 'currentColor'}
      className={`w-5 h-5 transition-transform duration-300 ${filled ? 'scale-110' : 'hover:scale-110'} ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    products,
    cart,
    favorites,
    cartOpen,
    openCart,
    closeCart,
    cartTotal,
    cartCount,
    updateQuantity,
    removeFromCart,
  } = useStore()

  const router = useRouter()
  const pathname = usePathname()

  // State management
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubOpen, setMobileSubOpen] = useState<Record<number, boolean>>({})
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [announcementIndex, setAnnouncementIndex] = useState(0)

  const announcements = [
    'Complimentary shipping on orders over $150',
    'Handcrafted with love in Colombia',
    'Discover our new Sleepwear collection',
  ]

  // Track scrolling to shrink header and apply backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus and drawer on route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileSubOpen({})
    setSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
    closeCart()
  }, [pathname])

  // Keep mobile overlays usable: lock the page behind them and support Escape.
  useEffect(() => {
    const overlayOpen = mobileMenuOpen || searchOpen || cartOpen
    const previousOverflow = document.body.style.overflow
    if (overlayOpen) document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMobileMenuOpen(false)
      setSearchOpen(false)
      closeCart()
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen, searchOpen, cartOpen, closeCart])

  // Announcement bar carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % announcements.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Instant Search Logic
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      return
    }
    const query = searchQuery.toLowerCase()
    const filtered = products.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query)
    ).slice(0, 4)
    setSearchResults(filtered)
  }, [searchQuery, products])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Direct user to a category page or clear search on navigation
      router.push(`/best-sellers?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
    }
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true)
      setNewsletterEmail('')
      setTimeout(() => setNewsletterSubscribed(false), 5000)
    }
  }

  // Active navigation style helper
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:text-wine relative py-2 ${
      isActive
        ? 'text-wine after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:scale-x-100 after:h-[1px] after:bg-wine after:transition-transform after-duration-300'
        : 'text-dark/80 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:scale-x-0 after:h-[1px] after:bg-wine hover:after:scale-x-100 after:transition-transform after-duration-300'
    }`

  const freeShippingThreshold = 150
  const freeShippingProgress = Math.min((cartTotal / freeShippingThreshold) * 100, 100)
  const amountToFreeShipping = freeShippingThreshold - cartTotal

  const searchInputRef = useRef<HTMLInputElement>(null)
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 6)

  const SEARCH_TAGS = [
    { label: 'Lingerie', query: 'lingerie', href: '/lingerie' },
    { label: 'Sleepwear', query: 'sleepwear', href: '/sleepwear' },
    { label: 'Lace Bras', query: 'lace', href: '/lingerie?type=lace-bras' },
    { label: 'Silk Robes', query: 'silk', href: '/sleepwear?type=silk-robes' },
    { label: 'Pajamas', query: 'pajama', href: '/sleepwear?type=silk-sets' },
    { label: 'Best Sellers', query: 'best', href: '/best-sellers' },
    { label: 'Gift Ideas', query: 'gift', href: '/gift-ideas' },
    { label: 'Bodysuits', query: 'bodysuit', href: '/lingerie?type=bodysuits' },
    { label: 'Loungewear', query: 'lounge', href: '/lifestyle' },
  ]

  const LINGERIE_SUBCATEGORIES = [
    { label: 'Bras', href: '/lingerie/bras' },
    { label: 'Panties', href: '/lingerie/panties' },
    { label: 'Sets', href: '/lingerie/sets' },
  ]

  const NAV_CATS = [
    { label: 'Sleepwear', href: '/sleepwear' },
    { label: 'Lifestyle', href: '/lifestyle' },
    { label: 'Best Sellers', href: '/best-sellers' },
    { label: 'Gift Ideas', href: '/gift-ideas' },
    { label: 'About Us', href: '/about' },
    { label: 'Size Guide', href: '/size-guide' },
  ]

  return (
    <div className="flex flex-col min-h-screen font-body bg-cream text-dark overflow-x-hidden">

      {/* Fixed global navigation: announcement + main header */}
      <div className="fixed inset-x-0 top-0 z-[50]">
        {/* 1. Announcement Bar */}
        <div className="relative h-7 select-none overflow-hidden bg-wine py-1 text-[9px] font-medium uppercase tracking-[0.25em] text-cream">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="animate-fade-in px-4 text-center">{announcements[announcementIndex]}</p>
          </div>
        </div>

        {/* 2. Global Header — Temu-style: Logo | Search Bar | Icons */}
        <header className={`w-full transition-all duration-300 ${
          scrolled ? 'bg-cream/96 backdrop-blur-md shadow-md' : 'bg-cream shadow-sm'
        }`}>

        {/* ── Main Row ── */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-1 px-3 py-2.5 sm:gap-3 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto]">

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex h-10 w-10 items-center justify-center text-dark hover:text-wine transition-colors"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="min-w-0 truncate whitespace-nowrap font-display text-[1.35rem] tracking-[0.24em] font-light text-dark hover:text-wine transition-colors uppercase select-none sm:text-2xl sm:tracking-[0.35em] lg:text-3xl">
            Zul Luz
          </Link>

          {/* ── Search bar (clickable pill — opens overlay) ── */}
          <button
            onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 80) }}
            className="ml-auto flex h-10 w-10 min-w-0 items-center justify-center gap-2.5 rounded-full border border-border/60 bg-blush-light/70 text-left transition-all duration-200 hover:border-border hover:bg-blush-light sm:h-auto sm:w-full sm:justify-start sm:px-4 sm:py-2.5"
            aria-label="Open search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-muted flex-shrink-0">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="hidden min-w-0 truncate text-xs font-light text-muted/70 sm:block sm:text-sm">Search lingerie, sleepwear, robes…</span>
          </button>

          {/* ── Right icons ── */}
          <div className="flex items-center gap-0 sm:gap-2 flex-shrink-0">
            <Link href="/profile" className="hidden sm:flex p-2 text-dark hover:text-wine transition-colors" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link href="/profile" className="relative hidden p-2 text-dark hover:text-wine transition-colors min-[360px]:block" aria-label="Favorites">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-wine text-cream text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
              )}
            </Link>
            <button onClick={openCart} className="relative p-2 text-dark hover:text-wine transition-colors" aria-label="Shopping bag">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-dark text-cream text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* ── Category strip ── */}
        <div className="hidden border-t border-border/30 bg-cream/80 lg:block">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-none lg:overflow-visible">
              <div className="group relative flex-shrink-0">
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    pathname?.startsWith('/lingerie')
                      ? 'border-wine text-wine'
                      : 'border-transparent text-dark/70 hover:text-wine hover:border-wine/40'
                  }`}
                >
                  Lingerie
                  <ChevronDown
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="invisible pointer-events-none absolute left-0 top-[calc(100%-1px)] z-50 min-w-44 translate-y-1 overflow-hidden rounded-b-lg border border-border/70 bg-cream opacity-0 shadow-lg transition-all duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  role="menu"
                  aria-label="Lingerie categories"
                >
                  <Link href="/lingerie" role="menuitem" className="block border-b border-border/50 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-wine transition-colors hover:bg-blush-light">
                    Shop all lingerie
                  </Link>
                  {LINGERIE_SUBCATEGORIES.map((category) => (
                    <Link key={category.label} href={category.href} role="menuitem" className="block px-4 py-3 text-xs text-dark/75 transition-colors hover:bg-blush-light hover:text-wine">
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>

              {NAV_CATS.map(cat => (
                <ActiveLink
                  key={cat.label}
                  href={cat.href}
                  className={({ isActive }) =>
                    `flex-shrink-0 px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                      isActive
                        ? 'border-wine text-wine'
                        : 'border-transparent text-dark/70 hover:text-wine hover:border-wine/40'
                    }`
                  }
                >
                  {cat.label}
                </ActiveLink>
              ))}
            </div>
          </div>
        </div>
        </header>
      </div>

      {/* Preserve document flow beneath the fixed navigation. */}
      <div className="h-[88px] flex-none lg:h-[123px] xl:h-[128px]" aria-hidden="true" />

      {/* ══ SEARCH OVERLAY ══════════════════════════════════════════ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />

            {/* Panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 bg-cream w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Search input row */}
              <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-4">
                <form onSubmit={(e) => { handleSearchSubmit(e); setSearchOpen(false) }} className="flex items-center gap-3 bg-blush-light border-2 border-wine/30 focus-within:border-wine rounded-full px-5 py-3 transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-wine flex-shrink-0">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for lingerie, sleepwear, robes…"
                    className="flex-1 bg-transparent border-none outline-none text-sm text-dark placeholder-muted/60 font-light"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="text-muted hover:text-dark transition-colors p-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-1 text-muted hover:text-wine transition-colors text-xs tracking-wider uppercase font-medium"
                  >
                    Cancel
                  </button>
                </form>
              </div>

              <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 space-y-6">

                {/* ── Search Results ── */}
                {searchResults.length > 0 && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-semibold mb-3">Results</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResults.map(product => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 p-3 bg-blush-light/40 hover:bg-blush-light rounded-xl transition-colors group"
                        >
                          <div className="w-14 h-18 rounded-lg overflow-hidden flex-shrink-0 bg-blush">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-dark truncate">{product.name}</p>
                            <p className="text-[10px] text-muted truncate mt-0.5">{product.subtitle}</p>
                            <p className="text-xs font-semibold text-wine mt-1">${product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {searchQuery.length >= 2 && searchResults.length === 0 && (
                  <p className="text-center text-sm text-muted font-light py-4">No results for <em>"{searchQuery}"</em>. Try a different term.</p>
                )}

                {/* ── Popular search tags ── */}
                {searchResults.length === 0 && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-semibold mb-3">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {SEARCH_TAGS.map(tag => (
                        <button
                          key={tag.label}
                          onClick={() => { setSearchQuery(tag.query); }}
                          className="px-4 py-1.5 rounded-full bg-blush-light hover:bg-wine hover:text-cream border border-border/50 hover:border-wine text-xs text-dark/70 font-medium tracking-wide transition-all duration-200"
                        >
                          {tag.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── You might like section ── */}
                {searchResults.length === 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-semibold">You Might Like</p>
                      <Link href="/best-sellers" onClick={() => setSearchOpen(false)} className="text-[10px] text-wine hover:text-dark tracking-wider uppercase font-medium transition-colors">View All →</Link>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                      {featuredProducts.map(product => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="group block"
                        >
                          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-blush mb-1.5">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <p className="text-[10px] text-dark font-medium truncate leading-snug">{product.name}</p>
                          <p className="text-[10px] text-wine font-semibold">${product.price.toFixed(2)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Mobile Navigation Menu Drawer */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-dark/40 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Slider */}
        <div
          className={`absolute inset-y-0 left-0 flex w-[min(22rem,90vw)] flex-col overflow-hidden bg-cream shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-none items-center justify-between border-b border-border px-5 py-4">
            <span className="font-display text-xl tracking-[0.2em] font-light text-dark">Zul Luz</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-dark hover:text-wine transition-colors"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-3 overscroll-contain">
            {NAV_DATA.map((item, index) => (
              <div key={item.label}>
                {item.noDropdown ? (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-xs uppercase tracking-[0.18em] text-dark/80 hover:text-wine hover:bg-blush-light/50 transition-all duration-200 rounded-lg font-medium"
                  >
                    <item.icon className="w-4 h-4 text-dark/50" aria-hidden="true" />
                    {item.label}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => setMobileSubOpen(prev => ({ ...prev, [index]: !prev[index] }))}
                      className="w-full flex items-center justify-between gap-3 px-3 py-3 text-xs uppercase tracking-[0.18em] text-dark/80 hover:text-wine hover:bg-blush-light/50 transition-all duration-200 rounded-lg font-medium text-left"
                      aria-expanded={mobileSubOpen[index]}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-dark/50" aria-hidden="true" />
                        {item.label}
                      </span>
                      <motion.span
                        animate={{ rotate: mobileSubOpen[index] ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted" aria-hidden="true" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileSubOpen[index] && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-1 ml-5 space-y-1 border-l border-border/50 pl-5 pb-2"
                        >
                          {(item.columns ?? []).map((col, colIndex) => (
                            <li key={col.title} className="space-y-1">
                              <span className="block text-[10px] tracking-[0.12em] uppercase text-wine font-semibold py-1.5">
                                {col.title}
                              </span>
                              {col.items.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block text-xs text-dark/60 hover:text-wine py-1 transition-colors font-light"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </li>
                          ))}
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="inline-flex items-center gap-1.5 mt-2 text-[10px] tracking-[0.12em] uppercase text-wine font-medium hover:text-dark transition-colors"
                          >
                            View all {item.label} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-xs uppercase tracking-[0.18em] text-dark/80 hover:text-wine hover:bg-blush-light/50 transition-all duration-200 rounded-lg font-medium"
            >
              <span className="w-4 h-4" />
              About Us
            </Link>
            <Link
              href="/size-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-xs uppercase tracking-[0.18em] text-dark/80 hover:text-wine hover:bg-blush-light/50 transition-all duration-200 rounded-lg font-medium"
            >
              <span className="w-4 h-4" />
              Size Guide
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-xs uppercase tracking-[0.18em] text-dark/80 hover:text-wine hover:bg-blush-light/50 transition-all duration-200 rounded-lg font-medium"
            >
              <span className="w-4 h-4" />
              My Account
            </Link>
          </nav>

          <div className="flex-none border-t border-border bg-blush-light/35 px-5 py-4 text-[10px] text-muted tracking-wider leading-relaxed">
            <p className="font-semibold text-dark mb-1">Handcrafted Luxury Lingerie</p>
            <p>Designed with absolute comfort and delicate beauty, handmade in Colombia.</p>
          </div>
        </div>
      </div>

      {/* 4. Sliding Cart Drawer (Shopping Bag) */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={closeCart}
          className="absolute inset-0 bg-dark/40 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Cart Slider — full height on desktop, 85vh bottom sheet on mobile */}
        <div
          className={`absolute right-0 bottom-0 sm:top-0 w-full sm:w-[30rem] xl:w-[34rem] sm:max-w-none bg-cream shadow-2xl flex flex-col transition-transform duration-300 max-h-[85dvh] sm:max-h-none ${
            cartOpen ? 'translate-y-0 sm:translate-x-0 sm:translate-y-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
          } rounded-t-2xl sm:rounded-none`}
        >
          {/* Drawer Header — always visible with prominent close button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-cream">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xs tracking-[0.25em] uppercase font-semibold text-dark">Shopping Bag</h2>
              <span className="text-[10px] text-muted">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            </div>
            <button
              onClick={closeCart}
              type="button"
              className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blush-light hover:bg-wine hover:text-cream text-dark transition-all duration-200 group"
              aria-label="Close shopping bag"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Drawer Body (Scrollable items) */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 xl:p-7 space-y-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 bg-blush-light rounded-full flex items-center justify-center text-wine">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-dark">Your bag is empty</h3>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    Explore our curated collections and discover handcrafted elegance.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart()
                    router.push('/best-sellers')
                  }}
                  className="bg-wine hover:bg-dark text-cream text-[9px] font-medium tracking-[0.2em] uppercase py-3.5 px-6 transition-all duration-300"
                >
                  Shop Best Sellers
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="flex gap-4 border-b border-border pb-5 last:border-b-0 last:pb-0">
                  {/* Thumbnail Image */}
                  <Link
                    href={`/product/${item.product.id}`}
                    onClick={closeCart}
                    className="w-20 h-26 bg-blush-light overflow-hidden border border-border/40 rounded flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="text-xs font-medium text-dark hover:text-wine transition-colors truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-muted hover:text-wine p-0.5"
                          aria-label="Remove item"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-[10px] text-muted font-light mt-0.5">
                        Color: {item.selectedColor} &bull; Size: {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border bg-cream-light rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-dark transition-colors font-light text-sm"
                        >
                          &minus;
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-dark select-none">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-dark transition-colors font-light text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Pricing */}
                      <span className="text-xs font-medium text-dark">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (Subtotal and Checkout) */}
          {cart.length > 0 && (
            <div className="border-t border-border bg-blush-light p-6 space-y-4 shadow-inner">
              {/* Shipping Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] tracking-wider font-light">
                  {cartTotal >= freeShippingThreshold ? (
                    <span className="text-wine font-medium">You qualify for free shipping! 🚚</span>
                  ) : (
                    <span>
                      Spend <span className="font-semibold">${amountToFreeShipping.toFixed(2)}</span> more for Free Shipping
                    </span>
                  )}
                  <span className="font-medium">${cartTotal.toFixed(2)} / ${freeShippingThreshold}</span>
                </div>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-wine transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs uppercase tracking-wider font-light text-muted">Subtotal</span>
                <span className="text-base font-semibold text-dark">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    alert('Demo Checkout: Thank you for testing Zul Luz!')
                  }}
                  className="w-full bg-wine hover:bg-dark text-cream text-[10px] tracking-[0.2em] uppercase font-semibold py-4 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full border border-wine/30 hover:border-wine text-wine text-[9px] tracking-[0.2em] uppercase font-semibold py-3 transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>

              <p className="text-[9px] text-muted text-center leading-relaxed">
                Taxes, shipping, and promotional codes applied during checkout.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 5. Main Component Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 6. Premium Footer */}
      <footer className="mt-auto border-t border-wine/10 bg-dark pt-12 pb-7 text-cream/90 sm:pt-16 sm:pb-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 border-b border-cream/10 px-5 pb-12 sm:px-7 md:grid-cols-2 md:gap-x-10 lg:grid-cols-5 lg:px-10 lg:pb-16">
          
          {/* Newsletter Signup (Left side - spans 2 columns on large screens) */}
          <div className="col-span-2 space-y-4 lg:col-span-2 lg:space-y-5">
            <h3 className="font-display text-xl tracking-[0.08em] text-cream sm:text-2xl sm:tracking-[0.1em]">Join the Zul Luz Club</h3>
            <p className="text-xs text-cream/70 font-light leading-relaxed max-w-sm">
              Subscribe to receive exclusive access to collection launches, editorial campaigns, and premium luxury updates.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex max-w-md items-center gap-3 border-b border-cream/30 pb-1 transition-colors hover:border-cream/70">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-none text-xs placeholder-cream/40 text-cream outline-none font-light py-2"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="flex-none py-1 text-[9px] font-medium uppercase tracking-[0.13em] text-cream/70 hover:text-cream sm:px-2 sm:text-[10px] sm:tracking-[0.15em]">
                  {newsletterSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-[10px] text-wine italic animate-fade-in font-medium">
                  Thank you! A confirmation mail was sent.
                </p>
              )}
            </form>
          </div>

          {/* Column 1: Shop */}
          <div className="min-w-0 space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-cream/50">Shop</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link href="/lingerie" className="hover:text-wine transition-colors">Bras & Lingerie Sets</Link></li>
              <li><Link href="/sleepwear" className="hover:text-wine transition-colors">Silk Pajamas</Link></li>
              <li><Link href="/lifestyle" className="hover:text-wine transition-colors">Robes & Loungewear</Link></li>
              <li><Link href="/best-sellers" className="hover:text-wine transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Column 2: Assistance */}
          <div className="min-w-0 space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-cream/50">Assistance</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link href="/size-guide" className="hover:text-wine transition-colors">Size Guide</Link></li>
              <li><Link href="/about" className="hover:text-wine transition-colors">Our Story & Craft</Link></li>
              <li><span className="hover:text-wine transition-colors cursor-pointer">Shipping & Returns</span></li>
              <li><span className="hover:text-wine transition-colors cursor-pointer">Contact Us</span></li>
            </ul>
          </div>

          {/* Column 3: Brand */}
          <div className="col-span-2 space-y-4 md:col-span-1">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-cream/50">Brand</h4>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-xs font-light md:block md:space-y-2">
              <li><span className="hover:text-wine transition-colors cursor-pointer">Artisanal Sourcing</span></li>
              <li><span className="hover:text-wine transition-colors cursor-pointer">Sustainability</span></li>
              <li><span className="hover:text-wine transition-colors cursor-pointer">Gift Cards</span></li>
              <li><span className="hover:text-wine transition-colors cursor-pointer">Retailers</span></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Metadata & Copyright */}
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 pt-7 text-left text-[9px] font-light tracking-wider text-cream/40 sm:px-7 sm:text-[10px] md:flex-row md:items-center lg:px-10 lg:pt-8">
          <div className="flex items-center gap-2 select-none">
            <span className="font-display text-sm tracking-[0.25em] font-light text-cream">ZUL LUZ</span>
            <span>&bull; Handcrafted Everyday Luxury</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Zul Luz Lingerie. All Rights Reserved. Made in Colombia.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span className="hover:text-cream transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-cream transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
