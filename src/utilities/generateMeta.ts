import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  const fallback = serverUrl + '/website-template-OG.png'

  if (!image || typeof image !== 'object' || !('url' in image)) return fallback

  const rawUrl = image.sizes?.og?.url ?? image.url
  if (!rawUrl) return fallback

  // Vercel Blob URLs are already absolute — use directly
  if (rawUrl.startsWith('http')) return rawUrl

  // Payload /api/media/file/ paths are inaccessible to external crawlers
  // when using Vercel Blob storage — fall back to static OG image
  if (rawUrl.startsWith('/api/media/')) return fallback

  return serverUrl + rawUrl
}

export const generateMeta = async (args: { doc: Partial<Page> | null }): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Moodbox - Próbki Materiałów Wnętrzarskich | Dla Projektantów'

  const description =
    doc?.meta?.description ||
    'Moodbox - pierwsza platforma w Polsce z próbkami materiałów wnętrzarskich. Szybki dostęp do próbek w jednym boxie.'

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
