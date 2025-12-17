import ShopifyCollectionsProvider from '@/providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'
import CollectionSlider from './CollectionSlider'
import { getCachedProductsByCollection } from '@/lib/shopify/api'
import { ProductT } from '../../../../lib/shopify/types'

type PropsT = {
  limitTxt: string
}

export default async function Collections({ limitTxt }: PropsT) {
  const productsByCollection = await getCachedProductsByCollection()

  return (
    <section id={'collections'} className={`space-y-4 pb-20`}>
      <ShopifyCollectionsProvider limitTxt={limitTxt}>
        {productsByCollection.map((collection, i) => (
          <ShopifyCollection
            key={collection.collection}
            slides={collection.products}
            title={collection.collection}
            i={i}
          />
        ))}
      </ShopifyCollectionsProvider>
    </section>
  )
}

type T = {
  slides: ProductT[]
  title: string
  i: number
}

function ShopifyCollection({ slides, title, i }: T) {
  const isTest = title.toLowerCase() === 'test'
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev && isTest) return <></>
  // if (isDev && isTest) console.log('slides:', slides[1])

  return <CollectionSlider slides={slides} title={title} isFullScreen={false} collectionIndex={i} />
}
