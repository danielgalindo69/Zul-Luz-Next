import { catalog } from '@/lib/catalog-server'
import { absoluteUrl } from '@/lib/site'
import { hasIndexableProductContent } from '@/lib/seo'

type Context = { params: Promise<{ id: string }> }

/** Shopify product URLs should resolve with HTTP redirects, not streamed HTML. */
export async function GET(_request: Request, { params }: Context) {
  const { id } = await params
  const product = await catalog.getProductByHandle(id)

  if (!product || !hasIndexableProductContent(product)) {
    return new Response(null, { status: 404 })
  }

  return Response.redirect(absoluteUrl(`/product/${encodeURIComponent(product.id)}`), 308)
}

export const HEAD = GET
