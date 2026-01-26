import { handleOrderCreated } from '@/lib/shopify/webhooks/handleOrderCreated'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const verified = await verifyShopifyHmacHeader(request)

  if (verified.status !== 200)
    return new NextResponse(verified.message, { status: verified.status })

  const topic = request.headers.get('x-shopify-topic')
  if (topic === 'orders/create' && verified.body) {
    revalidateTag('collections', 'max')
    revalidateTag('products', 'max')
    await handleOrderCreated(verified.body)
    return NextResponse.json({ success: true })
  }
}
