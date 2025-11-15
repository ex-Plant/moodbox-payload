import { getProductsByCollection } from '@/lib/shopify/api'
import { Suspense } from 'react'
import CartSection from '../_custom_moodbox/home/cart/CartSection'
import type { ShopifyCartBlock } from '@/payload-types'

export const ShopifyCartServer: React.FC<ShopifyCartBlock> = async (props) => {
  const productsByCollection = await getProductsByCollection()
  const allProducts = productsByCollection.flatMap((collection) => collection.products)

  return (
    <Suspense fallback={null}>
      <CartSection allProducts={allProducts} {...props} />
    </Suspense>
  )
}
