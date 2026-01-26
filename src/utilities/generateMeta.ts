import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Page> | null }): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Moodbox - Próbki Materiałów Wnętrzarskich | Dla Projektantów'

  const description =
    doc?.meta?.description ||
    'Moodbox - pierwsza platforma w Polsce z próbkami materiałów wnętrzarskich. Dla projektantów: szybki dostęp do próbek w jednym boxie. Dla producentów: nowy kanał sprzedaży.'

  return {
    description,
    openGraph: mergeOpenGraph({
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      description,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
    // Allow indexing only on Vercel production; block staging, preview, dev (VERCEL_ENV is set by Vercel)
    robots: process.env.VERCEL_ENV === 'production' ? undefined : 'noindex, nofollow',
  }
}
