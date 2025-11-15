import { UrlObject } from 'node:url'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

type PropsT = {
  title: string
  href: UrlObject
  className?: string
}

export default function FooterLink({ title, href, className }: PropsT) {
  return (
    <Link className={`font-normal`} href={href}>
      <span
        className={cn(
          `hover:border-mood-dark-brown border-b border-transparent delay-200 duration-200 pb-0.5`,
          className,
        )}
      >
        {title}
      </span>
    </Link>
  )
}
