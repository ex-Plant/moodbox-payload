import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Moodbox - pierwsza platforma w Polsce z próbkami materiałów wnętrzarskich. Dla projektantów: szybki dostęp do próbek w jednym boxie. Dla producentów: nowy kanał sprzedaży.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'Moodbox',
  title: 'Moodbox - Próbki Materiałów Wnętrzarskich',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
