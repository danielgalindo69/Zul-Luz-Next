import 'server-only'

import { storefrontRequest } from './storefront-client'
import type { CartMoney, StorefrontCart, StorefrontCartLine } from './cart-types'

type RawMoney = { amount: string; currencyCode: string }
type RawCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: { subtotalAmount: RawMoney; totalAmount: RawMoney }
  lines: {
    nodes: {
      id: string
      quantity: number
      cost: { totalAmount: RawMoney }
      merchandise: {
        id: string
        title: string
        availableForSale: boolean
        selectedOptions: { name: string; value: string }[]
        price: RawMoney
        image: { url: string; altText: string | null } | null
        product: { handle: string; title: string }
      }
    }[]
  }
}

type UserError = { field: string[] | null; message: string; code?: string }
type CartPayload = { cart: RawCart | null; userErrors: UserError[] }

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            selectedOptions { name value }
            price { amount currencyCode }
            image { url altText }
            product { handle title }
          }
        }
      }
    }
  }
`

const CART_QUERY = `${CART_FRAGMENT}
  query Cart($id: ID!) {
    cart(id: $id) { ...CartFields }
  }
`

const CART_CREATE = `${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
      userErrors { field message code }
    }
  }
`

const CART_LINES_ADD = `${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message code }
    }
  }
`

const CART_LINES_UPDATE = `${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message code }
    }
  }
`

const CART_LINES_REMOVE = `${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message code }
    }
  }
`

export class CartMutationError extends Error {
  constructor(readonly userErrors: UserError[]) {
    super(userErrors.map((error) => error.message).join('; ') || 'Shopify rechazó la operación del carrito.')
    this.name = 'CartMutationError'
  }
}

export class CartNotFoundError extends Error {
  constructor() {
    super('El carrito ya no existe.')
    this.name = 'CartNotFoundError'
  }
}

function money(value: RawMoney): CartMoney {
  return { amount: Number(value.amount), currencyCode: value.currencyCode }
}

export function toStorefrontCart(cart: RawCart): StorefrontCart {
  const lines: StorefrontCartLine[] = cart.lines.nodes.map((line) => ({
    id: line.id,
    quantity: line.quantity,
    merchandiseId: line.merchandise.id,
    productHandle: line.merchandise.product.handle,
    productTitle: line.merchandise.product.title,
    variantTitle: line.merchandise.title,
    image: line.merchandise.image,
    selectedOptions: line.merchandise.selectedOptions,
    unitPrice: money(line.merchandise.price),
    total: money(line.cost.totalAmount),
    availableForSale: line.merchandise.availableForSale,
  }))

  return {
    lines,
    totalQuantity: cart.totalQuantity,
    subtotal: money(cart.cost.subtotalAmount),
    total: money(cart.cost.totalAmount),
  }
}

function requireCart(payload: CartPayload): RawCart {
  if (payload.userErrors.length > 0) throw new CartMutationError(payload.userErrors)
  if (!payload.cart) throw new CartNotFoundError()
  return payload.cart
}

export async function getCart(cartId: string, buyerIp?: string): Promise<RawCart | null> {
  const data = await storefrontRequest<{ cart: RawCart | null }>(
    CART_QUERY,
    { id: cartId },
    { buyerIp, cache: 'no-store' },
  )
  return data.cart
}

export async function createCart(variantId: string, quantity: number, buyerIp?: string) {
  const data = await storefrontRequest<{ cartCreate: CartPayload }>(
    CART_CREATE,
    { lines: [{ merchandiseId: variantId, quantity }] },
    { buyerIp, cache: 'no-store' },
  )
  return requireCart(data.cartCreate)
}

export async function addCartLine(cartId: string, variantId: string, quantity: number, buyerIp?: string) {
  const data = await storefrontRequest<{ cartLinesAdd: CartPayload }>(
    CART_LINES_ADD,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    { buyerIp, cache: 'no-store' },
  )
  return requireCart(data.cartLinesAdd)
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number, buyerIp?: string) {
  const data = await storefrontRequest<{ cartLinesUpdate: CartPayload }>(
    CART_LINES_UPDATE,
    { cartId, lines: [{ id: lineId, quantity }] },
    { buyerIp, cache: 'no-store' },
  )
  return requireCart(data.cartLinesUpdate)
}

export async function removeCartLine(cartId: string, lineId: string, buyerIp?: string) {
  const data = await storefrontRequest<{ cartLinesRemove: CartPayload }>(
    CART_LINES_REMOVE,
    { cartId, lineIds: [lineId] },
    { buyerIp, cache: 'no-store' },
  )
  return requireCart(data.cartLinesRemove)
}
