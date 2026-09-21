'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
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

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'

const getPriceValue = (value: string) => {
  if (!value.trim()) return null
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : null
}

const CATEGORY_META: Record<string, { title: string; subtitle: string; hero: string; description: string }> = {
  lingerie: {
    title: 'Lingerie',
    subtitle: 'Timeless Comfort & Elegance',
    hero: 'https://images.unsplash.com/photo-1718963884192-69be3b1203e4?w=1400&h=500&fit=crop&auto=format',
    description: 'From our signature lace bras to barely-there panties and coordinated sets, every Zul Luz lingerie piece is crafted to feel as beautiful as it looks.',
  },
  bras: {
    title: 'Bras',
    subtitle: 'Support meets elegance',
    hero: 'https://images.unsplash.com/photo-1606245455176-a30c1c36a6ad?w=1400&h=500&fit=crop&auto=format',
    description: 'Our bra collection balances delicate aesthetics with thoughtful engineering — for a fit that lifts, supports, and flatters naturally.',
  },
  panties: {
    title: 'Panties',
    subtitle: 'Second-skin comfort',
    hero: 'https://images.unsplash.com/photo-1750064144361-bc7d12be7a98?w=1400&h=500&fit=crop&auto=format',
    description: 'Cut from our finest microfiber and lace fabrics, our panty collection prioritizes invisible comfort without sacrificing elegance.',
  },
  sets: {
    title: 'Lingerie Sets',
    subtitle: 'Perfectly matched pairs',
    hero: 'https://images.unsplash.com/photo-1771620886948-3887ba3223f3?w=1400&h=500&fit=crop&auto=format',
    description: 'Curated bra and panty pairings in our finest fabrics. A complete set makes the most thoughtful gift — or the perfect treat for yourself.',
  },
  sleepwear: {
    title: 'Sleepwear',
    subtitle: 'For the rituals of rest',
    hero: 'https://images.unsplash.com/photo-1766056278842-b754f1e093c0?w=1400&h=500&fit=crop&auto=format',
    description: 'Pajama sets, robes, and nightgowns designed to make you feel as beautiful at home as you do anywhere else.',
  },
  lifestyle: {
    title: 'Lifestyle',
    subtitle: 'The full ritual',
    hero: 'https://images.unsplash.com/photo-1763478959183-136fe6bdcc93?w=1400&h=500&fit=crop&auto=format',
    description: 'Fragrance, accessories, and the small luxuries that complete a Zul Luz ritual — from morning to night.',
  },
  'home-fragrance': {
    title: 'Home Fragrance',
    subtitle: 'Scent your sanctuary',
    hero: 'https://images.unsplash.com/photo-1778777366990-62cd674e481a?w=1400&h=500&fit=crop&auto=format',
    description: 'Botanically inspired wax air fresheners that bring a soft, lasting scent to your wardrobe, bedroom, and living spaces.',
  },
  scrunchies: {
    title: 'Scrunchies',
    subtitle: 'A small daily luxury',
    hero: 'https://images.unsplash.com/photo-1742794555175-0e55d742d809?w=1400&h=500&fit=crop&auto=format',
    description: 'Hand-stitched satin scrunchies that protect your hair while keeping your style effortlessly polished.',
  },
  'best-sellers': {
    title: 'Best Sellers',
    subtitle: 'Our most-loved pieces',
    hero: 'https://images.unsplash.com/photo-1750064139819-da3bf362e7b3?w=1400&h=500&fit=crop&auto=format',
    description: 'The pieces our clients reach for again and again — our most loved, most gifted, and most reordered styles.',
  },
  'gift-ideas': {
    title: 'Gift Ideas',
    subtitle: 'Give the gift of elegance',
    hero: 'https://images.unsplash.com/photo-1778777366990-62cd674e481a?w=1400&h=500&fit=crop&auto=format',
    description: 'Thoughtfully curated for gifting. Each Zul Luz piece arrives in our signature packaging — beautiful the moment it\'s unwrapped.',
  },
}

