import { NextRequest, NextResponse } from 'next/server'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'
import { handleOrderFulfilled } from '@/lib/shopify/webhooks/handleOrderFulfilled'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const verified = await verifyShopifyHmacHeader(req)
  if (verified.status !== 200) {
    //   shopify expects status code only, body is irrelevant
    return new NextResponse(verified.message, { status: verified.status })
  }

  const topic = req.headers.get(`x-shopify-topic`)
  if (topic === 'orders/fulfilled') {
    try {
      await handleOrderFulfilled(verified.body)
      return NextResponse.json({ success: true })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unexpected error '
      console.error('Error in order-fulfilled webhook:', e)
      // Return success to Shopify to avoid retries, or 500 if you want to retry
      return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
  }
}
