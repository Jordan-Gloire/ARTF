'use client'

import Link from 'next/link'
import { LinkProps } from 'next/link'
import React from 'react'

interface OverrideLinkProps extends LinkProps {
  onClick?: () => void
  children: React.ReactNode
}

export function OverrideLink({ href, onClick, children, ...props }: OverrideLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick()
      // Utiliser setTimeout pour permettre à la fonction onClick de s'exécuter avant la navigation
      setTimeout(() => {
        window.location.href = href.toString()
      },0)
    }
  }

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}