export default function CategoryPage() {
  const params = useParams() ?? {}
  const pathname = usePathname() ?? ''
  const { products: catalogProducts, toggleFavorite, isFavorite } = useStore()
  const [sort, setSort] = useState<SortOption>('featured')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const header = useInView(0.05)
  const grid = useInView(0.05)

  // Determine which slug to use
  const routeValue = params.sub ?? params.category
  const slug = (Array.isArray(routeValue) ? routeValue[0] : routeValue) ?? pathname.replace(/^\//, '')
  const meta = CATEGORY_META[slug] ?? {
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    subtitle: 'Explore our collection',
    hero: 'https://images.unsplash.com/photo-1750064139819-da3bf362e7b3?w=1400&h=500&fit=crop&auto=format',
    description: '',
  }

  const scopedProducts = (() => {
    if (slug === 'best-sellers') return catalogProducts.filter(p => p.isBestSeller)
    if (slug === 'gift-ideas') return catalogProducts.filter(p => p.isGiftIdea)
    if (['lingerie', 'sleepwear', 'lifestyle'].includes(slug)) return catalogProducts.filter(p => p.category === slug)
    return catalogProducts.filter(p => p.subcategory === slug)
  })()

  const colorOptions = Array.from(
    new Map(scopedProducts.flatMap((product) => product.colors.map((color) => [color.name, color.hex]))).entries()
  ).map(([name, hex]) => ({ name, hex }))
  const sizeOptions = Array.from(new Set(scopedProducts.flatMap((product) => product.sizes)))
  const minimumPrice = getPriceValue(minPrice)
  const maximumPrice = getPriceValue(maxPrice)

  const toggleFilter = (value: string, setFilter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFilter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  const clearFilters = () => {
    setSelectedColors([])
    setSelectedSizes([])
    setMinPrice('')
    setMaxPrice('')
  }

  let products = scopedProducts.filter((product) => {
    const matchesColor = selectedColors.length === 0 || product.colors.some((color) => selectedColors.includes(color.name))
    const matchesSize = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))
    const matchesMinimumPrice = minimumPrice === null || product.price >= minimumPrice
    const matchesMaximumPrice = maximumPrice === null || product.price <= maximumPrice
    return matchesColor && matchesSize && matchesMinimumPrice && matchesMaximumPrice
  })

  // Sort
  products = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
  })

  // Breadcrumb
  const parentCategory = Array.isArray(params.category) ? params.category[0] : params.category
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...(parentCategory ? [{ label: parentCategory.charAt(0).toUpperCase() + parentCategory.slice(1), href: `/${parentCategory}` }] : []),
    { label: meta.title, href: '#' },
  ]

  return (
    <div className="bg-cream">
      {/* Hero Banner */}
      <div
        ref={header.ref}
        className={`relative overflow-hidden bg-blush transition-opacity duration-700 ${header.inView ? 'opacity-100' : 'opacity-0'}`}
        style={{ height: 'clamp(240px, 35vw, 420px)' }}
      >
        <img src={meta.hero} alt={meta.title} className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-dark/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <p className="text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-3 font-medium">{meta.subtitle}</p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-cream">{meta.title}</h1>
          {meta.description && (
            <p className="text-xs text-cream/65 mt-4 max-w-md leading-[1.8]">{meta.description}</p>
          )}
        </div>
      </div>

      {/* Breadcrumb + Controls */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-[10px] tracking-wide">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-border">/</span>}
              {crumb.href === '#' ? (
                <span className="text-dark font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-muted hover:text-wine transition-colors">{crumb.label}</Link>
              )}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted tracking-wide">{products.length} items</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.1em] uppercase text-muted">Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="text-[10px] tracking-wide text-dark bg-cream border border-border px-3 py-1.5 focus:outline-none focus:border-wine transition-colors appearance-none pr-6 cursor-pointer"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238A7468'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-5 border-y border-border/55">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <fieldset className="flex items-center gap-2" aria-label="Filter by price">
              <legend className="sr-only">Price</legend>
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Price</span>
              <label className="sr-only" htmlFor="minimum-price">Minimum price</label>
              <input id="minimum-price" inputMode="decimal" min="0" placeholder="Min" type="number" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} className="w-16 border-b border-border bg-transparent px-1 py-1 text-xs text-dark outline-none placeholder:text-muted/70 focus:border-wine" />
              <span className="text-muted">–</span>
              <label className="sr-only" htmlFor="maximum-price">Maximum price</label>
              <input id="maximum-price" inputMode="decimal" min="0" placeholder="Max" type="number" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="w-16 border-b border-border bg-transparent px-1 py-1 text-xs text-dark outline-none placeholder:text-muted/70 focus:border-wine" />
            </fieldset>

            {colorOptions.length > 0 && (
              <fieldset className="flex flex-wrap items-center gap-2" aria-label="Filter by color">
                <legend className="sr-only">Color</legend>
                <span className="mr-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Color</span>
                {colorOptions.map((color) => {
                  const isSelected = selectedColors.includes(color.name)
                  return (
                    <button key={color.name} type="button" onClick={() => toggleFilter(color.name, setSelectedColors)} aria-pressed={isSelected} title={color.name} className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-wine focus:ring-offset-2 ${isSelected ? 'border-dark ring-2 ring-wine ring-offset-2' : 'border-border'}`} style={{ backgroundColor: color.hex }} />
                  )
                })}
              </fieldset>
            )}

            {sizeOptions.length > 0 && (
              <fieldset className="flex flex-wrap items-center gap-1.5" aria-label="Filter by size">
                <legend className="sr-only">Size</legend>
                <span className="mr-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">Size</span>
                {sizeOptions.map((size) => {
                  const isSelected = selectedSizes.includes(size)
                  return (
                    <button key={size} type="button" onClick={() => toggleFilter(size, setSelectedSizes)} aria-pressed={isSelected} className={`min-w-7 border px-2 py-1 text-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-wine focus:ring-offset-2 ${isSelected ? 'border-wine bg-wine text-cream' : 'border-border text-dark hover:border-wine hover:text-wine'}`}>
                      {size}
                    </button>
                  )
                })}
              </fieldset>
            )}
          </div>

          {(selectedColors.length > 0 || selectedSizes.length > 0 || minPrice || maxPrice) && (
            <button type="button" onClick={clearFilters} className="text-left text-[10px] font-medium uppercase tracking-[0.14em] text-wine underline-offset-4 hover:underline lg:text-right">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div
        ref={grid.ref}
        className={`max-w-7xl mx-auto px-5 lg:px-10 pb-24 transition-all duration-700 ${grid.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl font-light text-dark mb-3">No products found</p>
            <p className="text-xs text-muted mb-8">Try browsing a different category.</p>
            <Link href="/" className="inline-block text-[10px] tracking-[0.15em] uppercase border-b border-dark pb-0.5 hover:text-wine hover:border-wine transition-colors">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="group"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ animationDelay: `${(i % 8) * 60}ms` }}
              >
                <div className="relative overflow-hidden bg-blush mb-4" style={{ aspectRatio: '3/4' }}>
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={hoveredId === product.id && product.images[1] ? product.images[1] : product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>

                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.tag && <span className="bg-wine text-cream text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium">{product.tag}</span>}
                    {product.isNew && !product.tag && <span className="bg-dark text-cream text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium">New</span>}
                  </div>

                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-cream/90 backdrop-blur-sm border border-border/50 transition-all duration-200 opacity-0 group-hover:opacity-100 ${isFavorite(product.id) ? 'text-wine opacity-100' : 'text-muted hover:text-wine'}`}
                    aria-label="Add to favorites"
                  >
                    <HeartIcon filled={isFavorite(product.id)} />
                  </button>

                  {/* Quick add */}
                  <div className="absolute inset-x-0 bottom-0 bg-cream/95 py-3 px-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
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
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-dark">${product.price.toFixed(2)}</p>
                  {product.originalPrice && (
                    <p className="text-[10px] text-muted line-through">${product.originalPrice.toFixed(2)}</p>
                  )}
                </div>

                {/* Color dots */}
                <div className="flex items-center gap-1.5 mt-2">
                  {product.colors.slice(0, 5).map(c => (
                    <div
                      key={c.name}
                      title={c.name}
                      className="w-3 h-3 rounded-full border border-border/60 cursor-default"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                  {product.colors.length > 5 && <span className="text-[9px] text-muted">+{product.colors.length - 5}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
