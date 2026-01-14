import { handleCMSLink } from '@/hooks/handleCMSLink'
import { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

type PropsT = {
  className?: string
  isOnTop: boolean
  animationDuration: string
  item: NonNullable<Header['navItems']>[number]
  isHome: boolean
}

export default function NavItem({ className, isOnTop, animationDuration, item, isHome }: PropsT) {
  const { href, newTabProps, url } = handleCMSLink(item) || {}

  /* Ensure we don't break any styles set by richText */
  return (
    <Link
      className={cn(
        `pointer-events-auto col-span-1 text-right`,
        isOnTop ? 'opacity-100' : 'opacity-0',
        isHome ? ' text-white' : 'text-mood-dark-gray ',
        animationDuration,
        className,
      )}
      href={href || url || ''}
      {...newTabProps}
    >
      <span
        className={cn(
          `border-b border-transparent delay-200pb-0.5`,
          isHome ? '  hover:border-white ' : ' hover:border-mood-dark-gray  ',
          animationDuration,
        )}
      >
        {item.link.label}
      </span>
    </Link>
  )
}
