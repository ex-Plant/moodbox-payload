import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Footer } from '@/payload-types'
import { handleCMSLink } from '@/hooks/handleCMSLink'

type PropsT = {
  className?: string
  item: NonNullable<Footer['navItems']>[number]
}

export default function FooterLink({ className, item }: PropsT) {
  const { href, newTabProps, url } = handleCMSLink(item) || {}

  return (
    <Link {...newTabProps} href={href || url || ''} className={`font-normal`}>
      <span
        className={cn(
          `hover:border-mood-dark-brown border-b border-transparent delay-200 duration-200 pb-0.5`,
          className,
        )}
      >
        {item.link.label}
      </span>
    </Link>
  )
}
