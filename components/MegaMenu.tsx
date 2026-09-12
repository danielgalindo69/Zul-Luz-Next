'use client'

import { ActiveLink } from './ActiveLink'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ChevronDown, ChevronRight, Sparkles, Star, Tag, Gift, Heart, Package, Shirt, Moon, Home, Box, Flower2 } from 'lucide-react'
import { clsx } from 'clsx'

export const NAV_DATA = [
  {
    label: 'Lingerie',
    href: '/lingerie',
    icon: Heart,
    featured: true,
    columns: [
      {
        title: 'Bras & Bralettes',
        items: [
          { label: 'Lace Bras', href: '/lingerie?type=lace-bras' },
          { label: 'Bralettes', href: '/lingerie?type=bralettes' },
          { label: 'Push-Up', href: '/lingerie?type=push-up' },
          { label: 'Strapless', href: '/lingerie?type=strapless' },
          { label: 'Sports Bras', href: '/lingerie?type=sports' },
        ],
      },
      {
        title: 'Panties & Briefs',
        items: [
          { label: 'Briefs', href: '/lingerie?type=briefs' },
          { label: 'Thongs', href: '/lingerie?type=thongs' },
          { label: 'Bikinis', href: '/lingerie?type=bikinis' },
          { label: 'High Waisted', href: '/lingerie?type=high-waisted' },
          { label: 'Seamless', href: '/lingerie?type=seamless' },
        ],
      },
      {
        title: 'Sets & Bundles',
        items: [
          { label: 'Lace Sets', href: '/lingerie?type=lace-sets' },
          { label: 'Everyday Sets', href: '/lingerie?type=everyday-sets' },
          { label: 'Bridal Sets', href: '/lingerie?type=bridal' },
          { label: 'Mix & Match', href: '/lingerie?type=mix-match' },
        ],
      },
      {
        title: 'Specialty',
        items: [
          { label: 'Shapewear', href: '/lingerie?type=shapewear' },
          { label: 'Bodysuits', href: '/lingerie?type=bodysuits' },
          { label: 'Garters & Hosiery', href: '/lingerie?type=garters' },
        ],
      },
    ],
  },
  {
    label: 'Sleepwear',
    href: '/sleepwear',
    icon: Moon,
    columns: [
      {
        title: 'Pajama Sets',
        items: [
          { label: 'Silk Sets', href: '/sleepwear?type=silk-sets' },
          { label: 'Cotton Sets', href: '/sleepwear?type=cotton-sets' },
          { label: 'Modal Sets', href: '/sleepwear?type=modal-sets' },
          { label: 'Short Sets', href: '/sleepwear?type=short-sets' },
          { label: 'Long Sets', href: '/sleepwear?type=long-sets' },
        ],
      },
      {
        title: 'Robes & Kimonos',
        items: [
          { label: 'Silk Robes', href: '/sleepwear?type=silk-robes' },
          { label: 'Satin Kimonos', href: '/sleepwear?type=kimonos' },
          { label: 'Plush Robes', href: '/sleepwear?type=plush' },
          { label: 'Lightweight', href: '/sleepwear?type=lightweight' },
        ],
      },
      {
        title: 'Nightgowns',
        items: [
          { label: 'Silk Chemises', href: '/sleepwear?type=chemises' },
          { label: 'Long Gowns', href: '/sleepwear?type=long-gowns' },
          { label: 'Short Nighties', href: '/sleepwear?type=short-nighties' },
        ],
      },
      {
        title: 'Loungewear',
        items: [
          { label: 'Lounge Pants', href: '/sleepwear?type=lounge-pants' },
          { label: 'Tank Tops', href: '/sleepwear?type=tanks' },
          { label: 'Cardigans', href: '/sleepwear?type=cardigans' },
          { label: 'Matching Sets', href: '/sleepwear?type=lounge-sets' },
        ],
      },
    ],
  },
  {
    label: 'Lifestyle',
    href: '/lifestyle',
    icon: Home,
    columns: [
      {
        title: 'Robes',
        items: [
          { label: 'Silk Robes', href: '/lifestyle?type=silk-robes' },
          { label: 'Cotton Robes', href: '/lifestyle?type=cotton-robes' },
          { label: 'Plush Robes', href: '/lifestyle?type=plush-robes' },
          { label: 'Bridal Robes', href: '/lifestyle?type=bridal-robes' },
        ],
      },
      {
        title: 'Loungewear',
        items: [
          { label: 'Lounge Sets', href: '/lifestyle?type=lounge-sets' },
          { label: 'Joggers', href: '/lifestyle?type=joggers' },
          { label: 'Oversized Tees', href: '/lifestyle?type=oversized' },
          { label: 'Hoodies', href: '/lifestyle?type=hoodies' },
        ],
      },
      {
        title: 'Accessories',
        items: [
          { label: 'Sleep Masks', href: '/lifestyle?type=sleep-masks' },
          { label: 'Scrunchies', href: '/lifestyle?type=scrunchies' },
          { label: 'Headbands', href: '/lifestyle?type=headbands' },
          { label: 'Slippers', href: '/lifestyle?type=slippers' },
        ],
      },
      {
        title: 'Gift Sets',
        items: [
          { label: 'Curated Boxes', href: '/lifestyle?type=curated' },
          { label: 'Bridal Party', href: '/lifestyle?type=bridal-party' },
          { label: 'Self-Care Kits', href: '/lifestyle?type=self-care' },
          { label: 'Build Your Own', href: '/lifestyle?type=build-your-own' },
        ],
      },
    ],
  },
  {
    label: 'Best Sellers',
    href: '/best-sellers',
    icon: Star,
    featured: true,
    noDropdown: true,
  },
  {
    label: 'Gift Ideas',
    href: '/gift-ideas',
    icon: Gift,
    noDropdown: true,
  },
]

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -10, scaleY: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scaleY: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 25,
      duration: 0.3
    }
  },
  exit: { opacity: 0, y: -10, scaleY: 0.95, transition: { duration: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
}

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.03 } }
}

