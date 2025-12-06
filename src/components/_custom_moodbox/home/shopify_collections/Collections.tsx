import { ProductT } from '@/lib/shopify/types'
import { Suspense } from 'react'
import CollectionSlider from './CollectionSlider'
import ShopifyCollectionsProvider from '@/providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'

type PropsT = {
  productsByCollection: { collection: string; handle: string; products: ProductT[] }[]
  limitTxt: string
}

export default function Collections({ productsByCollection, limitTxt }: PropsT) {
  return (
    <section id={'collections'} className={`space-y-4 pb-20`}>
      <Suspense fallback={null}>
        <ShopifyCollectionsProvider limitTxt={limitTxt}>
          {productsByCollection.map((collection) => (
            <CollectionSlider
              key={collection.collection}
              slides={collection.products}
              title={collection.collection}
              isFullScreen={false}
            />
          ))}
        </ShopifyCollectionsProvider>
      </Suspense>
    </section>
  )
}
