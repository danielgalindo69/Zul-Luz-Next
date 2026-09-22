import { NextRequest, NextResponse } from 'next/server'
import { getCart } from '@/lib/shopify/cart'
import { StorefrontRequestError } from '@/lib/shopify/storefront-client'

export const dynamic = 'force-dynamic'

const CART_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-zulluz_cart' : 'zulluz_cart'

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  const host = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ?? request.headers.get('host')
  try {
    return Boolean(host && new URL(origin).host === host)
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return json({ error: 'Solicitud no permitida.' }, 403)
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return json({ error: 'El tipo de contenido no es válido.' }, 415)
  }
  const cartId = request.cookies.get(CART_COOKIE)?.value
  if (!cartId) return json({ error: 'Tu carrito está vacío.' }, 404)

  try {
    const buyerIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const cart = await getCart(cartId, buyerIp && buyerIp.length <= 64 ? buyerIp : undefined)
    if (!cart || cart.totalQuantity < 1) {
      const response = json({ error: 'Tu carrito está vacío o ya no está disponible.' }, 410)
      response.cookies.delete(CART_COOKIE)
      return response
    }

    const checkoutUrl = new URL(cart.checkoutUrl)
    if (checkoutUrl.protocol !== 'https:') return json({ error: 'Shopify devolvió un checkout no seguro.' }, 502)
    return NextResponse.json(
      { checkoutUrl: checkoutUrl.toString() },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    )
  } catch (error) {
    if (error instanceof StorefrontRequestError) return json({ error: error.message }, error.status)
    console.error('Unexpected checkout error', error)
    return json({ error: 'No fue posible iniciar el checkout.' }, 500)
  }
}
