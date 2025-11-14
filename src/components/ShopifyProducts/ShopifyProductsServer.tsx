import { getProductsByCollection } from '@/lib/shopify/api'
import { Suspense } from 'react'
// import CartSection from '../_custom_moodbox/home/cart/CartSection'
import Collections from '../_custom_moodbox/home/collections/Collections'

export default async function ShopifyProductsServer() {
  const productsByCollection = await getProductsByCollection()
  const allProducts = productsByCollection.flatMap((collection) => collection.products)

  return (
    <Suspense fallback={null}>
      <Collections productsByCollection={productsByCollection} />
      {/* <CartSection allProducts={allProducts} /> */}
    </Suspense>
  )
}
