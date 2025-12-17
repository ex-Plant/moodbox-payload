import { NextRequest, NextResponse } from 'next/server'
// import configPromise from '@payload-config'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'
import { getOrderById } from '../../../../lib/shopify/adminApi'
// import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const verified = await verifyShopifyHmacHeader(req)
  if (verified.status !== 200) {
    //   shopify expects status code only, body is irrelevant
    return new NextResponse(verified.message, { status: verified.status })
  }

  const topic = req.headers.get(`x-shopify-topic`)
  if (topic === 'orders/fulfilled') {
    await handleOrderFulfilled(verified.body)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json('')
}

async function handleOrderFulfilled(data: any) {
  // const payload = await getPayload({ config: configPromise })
  console.log('Webhook data:', data)
  console.log('Order ID:', data?.id)
  console.log('Admin GraphQL ID:', data?.admin_graphql_api_id)

  if (!data?.admin_graphql_api_id) {
    console.error('No order ID found in webhook data')
    return
  }

  const order = await getOrderById(data.admin_graphql_api_id)
  console.log('Fetched order:', order)
}
