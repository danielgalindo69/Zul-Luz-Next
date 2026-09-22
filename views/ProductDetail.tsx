'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useStore } from '@/context/StoreContext'
import { HeartIcon } from '@/components/Layout'
import type { Product } from '@/lib/types'

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export default function ProductDetail({ product }: { product: Product }) {
  const { products, addToCart, cartLoading, toggleFavorite, isFavorite } = useStore()

  const [activeImg, setActiveImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [variantError, setVariantError] = useState(false)
  const color = product.colors[selectedColor]?.name ?? 'Standard'
  const size = selectedSize || product.sizes[0]
  const selectedVariant = product.variants?.find((variant) =>
    (!product.colorOptionName || variant.selectedOptions.some((option) =>
      option.name === product.colorOptionName && option.value === color)) &&
    (!product.sizeOptionName || variant.selectedOptions.some((option) =>
      option.name === product.sizeOptionName && option.value === size))
  )
  const displayPrice = selectedVariant?.price ?? product.price

  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes[0] !== 'One Size') {
      setSizeError(true)
      return
    }
    setSizeError(false)
    if (!selectedVariant || !selectedVariant.availableForSale) {
      setVariantError(true)
      return
    }
    setVariantError(false)
    const added = await addToCart(selectedVariant.id, quantity)
    if (added) {
      setAddedFeedback(true)
      setTimeout(() => setAddedFeedback(false), 2000)
    }
  }

  const toggleAccordion = (key: string) => setOpenAccordion(prev => prev === key ? null : key)

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/${product.category}` },
    { label: product.name, href: '#' },
  ]

  return (
    <div className="bg-cream">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-[10px] tracking-wide">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-border">/</span>}
              {crumb.href === '#' ? (
                <span className="text-dark font-medium truncate max-w-[200px]">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-muted hover:text-wine transition-colors">{crumb.label}</Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 lg:gap-16">

          {/* Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-16 h-20 sm:w-16 sm:h-20 overflow-hidden bg-blush border-2 transition-all duration-200 ${activeImg === i ? 'border-wine' : 'border-transparent hover:border-border'}`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 overflow-hidden bg-blush" style={{ aspectRatio: '3/4', maxHeight: '620px' }}>
              <img
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-wine text-cream text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium">{product.tag}</span>
              )}
              {product.isNew && !product.tag && (
                <span className="absolute top-4 left-4 bg-dark text-cream text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium">New</span>
              )}
              {/* Prev/Next */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => Math.max(0, i - 1))}
                    disabled={activeImg === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center disabled:opacity-30 hover:bg-cream transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={() => setActiveImg(i => Math.min(product.images.length - 1, i + 1))}
                    disabled={activeImg === product.images.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream/80 flex items-center justify-center disabled:opacity-30 hover:bg-cream transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Name & rating */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-wine mb-2 font-medium">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
              <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-light text-dark leading-tight mb-2">{product.name}</h1>
              <p className="text-xs text-muted mb-4">{product.subtitle}</p>
              {product.reviews > 0 && <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 text-wine">
                  {[1, 2, 3, 4, 5].map(n => <StarIcon key={n} filled={n <= Math.round(product.rating)} />)}
                </div>
                <span className="text-xs text-muted">{product.rating} ({product.reviews} reviews)</span>
              </div>}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-7 pb-7 border-b border-border">
              <span className="font-display text-2xl font-light text-dark">${displayPrice.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="text-xs text-wine font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Color picker */}
            {product.colorOptionName && <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.14em] uppercase text-dark font-medium">Color</span>
                <span className="text-xs text-muted">{color}</span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => { setSelectedColor(i); setVariantError(false) }}
                    title={color.name}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === i ? 'border-wine scale-110' : 'border-border hover:border-muted'}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === i && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color.hex < '#888' ? '#fff' : '#1A1108'} strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>}

            {/* Size picker */}
            {product.sizes[0] !== 'One Size' && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] tracking-[0.14em] uppercase font-medium ${sizeError ? 'text-wine' : 'text-dark'}`}>
                    Size {sizeError && <span className="font-normal normal-case tracking-normal">— Please select a size</span>}
                  </span>
                  <Link href="/size-guide" className="text-[10px] text-wine underline underline-offset-2 hover:text-dark transition-colors">
                    Size Guide
                  </Link>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); setVariantError(false) }}
                      className={`min-w-[44px] h-10 px-3 border text-xs transition-all duration-200 font-medium ${selectedSize === size ? 'border-wine bg-wine text-cream' : 'border-border text-dark hover:border-dark'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {variantError && (
              <p className="mb-5 text-xs text-wine" role="alert">Esta combinación no está disponible. Prueba otra talla o color.</p>
            )}

            {/* Quantity */}
            <div className="mb-7">
              <span className="text-[10px] tracking-[0.14em] uppercase text-dark font-medium block mb-3">Quantity</span>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 border border-border flex items-center justify-center text-dark hover:border-wine hover:text-wine transition-colors text-sm"
                >−</button>
                <span className="w-12 h-10 border-t border-b border-border flex items-center justify-center text-sm text-dark font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 border border-border flex items-center justify-center text-dark hover:border-wine hover:text-wine transition-colors text-sm"
                >+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-7">
              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className={`flex-1 py-4 text-[10px] tracking-[0.18em] uppercase font-medium transition-all duration-300 disabled:cursor-wait disabled:opacity-60 ${addedFeedback ? 'bg-dark text-cream' : 'bg-wine text-cream hover:bg-dark'}`}
              >
                {cartLoading ? 'Adding…' : addedFeedback ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-200 ${isFavorite(product.id) ? 'border-wine text-wine bg-wine/5' : 'border-border text-muted hover:border-wine hover:text-wine'}`}
                aria-label="Save to favorites"
              >
                <HeartIcon filled={isFavorite(product.id)} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-border">
              {[
                { icon: '🚚', label: 'Free shipping over $150' },
                { icon: '↩', label: 'Easy 30-day returns' },
                { icon: '🇨🇴', label: 'Made in Colombia' },
              ].map(badge => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span className="text-sm">{badge.icon}</span>
                  <span className="text-[10px] text-muted tracking-wide">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            {[
              {
                key: 'description',
                label: 'Description',
                content: <p className="text-xs text-muted leading-[1.9]">{product.description}</p>,
              },
              {
                key: 'material',
                label: 'Material & Care',
                content: <p className="text-xs text-muted leading-[1.9]">{product.material}</p>,
              },
              {
                key: 'usage',
                label: 'How to Wear & Care',
                content: (
                  <ul className="space-y-2">
                    {product.usageGuide.map((tip, i) => (
                      <li key={i} className="flex gap-3 text-xs text-muted leading-[1.8]">
                        <span className="text-wine flex-shrink-0 mt-0.5">✦</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].filter(section => section.key === 'description' ||
              (section.key === 'material' && Boolean(product.material)) ||
              (section.key === 'usage' && product.usageGuide.length > 0)).map(section => (
              <div key={section.key} className="border-b border-border last:border-0">
                <button
                  onClick={() => toggleAccordion(section.key)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-[10px] tracking-[0.14em] uppercase text-dark font-medium">{section.label}</span>
                  <ChevronIcon open={openAccordion === section.key} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion === section.key ? 'max-h-[400px] pb-5' : 'max-h-0'}`}>
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-blush-light">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-3 font-medium">You may also like</p>
              <h2 className="font-display text-2xl lg:text-3xl font-light text-dark">Complete Your Collection</h2>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {related.map(p => (
                <div key={p.id} className="group">
                  <div className="relative overflow-hidden bg-blush mb-4" style={{ aspectRatio: '3/4' }}>
                    <Link href={`/product/${p.id}`}>
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-500" />
                    </Link>
                    <button
                      onClick={() => toggleFavorite(p)}
                      className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-cream/90 border border-border/50 opacity-100 transition-all duration-200 lg:opacity-0 lg:group-hover:opacity-100 ${isFavorite(p.id) ? 'text-wine lg:opacity-100' : 'text-muted hover:text-wine'}`}
                    >
                      <HeartIcon filled={isFavorite(p.id)} />
                    </button>
                  </div>
                  <Link href={`/product/${p.id}`}>
                    <h3 className="text-xs font-medium text-dark hover:text-wine transition-colors mb-1">{p.name}</h3>
                  </Link>
                  <p className="text-xs font-medium text-dark">${p.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
