'use client'

import { ProductT } from '@/lib/shopify/types'
import ShopifyCollectionsProvider from '@/providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'
import { useState } from 'react'
import CollectionSlider from './CollectionSlider'

type PropsT = {
  productsByCollection: { collection: string; handle: string; products: ProductT[] }[]
  limitTxt: string
}

export default function Collections({ productsByCollection, limitTxt }: PropsT) {
  const [imgHeight, setImgHeight] = useState(0)

  return (
    <section id={'collections'} className={`space-y-4 pb-20`}>
      <ShopifyCollectionsProvider limitTxt={limitTxt}>
        {productsByCollection.map((collection, i) => (
          <CollectionSlider
            key={collection.collection}
            slides={collection.products}
            title={collection.collection}
            isFullScreen={false}
            collectionIndex={i}
            setImgHeight={setImgHeight}
            imgHeight={imgHeight}
          />
        ))}
      </ShopifyCollectionsProvider>
    </section>
  )
}
