import { getCachedProductsByCollection } from '@/lib/shopify/api'
import { Suspense } from 'react'
import Collections from '../_custom_moodbox/home/shopify_collections/Collections'
import { ShopifyProductsBlock } from '@/payload-types'
export default async function ShopifyProductsServer(props: ShopifyProductsBlock) {
  const limitTxt = props['Limit info'] ?? ''

  const productsByCollection = await getCachedProductsByCollection()

  return (
    <Suspense fallback={null}>
      <Collections productsByCollection={productsByCollection} limitTxt={limitTxt} />
    </Suspense>
  )
}
