// Tipos del dominio de catálogo
// Fuente única de verdad para la capa de datos — reemplazable por Shopify en fase posterior

export type ProductColor = { name: string; hex: string }

export type Product = {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  category: 'lingerie' | 'sleepwear' | 'lifestyle'
  subcategory: string
  tag?: string
  images: string[]
  description: string
  material: string
  usageGuide: string[]
  colors: ProductColor[]
  sizes: string[]
  isBestSeller?: boolean
  isNew?: boolean
  isGiftIdea?: boolean
  rating: number
  reviews: number
}

export type CartItem = {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}
