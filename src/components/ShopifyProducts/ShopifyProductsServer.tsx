import { getCachedProductsByCollection } from '@/lib/shopify/api'
import { Suspense } from 'react'
import Collections from '../_custom_moodbox/home/shopify_collections/Collections'

export default async function ShopifyProductsServer() {
  const productsByCollection = await getCachedProductsByCollection()

  return (
    <Suspense fallback={null}>
      <Collections productsByCollection={productsByCollection} />
    </Suspense>
  )
}
