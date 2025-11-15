import { Footer, Header } from '@/payload-types'

export const handleCMSLink = (
  item: NonNullable<Header['navItems']>[number] | NonNullable<Footer['navItems']>[number],
) => {
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
  return { href, newTabProps, url }
}
