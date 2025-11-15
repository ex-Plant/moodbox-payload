import { UrlObject } from 'node:url'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { Header } from '@/payload-types'

type PropsT = {
  className?: string
  isOnTop: boolean
  animationDuration: string
  item: NonNullable<Header['navItems']>[number]
}

export default function NavItem({ className, isOnTop, animationDuration, item }: PropsT) {
  console.log(item)

  const { type, newTab, reference, url } = item.link

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) {
    console.log('no href ❌')
    return null
  }

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

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
