'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '@/lib/types'

export type CartItem = {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}

type StoreContextType = {
  cart: CartItem[]
  favorites: Product[]
  cartOpen: boolean
  addToCart: (product: Product, quantity: number, color: string, size: string) => void
  removeFromCart: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, qty: number) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  openCart: () => void
  closeCart: () => void
  cartTotal: number
  cartCount: number
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((product: Product, quantity: number, color: string, size: string) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
      )
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: string, color: string, size: string) => {
    setCart(prev =>
      prev.filter(
        i => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size)
      )
    )
  }, [])

  const updateQuantity = useCallback((productId: string, color: string, size: string, qty: number) => {
    if (qty <= 0) { removeFromCart(productId, color, size); return }
    setCart(prev =>
      prev.map(i =>
        i.product.id === productId && i.selectedColor === color && i.selectedSize === size
          ? { ...i, quantity: qty }
          : i
      )
    )
  }, [removeFromCart])

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

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <StoreContext.Provider value={{
      cart, favorites, cartOpen,
      addToCart, removeFromCart, updateQuantity,
      toggleFavorite, isFavorite,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      cartTotal, cartCount,
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
