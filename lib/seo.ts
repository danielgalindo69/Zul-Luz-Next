import type { Product } from '@/lib/types'

/** Keep thin or placeholder product pages out of search until they are complete. */
export function hasIndexableProductContent(product: Product) {
  const hasDescription = product.description.trim().length > 0
  const hasRealImage = product.images.some((image) => image && image !== '/product-placeholder.svg')
  return hasDescription && hasRealImage
}
