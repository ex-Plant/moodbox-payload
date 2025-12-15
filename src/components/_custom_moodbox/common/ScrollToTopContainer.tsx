'use client'

import { cn } from '@/utilities/ui'

type PropsT = {
  className?: string
  children: React.ReactNode
}

export default function ScrollToTopContainer({ className, children }: PropsT) {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button aria-label="Scroll to top" onClick={scrollToTop} className={cn(`block `, className)}>
      {children}
    </button>
  )
}
