import type { Product } from './types'

export type { Product } from './types'

// ─── Datos simulados ──────────────────────────────────────────────────────────
// Copia fiel del origen React. La interfaz CatalogRepository permite sustituir
// esta implementación por Shopify Storefront API en la siguiente fase sin
// modificar los componentes visuales.

export const PRODUCTS: Product[] = [
  // ─── LINGERIE / BRAS ───────────────────────────────────────────────────────
  {
    id: 'ale-lace-bra',
    name: 'Ale Premium Lace Bra',
    subtitle: 'Elegant Supportive Lingerie',
    price: 68.99,
    category: 'lingerie',
    subcategory: 'bras',
    tag: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1718963884192-69be3b1203e4?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606245455176-a30c1c36a6ad?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1777462985111-9da64fb2e6e6?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'The Ale Premium Lace Bra is our signature piece — a delicate balance of structure and softness. Crafted from our finest microfiber lace, it offers gentle support while feeling weightless against your skin.',
    material:
      '62% Polyamide, 28% Elastane, 10% Cotton. Hand wash cold. Lay flat to dry. Do not bleach.',
    usageGuide: [
      'Measure your band size and cup size before ordering. Refer to our Size Guide for detailed instructions.',
      'Hand wash with a gentle lingerie wash in cool water to preserve the lace and extend the garment\'s life.',
      'Store flat or rolled — never folded — to maintain the cup shape.',
      'Rotate between at least 3 bras to allow the elastic to recover between wears.',
    ],
    colors: [
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Wine', hex: '#8C3F55' },
      { name: 'Black', hex: '#1A1108' },
      { name: 'Blush', hex: '#E8C4C4' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    isGiftIdea: true,
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 'luna-soft-bra',
    name: 'Luna Soft Cup Bra',
    subtitle: 'Wire-free daily comfort',
    price: 54.99,
    category: 'lingerie',
    subcategory: 'bras',
    images: [
      'https://images.unsplash.com/photo-1606245455176-a30c1c36a6ad?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1718963884192-69be3b1203e4?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1750064144361-bc7d12be7a98?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'The Luna Soft Cup Bra is built for all-day ease. No wires, no pressure points — just a seamless embrace that moves with you from morning to night.',
    material: '78% Microfiber Polyamide, 22% Elastane. Machine wash cold on delicate cycle.',
    usageGuide: [
      'This wire-free design works best for sizes XS–L.',
      'Machine wash in a lingerie bag on a cold gentle cycle.',
      'Remove immediately from the machine and reshape while damp.',
      'Air dry away from direct sunlight to preserve color.',
    ],
    colors: [
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Mauve', hex: '#B88B9E' },
      { name: 'Black', hex: '#1A1108' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    rating: 4.7,
    reviews: 58,
  },
  // ─── LINGERIE / PANTIES ────────────────────────────────────────────────────
  {
    id: 'ale-hipster-panty',
    name: 'Ale Hipster Panty',
    subtitle: 'Microfiber & Lace',
    price: 35.99,
    category: 'lingerie',
    subcategory: 'panties',
    tag: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1750064144361-bc7d12be7a98?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1742794555175-0e55d742d809?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1777462985111-9da64fb2e6e6?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'The Ale Hipster Panty pairs a smooth microfiber front with a delicate lace back panel, offering coverage that feels effortlessly elegant.',
    material: '68% Polyamide, 24% Elastane, 8% Cotton gusset. Hand wash cold.',
    usageGuide: [
      'The hipster cut sits at the natural hip — great for high-waisted bottoms.',
      'Hand wash or use a lingerie mesh bag in the washing machine on cold.',
      'The lace back panel is delicate — avoid wringing or twisting.',
    ],
    colors: [
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Wine', hex: '#8C3F55' },
      { name: 'Black', hex: '#1A1108' },
      { name: 'Blush', hex: '#E8C4C4' },
      { name: 'Mauve', hex: '#B88B9E' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    rating: 4.8,
    reviews: 213,
  },
  {
    id: 'ale-brazilian-thong',
    name: 'Ale Brazilian Thong',
    subtitle: 'Second-skin microfiber',
    price: 33.99,
    category: 'lingerie',
    subcategory: 'panties',
    images: [
      'https://images.unsplash.com/photo-1777462985111-9da64fb2e6e6?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606245455176-a30c1c36a6ad?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1718963884192-69be3b1203e4?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'Crafted from our ultra-soft second-skin microfiber, the Ale Brazilian Thong disappears beneath clothing while feeling impossibly gentle.',
    material: '80% Polyamide, 20% Elastane. Hand wash cold. Do not tumble dry.',
    usageGuide: [
      'The Brazilian cut provides minimal coverage with maximum comfort.',
      'Hand wash only to preserve the microfiber texture.',
    ],
    colors: [
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Black', hex: '#1A1108' },
      { name: 'Blush', hex: '#E8C4C4' },
      { name: 'Wine', hex: '#8C3F55' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 89,
  },
  // ─── LINGERIE / SETS ───────────────────────────────────────────────────────
  {
    id: 'ale-lace-set',
    name: 'Ale Signature Lace Set',
    subtitle: 'Bra & Hipster Panty',
    price: 99.99,
    originalPrice: 104.98,
    category: 'lingerie',
    subcategory: 'sets',
    tag: 'Save 5%',
    images: [
      'https://images.unsplash.com/photo-1771620886948-3887ba3223f3?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1718963884192-69be3b1203e4?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606245455176-a30c1c36a6ad?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'The Ale Signature Lace Set pairs our best-selling Premium Lace Bra with the matching Hipster Panty — a perfectly curated duo in our signature lace.',
    material: 'Bra: 62% Polyamide, 28% Elastane, 10% Cotton. Panty: 68% Polyamide, 24% Elastane, 8% Cotton.',
    usageGuide: [
      'Store the set together in the included Zul Luz cotton pouch.',
      'Hand wash each piece separately in cool water with a gentle wash.',
    ],
    colors: [
      { name: 'Wine', hex: '#8C3F55' },
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Black', hex: '#1A1108' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    isGiftIdea: true,
    rating: 4.9,
    reviews: 176,
  },
  // ─── SLEEPWEAR ─────────────────────────────────────────────────────────────
  {
    id: 'pajama-short-set',
    name: '3-Piece Pajama Short Set',
    subtitle: 'Delicate silk-touch fabric',
    price: 117.99,
    category: 'sleepwear',
    subcategory: 'pajama-sets',
    tag: 'New',
    images: [
      'https://images.unsplash.com/photo-1770294760762-1cd821ecc567?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1770294758942-7ce9ca052986?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1766056278842-b754f1e093c0?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'Three pieces, endless combinations. This short pajama set includes a camisole top, matching shorts, and an open-front robe — all in our signature silk-touch satin weave.',
    material: '100% Polyester satin weave (silk-touch finish). Machine wash cold gentle. Tumble dry low.',
    usageGuide: [
      'Wear the full trio for a coordinated bedside look, or mix pieces into everyday outfits.',
      'Machine wash cold on delicate; use a mesh bag to protect the satin weave.',
    ],
    colors: [
      { name: 'Blush Pink', hex: '#E8C4C4' },
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Dusty Sage', hex: '#9CAF88' },
      { name: 'Navy', hex: '#2B3A5C' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isGiftIdea: true,
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 'silk-robe',
    name: 'Catalina Silk Robe',
    subtitle: 'Long-length, belt-tie',
    price: 134.99,
    category: 'sleepwear',
    subcategory: 'robes',
    images: [
      'https://images.unsplash.com/photo-1750064167601-a56c905f7f20?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1750064139819-da3bf362e7b3?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1742794555175-0e55d742d809?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'The Catalina Silk Robe is the cornerstone of the Zul Luz ritual. Floor-length with wide lapels and deep side pockets, it wraps you in effortless elegance.',
    material: '95% Mulberry Silk, 5% Elastane. Dry clean recommended. Hand wash cold as alternative.',
    usageGuide: [
      'Dry clean for best results.',
      'Never wring or twist silk. Press a towel against the fabric to absorb moisture.',
      'Hang immediately and let air dry on a padded hanger.',
    ],
    colors: [
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Blush', hex: '#E8C4C4' },
      { name: 'Wine', hex: '#8C3F55' },
      { name: 'Black', hex: '#1A1108' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    isGiftIdea: true,
    rating: 4.8,
    reviews: 92,
  },
  {
    id: 'silk-nightgown',
    name: 'Sofia Silk Nightgown',
    subtitle: 'Midi-length slip dress',
    price: 89.99,
    category: 'sleepwear',
    subcategory: 'nightgowns',
    images: [
      'https://images.unsplash.com/photo-1750064164897-093dc853c98a?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1778777366990-62cd674e481a?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1763478959183-136fe6bdcc93?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'The Sofia Nightgown is the wearable poem of our collection — a bias-cut midi slip that drapes naturally with every movement.',
    material: '92% Polyester charmeuse (silk-feel), 8% Elastane. Machine wash cold gentle.',
    usageGuide: [
      'Wear as sleepwear, a slip dress, or a summer layer under a blazer.',
      'Machine wash on a gentle cold cycle in a lingerie mesh bag.',
    ],
    colors: [
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Mauve', hex: '#B88B9E' },
      { name: 'Black', hex: '#1A1108' },
      { name: 'Dusty Sage', hex: '#9CAF88' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 43,
  },
  {
    id: 'long-pajama-set',
    name: 'Noche Long Pajama Set',
    subtitle: 'Button-front shirt & wide-leg pants',
    price: 109.99,
    category: 'sleepwear',
    subcategory: 'pajama-sets',
    images: [
      'https://images.unsplash.com/photo-1766056278842-b754f1e093c0?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1763478959183-136fe6bdcc93?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1770294758942-7ce9ca052986?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'The Noche Set reinterprets the classic pajama in silk-touch satin. A relaxed button-front shirt with a notch collar meets wide-leg trousers.',
    material: '100% Polyester satin weave. Machine wash cold gentle. Lay flat to dry.',
    usageGuide: [
      'The button-front shirt can be worn tucked or untucked as casual daywear.',
      'Machine wash in a mesh bag; avoid high heat which can dull the satin sheen.',
    ],
    colors: [
      { name: 'Ivory', hex: '#F5EDE4' },
      { name: 'Navy', hex: '#2B3A5C' },
      { name: 'Blush Pink', hex: '#E8C4C4' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isGiftIdea: true,
    rating: 4.6,
    reviews: 38,
  },
  // ─── LIFESTYLE ─────────────────────────────────────────────────────────────
  {
    id: 'botanical-wax-freshener',
    name: 'Botanical Wax Air Freshener Set',
    subtitle: 'Create Your Own Scent',
    price: 48.0,
    category: 'lifestyle',
    subcategory: 'home-fragrance',
    tag: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1763478959183-136fe6bdcc93?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1778777366990-62cd674e481a?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1750064164897-093dc853c98a?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'Our Botanical Wax Air Freshener Set lets you craft your own personal scent ritual. The kit includes three natural soy-wax tablets infused with pressed botanicals.',
    material: 'Soy wax base, pressed dried botanicals, natural fragrance oils. Each tablet lasts 4–8 weeks.',
    usageGuide: [
      'Place a tablet in the wooden holder and position near a heat source or airflow.',
      'Each set includes 3 tablets. Replace when the scent fades (typically 4–8 weeks).',
    ],
    colors: [
      { name: 'Lavender', hex: '#C3B1D4' },
      { name: 'Rose', hex: '#E8C4C4' },
      { name: 'White Tea', hex: '#F5EDE4' },
    ],
    sizes: ['One Size'],
    isBestSeller: true,
    isGiftIdea: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 'scrunchies-set',
    name: 'Satin Scrunchie Set',
    subtitle: '5-piece gift collection',
    price: 28.0,
    category: 'lifestyle',
    subcategory: 'scrunchies',
    tag: 'Gift Ready',
    images: [
      'https://images.unsplash.com/photo-1742794555175-0e55d742d809?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1750064164897-093dc853c98a?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606245455176-a30c1c36a6ad?w=800&h=1000&fit=crop&auto=format',
    ],
    description:
      'Five hand-stitched satin scrunchies in our signature palette — a small daily luxury that protects your hair while keeping your look polished.',
    material: '100% Polyester satin exterior. Soft elastic core. Hand wash cold. Air dry.',
    usageGuide: [
      'Use daily — the satin surface is gentle enough for all hair types and textures.',
      'Sleep with a scrunchie rather than a hair tie to prevent creasing and breakage.',
    ],
    colors: [
      { name: 'Mixed Set', hex: '#E8C4C4' },
      { name: 'Wine Set', hex: '#8C3F55' },
      { name: 'Neutral Set', hex: '#F5EDE4' },
    ],
    sizes: ['One Size'],
    isGiftIdea: true,
    rating: 4.8,
    reviews: 204,
  },
]

// ─── CatalogRepository interface ──────────────────────────────────────────────
// Sustituir la implementación MockCatalog por ShopifyCatalog en la siguiente
// fase sin modificar los componentes visuales que la consumen.

export interface CatalogRepository {
  getProducts(): Promise<Product[]>
  getProductByHandle(handle: string): Promise<Product | null>
  getProductsByCategory(category: string): Promise<Product[]>
  getProductsBySubcategory(subcategory: string): Promise<Product[]>
  getBestSellers(): Promise<Product[]>
  getGiftIdeas(): Promise<Product[]>
}

class MockCatalog implements CatalogRepository {
  async getProducts() { return PRODUCTS }
  async getProductByHandle(handle: string) { return PRODUCTS.find(p => p.id === handle) ?? null }
  async getProductsByCategory(category: string) { return PRODUCTS.filter(p => p.category === category) }
  async getProductsBySubcategory(subcategory: string) { return PRODUCTS.filter(p => p.subcategory === subcategory) }
  async getBestSellers() { return PRODUCTS.filter(p => p.isBestSeller) }
  async getGiftIdeas() { return PRODUCTS.filter(p => p.isGiftIdea) }
}

export const catalog: CatalogRepository = new MockCatalog()

export const getProductById = (id: string) => PRODUCTS.find((product) => product.id === id)
export const getBestSellers = () => PRODUCTS.filter((product) => product.isBestSeller)
export const getGiftIdeas = () => PRODUCTS.filter((product) => product.isGiftIdea)