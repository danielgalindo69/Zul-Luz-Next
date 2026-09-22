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
        title: 'Explore lingerie',
        items: [
          { label: 'Bras', href: '/lingerie/bras' },
          { label: 'Panties', href: '/lingerie/panties' },
          { label: 'Sets', href: '/lingerie/sets' },
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
        title: 'Explore sleepwear',
        items: [
          { label: 'Pajama sets', href: '/sleepwear/pajama-sets' },
          { label: 'Robes', href: '/sleepwear/robes' },
          { label: 'Nightgowns', href: '/sleepwear/nightgowns' },
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
        title: 'Explore lifestyle',
        items: [
          { label: 'Home fragrance', href: '/lifestyle/home-fragrance' },
          { label: 'Scrunchies', href: '/lifestyle/scrunchies' },
          { label: 'Accessories', href: '/lifestyle/accessories' },
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
      const dropW = 320
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
                className="absolute top-full z-50 w-[320px] max-w-[90vw] bg-cream border border-border/60 rounded-xl shadow-xl overflow-hidden"
                role="menu"
              >
                <div className="p-6 grid grid-cols-1 gap-6">
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
                    className="border-t border-border/40 pt-4"
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
