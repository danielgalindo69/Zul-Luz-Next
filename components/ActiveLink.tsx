'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'

type ActiveLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  children: ReactNode
  className?: string | ((state: { isActive: boolean }) => string)
}

export function ActiveLink({ className, href, ...props }: ActiveLinkProps) {
  const pathname = usePathname()
  const hrefValue = typeof href === 'string' ? href : href.pathname ?? ''
  const currentPath = pathname ?? ''
  const isActive = hrefValue === '/' ? currentPath === '/' : currentPath === hrefValue || currentPath.startsWith(`${hrefValue}/`)
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className

  return <Link href={href} className={resolvedClassName} {...props} />
}
