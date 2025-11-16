import { handleCMSLink } from '@/hooks/handleCMSLink'
import { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

type PropsT = {
  className?: string
  isOnTop: boolean
  animationDuration: string
  item: NonNullable<Header['navItems']>[number]
}

export default function NavItem({ className, isOnTop, animationDuration, item }: PropsT) {
  const { href, newTabProps, url } = handleCMSLink(item) || {}

  /* Ensure we don't break any styles set by richText */
  return (
    <Link
      className={cn(
        `pointer-events-auto col-span-1 text-right text-white`,
        isOnTop ? 'opacity-100' : 'opacity-0',
        animationDuration,
        className,
      )}
      href={href || url || ''}
      {...newTabProps}
    >
      <span
        className={cn(
          `border-b border-transparent delay-200 hover:border-white pb-0.5`,
          animationDuration,
        )}
      >
        {item.link.label}
      </span>
    </Link>
  )
}