export function MegaMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile && !NAV_DATA[index].noDropdown) {
      setOpenIndex(index)
      // Smart dropdown positioning: keep within viewport
      const trigger = e.currentTarget.getBoundingClientRect()
      const dropW = 680
      const viewW = window.innerWidth
      const idealLeft = trigger.left + trigger.width / 2 - dropW / 2
      const clampedLeft = Math.max(16, Math.min(idealLeft, viewW - dropW - 16))
      const offsetFromTrigger = clampedLeft - (trigger.left + trigger.width / 2)
      setDropdownStyle({ left: '50%', transform: `translateX(calc(-50% + ${offsetFromTrigger}px))` })
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) setOpenIndex(null)
  }

  const handleClick = (index: number) => {
    if (isMobile && !NAV_DATA[index].noDropdown) {
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
      {NAV_DATA.map((item, index) => (
        <div
          key={item.label}
          className="relative"
          ref={index === 0 ? menuRef : undefined}
          onMouseEnter={(e) => handleMouseEnter(index, e)}
          onMouseLeave={handleMouseLeave}
        >
          <ActiveLink
            href={item.href}
            onClick={() => handleClick(index)}
            className={({ isActive }) => clsx(
              'relative flex items-center gap-1.5 px-3 py-2.5 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-300',
              isActive
                ? 'text-wine'
                : 'text-dark/80 hover:text-wine'
            )}
            aria-haspopup={!item.noDropdown}
            aria-expanded={openIndex === index}
          >
            <item.icon className="w-4 h-4" aria-hidden="true" />
            {item.label}
            {!item.noDropdown && (
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="ml-1"
              >
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.span>
            )}
            {item.featured && (
              <span className="ml-1.5 px-1.5 py-0.5 text-[7px] tracking-[0.1em] uppercase bg-wine text-cream rounded">New</span>
            )}
          </ActiveLink>

          <AnimatePresence>
            {!item.noDropdown && openIndex === index && (
              <motion.div
                ref={dropdownRef}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                style={dropdownStyle}
                className="absolute top-full mt-2.5 z-50 w-[680px] max-w-[90vw] bg-cream border border-border/60 rounded-xl shadow-xl overflow-hidden"
                role="menu"
              >
                <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {(item.columns ?? []).map((col, colIndex) => (
                    <motion.div
                      key={col.title}
                      variants={itemVariants}
                      custom={colIndex}
                    >
                      <h4 className="text-[10px] tracking-[0.15em] uppercase text-wine font-semibold mb-3.5 pb-2 border-b border-border/40">
                        {col.title}
                      </h4>
                      <ul className="space-y-2.5" role="list">
                        {col.items.map((subItem, subIndex) => (
                          <motion.li
                            key={subItem.label}
                            variants={itemVariants}
                            custom={subIndex}
                          >
                            <ActiveLink
                              href={subItem.href}
                              className="block text-xs text-dark/70 hover:text-wine transition-colors duration-200 font-light leading-relaxed group"
                            >
                              {subItem.label}
                            </ActiveLink>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}

                  <motion.div
                    variants={itemVariants}
                    custom={(item.columns ?? []).length}
                    className="lg:col-span-4 border-t border-border/40 pt-6 mt-2"
                  >
                    <ActiveLink
                      href={item.href}
                      className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-wine font-medium hover:text-dark transition-colors"
                    >
                      View all {item.label} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </ActiveLink>
                  </motion.div>
                </div>

                {item.featured && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-wine/10 via-wine/30 to-wine/10"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  )
}

import React, { useState, useEffect, useRef } from 'react'
