import { Suspense } from 'react'
import Collections from '../_custom_moodbox/home/shopify_collections/Collections'
import { ShopifyProductsBlock } from '@/payload-types'
export default async function ShopifyProductsServer(props: ShopifyProductsBlock) {
  const limitTxt = props['Limit info'] ?? ''

  return (
    <Suspense fallback={null}>
      <Collections limitTxt={limitTxt} />
    </Suspense>
  )
}
