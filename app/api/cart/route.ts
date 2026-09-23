import { NextRequest, NextResponse } from 'next/server'
import {
  addCartLine,
  CartMutationError,
  CartNotFoundError,
  CartQuantityUnavailableError,
  createCart,
  getCart,
  removeCartLine,
  toStorefrontCart,
  updateCartLine,
} from '@/lib/shopify/cart'
import { StorefrontRequestError } from '@/lib/shopify/storefront-client'

export const dynamic = 'force-dynamic'

const CART_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-zulluz_cart' : 'zulluz_cart'
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30
const VARIANT_ID = /^gid:\/\/shopify\/ProductVariant\/\S{1,480}$/
const LINE_ID = /^gid:\/\/shopify\/(?:CartLine|BaseCartLine)\/\S{1,480}$/

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}

function getBuyerIp(request: NextRequest) {
  const value = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return value && value.length <= 64 ? value : undefined
}

function isAllowedMutation(request: NextRequest) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return false
  const origin = request.headers.get('origin')
  if (!origin) return true
  const host = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ?? request.headers.get('host')
  try {
    return Boolean(host && new URL(origin).host === host)
  } catch {
    return false
  }
}

function setCartCookie(response: NextResponse, cartId: string) {
  response.cookies.set({
    name: CART_COOKIE,
    value: cartId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: CART_COOKIE_MAX_AGE,
    priority: 'high',
  })
}

function clearCartCookie(response: NextResponse) {
  response.cookies.set({
    name: CART_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

function errorResponse(error: unknown) {
  if (error instanceof CartQuantityUnavailableError) {
    return json({ error: error.message, quantityLimitLineId: error.lineId }, 422)
  }
  if (error instanceof CartMutationError) return json({ error: error.message }, 422)
  if (error instanceof CartNotFoundError) return json({ error: error.message }, 410)
  if (error instanceof StorefrontRequestError) return json({ error: error.message }, error.status)
  console.error('Unexpected cart error', error)
  return json({ error: 'No fue posible actualizar el carrito.' }, 500)
}

async function readBody(request: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json()
    return body && typeof body === 'object' && !Array.isArray(body) ? body as Record<string, unknown> : null
  } catch {
    return null
  }
}

function validQuantity(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 99
}

export async function GET(request: NextRequest) {
  const cartId = request.cookies.get(CART_COOKIE)?.value
  if (!cartId) return json({ cart: null })

  try {
    const cart = await getCart(cartId, getBuyerIp(request))
    if (!cart) {
      const response = json({ cart: null })
      clearCartCookie(response)
      return response
    }
    return json({ cart: toStorefrontCart(cart) })
  } catch (error) {
    return errorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedMutation(request)) return json({ error: 'Solicitud no permitida.' }, 403)
  const body = await readBody(request)
  const variantId = body?.variantId
  const quantity = body?.quantity
  if (typeof variantId !== 'string' || !VARIANT_ID.test(variantId) || !validQuantity(quantity)) {
    return json({ error: 'La variante o la cantidad no son válidas.' }, 400)
  }

  const buyerIp = getBuyerIp(request)
  const currentCartId = request.cookies.get(CART_COOKIE)?.value
  try {
    let cart
    if (currentCartId) {
      try {
        const existingCart = await getCart(currentCartId, buyerIp)
        const existingLine = existingCart?.lines.nodes.find((line) => line.merchandise.id === variantId)
        if (existingLine) {
          const combinedQuantity = existingLine.quantity + quantity
          if (combinedQuantity > 99) {
            return json({ error: 'The maximum quantity of this item per order is 99.' }, 422)
          }
          cart = await updateCartLine(currentCartId, existingLine.id, combinedQuantity, buyerIp)
        } else if (existingCart) {
          cart = await addCartLine(currentCartId, variantId, quantity, buyerIp)
        } else {
          cart = await createCart(variantId, quantity, buyerIp)
        }
      } catch (error) {
        if (!(error instanceof CartNotFoundError) && !(error instanceof CartMutationError && /cart.*(not|doesn)/i.test(error.message))) throw error
        cart = await createCart(variantId, quantity, buyerIp)
      }
    } else {
      cart = await createCart(variantId, quantity, buyerIp)
    }

    const response = json({ cart: toStorefrontCart(cart) }, 201)
    setCartCookie(response, cart.id)
    return response
  } catch (error) {
    return errorResponse(error)
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAllowedMutation(request)) return json({ error: 'Solicitud no permitida.' }, 403)
  const cartId = request.cookies.get(CART_COOKIE)?.value
  if (!cartId) return json({ error: 'No existe un carrito activo.' }, 404)
  const body = await readBody(request)
  const lineId = body?.lineId
  const quantity = body?.quantity
  if (typeof lineId !== 'string' || !LINE_ID.test(lineId) || !validQuantity(quantity)) {
    return json({ error: 'La línea o la cantidad no son válidas.' }, 400)
  }

  try {
    const cart = await updateCartLine(cartId, lineId, quantity, getBuyerIp(request))
    return json({ cart: toStorefrontCart(cart) })
  } catch (error) {
    const response = errorResponse(error)
    if (error instanceof CartNotFoundError) clearCartCookie(response)
    return response
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAllowedMutation(request)) return json({ error: 'Solicitud no permitida.' }, 403)
  const cartId = request.cookies.get(CART_COOKIE)?.value
  if (!cartId) return json({ error: 'No existe un carrito activo.' }, 404)
  const body = await readBody(request)
  const lineId = body?.lineId
  if (typeof lineId !== 'string' || !LINE_ID.test(lineId)) {
    return json({ error: 'La línea del carrito no es válida.' }, 400)
  }

  try {
    const cart = await removeCartLine(cartId, lineId, getBuyerIp(request))
    return json({ cart: toStorefrontCart(cart) })
  } catch (error) {
    const response = errorResponse(error)
    if (error instanceof CartNotFoundError) clearCartCookie(response)
    return response
  }
}
