import { getCachedProductsByCollection } from '@/lib/shopify/api'
import type { ShopifyCartBlock } from '@/payload-types'
import { Suspense } from 'react'
import CartSection from '../_custom_moodbox/home/cart/CartSection'

export const ShopifyCartServer: React.FC<ShopifyCartBlock> = async (props) => {
  const productsByCollection = await getCachedProductsByCollection()
  const allProducts = productsByCollection.flatMap((collection) => collection.products)

  return (
    <Suspense fallback={null}>
      {/* <Delimiter/ */}
      <CartSection allProducts={allProducts} {...props} />
    </Suspense>
  )
}
