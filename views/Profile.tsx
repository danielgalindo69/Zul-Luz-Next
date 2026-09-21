'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useStore } from '@/context/StoreContext'

const ORDER_HISTORY = [
  { id: '#ZL-2024-0891', date: 'July 12, 2026', total: 104.98, status: 'Delivered', items: ['Ale Signature Lace Set'] },
  { id: '#ZL-2024-0754', date: 'May 3, 2026', total: 48.00, status: 'Delivered', items: ['Botanical Wax Air Freshener Set'] },
  { id: '#ZL-2024-0622', date: 'March 18, 2026', total: 117.99, status: 'Delivered', items: ['3-Piece Pajama Short Set'] },
]

export default function Profile() {
  const { favorites, toggleFavorite } = useStore()
  const [activeTab, setActiveTab] = useState<'favorites' | 'orders' | 'account'>('favorites')

  return (
    <div className="min-h-[80vh] bg-cream">
      {/* Header */}
      <div className="bg-blush-light border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-wine/10 border border-wine/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-wine">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-wine mb-1 font-medium">Welcome back</p>
              <h1 className="font-display text-2xl lg:text-3xl font-light text-dark">My Profile</h1>
              <p className="text-xs text-muted mt-1">Manage your favorites, orders, and account details.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 mt-8 border-b border-border -mb-px">
            {([
              { key: 'favorites', label: `Favorites${favorites.length > 0 ? ` (${favorites.length})` : ''}` },
              { key: 'orders', label: 'Orders' },
              { key: 'account', label: 'Account' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-[10px] tracking-[0.14em] uppercase font-medium border-b-2 transition-all duration-200 ${activeTab === tab.key ? 'border-wine text-wine' : 'border-transparent text-muted hover:text-dark'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-14">

        {/* ── Favorites Tab ─────────────────────────────────────── */}
        {activeTab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 border border-border flex items-center justify-center text-muted mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <p className="font-display text-xl font-light text-dark mb-3">No favorites yet</p>
                <p className="text-xs text-muted mb-8 max-w-xs mx-auto leading-[1.8]">
                  Browse our collections and tap the heart icon on any product to save it here.
                </p>
                <Link
                  href="/lingerie"
                  className="inline-block bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-dark transition-colors duration-300 font-medium"
                >
                  Start Exploring
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xs text-muted">{favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}</p>
                  <Link href="/lingerie" className="text-[10px] tracking-[0.14em] uppercase text-dark border-b border-dark pb-0.5 hover:text-wine hover:border-wine transition-colors">
                    Continue Shopping
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {favorites.map(product => (
                    <div key={product.id} className="group">
                      <div className="relative overflow-hidden bg-blush mb-4" style={{ aspectRatio: '3/4' }}>
                        <Link href={`/product/${product.id}`}>
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500" />
                        </Link>

                        {/* Remove favorite */}
                        <button
                          onClick={() => toggleFavorite(product)}
                          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-cream/90 border border-border/50 text-wine hover:text-muted transition-colors duration-200"
                          aria-label="Remove from favorites"
                        >
                         
                        </button>

                        {/* Quick add */}
                        <div className="absolute inset-x-0 bottom-0 bg-cream/95 py-3 px-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <Link
                            href={'/product/' + product.id}
                            className="w-full text-[9px] tracking-[0.16em] uppercase text-dark hover:text-wine transition-colors font-medium"
                          >
                            Select options
                          </Link>
                        </div>
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-xs font-medium text-dark hover:text-wine transition-colors mb-1">{product.name}</h3>
                      </Link>
                      <p className="text-[10px] text-muted mb-1">{product.subtitle}</p>
                      <p className="text-xs font-medium text-dark">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Orders Tab ────────────────────────────────────────── */}
        {activeTab === 'orders' && (
          <div>
            <p className="text-xs text-muted mb-8">Your recent orders from Zul Luz.</p>
            {ORDER_HISTORY.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-xl font-light text-dark mb-3">No orders yet</p>
                <Link href="/" className="text-[10px] tracking-[0.14em] uppercase border-b border-dark pb-0.5 hover:text-wine hover:border-wine transition-colors">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {ORDER_HISTORY.map(order => (
                  <div key={order.id} className="border border-border p-5 lg:p-6 hover:border-wine/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs font-medium text-dark tracking-wide">{order.id}</p>
                        <p className="text-[10px] text-muted mt-0.5">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 bg-wine/10 text-wine font-medium">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                          {order.status}
                        </span>
                        <span className="text-sm font-display font-light text-dark">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="border-t border-border/50 pt-3">
                      <p className="text-[10px] text-muted">
                        {order.items.join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <button className="text-[10px] tracking-[0.12em] uppercase text-dark border-b border-dark pb-0.5 hover:text-wine hover:border-wine transition-colors">
                        Track Order
                      </button>
                      <button className="text-[10px] tracking-[0.12em] uppercase text-muted border-b border-muted pb-0.5 hover:text-wine hover:border-wine transition-colors">
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Account Tab ───────────────────────────────────────── */}
        {activeTab === 'account' && (
          <div className="max-w-lg">
            <p className="text-xs text-muted mb-8">Manage your personal information and preferences.</p>

            <div className="space-y-5">
              {[
                { label: 'Full Name', placeholder: 'Your name', type: 'text' },
                { label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                { label: 'Phone Number', placeholder: '+1 (555) 000-0000', type: 'tel' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-[10px] tracking-[0.14em] uppercase text-dark font-medium mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 text-xs border border-border bg-cream text-dark placeholder-muted focus:outline-none focus:border-wine transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[10px] tracking-[0.14em] uppercase text-dark font-medium mb-2">Country</label>
                <select className="w-full px-4 py-3 text-xs border border-border bg-cream text-dark focus:outline-none focus:border-wine transition-colors appearance-none">
                  <option>United States</option>
                  <option>Colombia</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="pt-2">
                <button className="bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-dark transition-colors duration-300 font-medium">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-[10px] tracking-[0.14em] uppercase text-dark font-medium mb-5">Notifications</p>
              <div className="space-y-4">
                {[
                  { label: 'New arrivals and collections', defaultChecked: true },
                  { label: 'Exclusive offers and promotions', defaultChecked: true },
                  { label: 'Order updates', defaultChecked: true },
                ].map(pref => (
                  <label key={pref.label} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked={pref.defaultChecked} className="accent-wine w-4 h-4" />
                    <span className="text-xs text-dark group-hover:text-wine transition-colors">{pref.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
