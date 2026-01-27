import { getCachedProductsByCollection, getProductByHandle } from '@/lib/shopify/api'
import type { ShopifyCartBlock } from '@/payload-types'
import { Suspense } from 'react'
import CartSection from '../_custom_moodbox/home/cart/CartSection'

const MOODBOX_HANDLE = 'box-stala-cena'

export const ShopifyCartServer: React.FC<ShopifyCartBlock> = async (props) => {
  const [productsByCollection, moodboxProduct] = await Promise.all([
    getCachedProductsByCollection(),
    getProductByHandle(MOODBOX_HANDLE),
  ])
  const allProducts = productsByCollection.flatMap((collection) => collection.products)

  const moodboxPrice = moodboxProduct?.variants.edges[0]?.node

  return (
    <Suspense fallback={null}>
      {/* <Delimiter/ */}
      <CartSection allProducts={allProducts} moodboxPrice={moodboxPrice} {...props} />
    </Suspense>
  )
}
