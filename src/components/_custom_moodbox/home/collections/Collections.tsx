import CollectionSlider from './CollectionSlider'
import { Suspense } from 'react'
import { ProductT } from '@/lib/shopify/types'

type PropsT = {
  productsByCollection: { collection: string; handle: string; products: ProductT[] }[]
}

export default function Collections({ productsByCollection }: PropsT) {
  return (
    <section id={'collections'} className={`space-y-4 pb-20`}>
      <Suspense fallback={null}>
        {productsByCollection.map((collection) => (
          <CollectionSlider
            key={collection.collection}
            slides={collection.products}
            title={collection.collection}
            isFullScreen={false}
          />
        ))}
      </Suspense>
    </section>
  )
}
