export type CartMoney = {
  amount: number
  currencyCode: string
}

export type StorefrontCartLine = {
  id: string
  quantity: number
  merchandiseId: string
  productHandle: string
  productTitle: string
  variantTitle: string
  image: { url: string; altText: string | null } | null
  selectedOptions: { name: string; value: string }[]
  unitPrice: CartMoney
  total: CartMoney
  availableForSale: boolean
  canUpdateQuantity: boolean
  canRemove: boolean
}

export type StorefrontCart = {
  lines: StorefrontCartLine[]
  totalQuantity: number
  subtotal: CartMoney
  total: CartMoney
}
