'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Product } from '@/lib/types'
import type { StorefrontCart, StorefrontCartLine } from '@/lib/shopify/cart-types'

type CartApiResponse = {
  error?: string
  cart?: StorefrontCart | null
  checkoutUrl?: string
}

type StoreContextType = {
  products: Product[]
  cart: StorefrontCartLine[]
  favorites: Product[]
  cartOpen: boolean
  cartLoading: boolean
  checkoutLoading: boolean
  cartError: string | null
  addToCart: (variantId: string, quantity: number) => Promise<boolean>
  removeFromCart: (lineId: string) => Promise<boolean>
  updateQuantity: (lineId: string, qty: number) => Promise<boolean>
  checkout: () => Promise<boolean>
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  openCart: () => void
  closeCart: () => void
  clearCartError: () => void
  cartTotal: number
  cartCount: number
  cartCurrencyCode: string
}

const EMPTY_CART: StorefrontCart = {
  lines: [],
  totalQuantity: 0,
  subtotal: { amount: 0, currencyCode: 'USD' },
  total: { amount: 0, currencyCode: 'USD' },
}

const StoreContext = createContext<StoreContextType | null>(null)

async function parseCartResponse(response: Response): Promise<CartApiResponse> {
  let payload: CartApiResponse
  try {
    payload = await response.json() as CartApiResponse
  } catch {
    throw new Error('El servidor devolvió una respuesta no válida.')
  }
  if (!response.ok) throw new Error(payload.error || 'No fue posible actualizar el carrito.')
  return payload
}

export function StoreProvider({ children, products }: { children: ReactNode; products: Product[] }) {
  const [cartState, setCartState] = useState<StorefrontCart>(EMPTY_CART)
  const [favorites, setFavorites] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [cartError, setCartError] = useState<string | null>(null)
  const cartLoaded = useRef(false)
  const cartMutationPending = useRef(false)
  const checkoutPending = useRef(false)

  const refreshCart = useCallback(async () => {
    setCartLoading(true)
    setCartError(null)
    try {
      const payload = await parseCartResponse(await fetch('/api/cart', {
        method: 'GET',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      }))
      setCartState(payload.cart ?? EMPTY_CART)
    } catch (error) {
      setCartError(error instanceof Error ? error.message : 'No fue posible recuperar el carrito.')
    } finally {
      setCartLoading(false)
    }
  }, [])

  useEffect(() => {
    if (cartLoaded.current) return
    cartLoaded.current = true
    void refreshCart()
  }, [refreshCart])

  const mutateCart = useCallback(async (method: 'POST' | 'PATCH' | 'DELETE', body: Record<string, unknown>) => {
    if (cartMutationPending.current) return false
    cartMutationPending.current = true
    setCartLoading(true)
    setCartError(null)
    try {
      const payload = await parseCartResponse(await fetch('/api/cart', {
        method,
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      }))
      setCartState(payload.cart ?? EMPTY_CART)
      return true
    } catch (error) {
      setCartError(error instanceof Error ? error.message : 'No fue posible actualizar el carrito.')
      return false
    } finally {
      cartMutationPending.current = false
      setCartLoading(false)
    }
  }, [])

  const addToCart = useCallback(async (variantId: string, quantity: number) => {
    setCartOpen(true)
    return mutateCart('POST', { variantId, quantity })
  }, [mutateCart])

  const removeFromCart = useCallback((lineId: string) => {
    return mutateCart('DELETE', { lineId })
  }, [mutateCart])

  const updateQuantity = useCallback((lineId: string, qty: number) => {
    if (qty <= 0) return mutateCart('DELETE', { lineId })
    return mutateCart('PATCH', { lineId, quantity: qty })
  }, [mutateCart])

  const checkout = useCallback(async () => {
    if (checkoutPending.current || cartState.totalQuantity < 1) return false
    checkoutPending.current = true
    setCheckoutLoading(true)
    setCartError(null)
    try {
      const payload = await parseCartResponse(await fetch('/api/cart/checkout', {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: '{}',
      }))
      if (!payload.checkoutUrl) throw new Error('Shopify no devolvió una dirección de checkout.')
      window.location.assign(payload.checkoutUrl)
      return true
    } catch (error) {
      setCartError(error instanceof Error ? error.message : 'No fue posible iniciar el checkout.')
      return false
    } finally {
      checkoutPending.current = false
      setCheckoutLoading(false)
    }
  }, [cartState.totalQuantity])

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const isFavorite = useCallback((productId: string) => {
    return favorites.some(p => p.id === productId)
  }, [favorites])

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])
  const clearCartError = useCallback(() => setCartError(null), [])

  return (
    <StoreContext.Provider value={{
      products,
      cart: cartState.lines,
      favorites,
      cartOpen,
      cartLoading,
      checkoutLoading,
      cartError,
      addToCart,
      removeFromCart,
      updateQuantity,
      checkout,
      toggleFavorite,
      isFavorite,
      openCart,
      closeCart,
      clearCartError,
      cartTotal: cartState.subtotal.amount,
      cartCount: cartState.totalQuantity,
      cartCurrencyCode: cartState.subtotal.currencyCode,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
