import ShopifyCollectionsProvider from '@/providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'
import CollectionSlider from './CollectionSlider'
import { getCachedProductsByCollection } from '@/lib/shopify/api'

type PropsT = {
  limitTxt: string
}

export default async function Collections({ limitTxt }: PropsT) {
  const productsByCollection = await getCachedProductsByCollection()

  return (
    <section id={'collections'} className={`space-y-4 pb-20`}>
      <ShopifyCollectionsProvider limitTxt={limitTxt}>
        {productsByCollection.map((collection, i) => {
          if (
            process.env.NODE_ENV !== 'development' &&
            collection.collection.toLowerCase() === 'test'
          ) {
            return <></>
          }

          return (
            <CollectionSlider
              key={collection.collection}
              slides={collection.products}
              title={collection.collection}
              isFullScreen={false}
              collectionIndex={i}
            />
          )
        })}
      </ShopifyCollectionsProvider>
    </section>
  )
}
