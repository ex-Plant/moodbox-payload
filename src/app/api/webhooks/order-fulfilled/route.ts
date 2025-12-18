import { NextRequest, NextResponse } from 'next/server'
// import configPromise from '@payload-config'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'
// import { getOrderById } from '../../../../lib/shopify/adminApi'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
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

type ShopifyOrderWebhookBodyT = {
  id?: number
  admin_graphql_api_id?: string
  email?: string
  // add more fields as needed
}
async function handleOrderFulfilled(data: ShopifyOrderWebhookBodyT): Promise<void> {
  console.log('Webhook data:', data)
  console.log('Order ID:', data?.id)
  console.log('Admin GraphQL ID:', data?.admin_graphql_api_id)

  if (!data?.admin_graphql_api_id) {
    console.error('No order ID found in webhook data')
    return
  }

  const payload = await getPayload({ config: configPromise })

  // Optional: fetch full order details from Shopify
  // const order = await getOrderById(data.admin_graphql_api_id)
  // console.log('Fetched order:', order)

  const customerEmail: string | undefined = data.email ?? undefined
  if (!customerEmail) {
    console.error('No customer email for fulfilled order')
    return
  }

  // Idempotency: avoid duplicate scheduled records for same order + emailType
  const existing = await payload.find({
    collection: 'scheduled-emails',
    limit: 1,
    where: {
      and: [
        { adminGraphqlId: { equals: data.admin_graphql_api_id } },
        { emailType: { equals: 'post_purchase_questions' } },
      ],
    },
  })

  if (existing.totalDocs > 0) {
    console.log('Scheduled email already exists for this order, skipping')
    return
  }

  const now: number = Date.now()
  // For tests: 10 minutes; later change to 7 days (7 * 24 * 60 * 60 * 1000)
  const delayMs: number = 10 * 60 * 1000
  const scheduledAt: string = new Date(now + delayMs).toISOString()
  const token: string = crypto.randomUUID()

  await payload.create({
    collection: 'scheduled-emails',
    data: {
      shopifyOrderId: data.id ? String(data.id) : '',
      adminGraphqlId: data.admin_graphql_api_id,
      customerEmail,
      scheduledAt,
      status: 'pending',
      emailType: 'post_purchase_questions',
      token,
    },
  })

  console.log('Scheduled post-purchase email created')
}

// async function handleOrderFulfilled(data: any) {
//   // const payload = await getPayload({ config: configPromise })
//   console.log('Webhook data:', data)
//   console.log('Order ID:', data?.id)
//   console.log('Admin GraphQL ID:', data?.admin_graphql_api_id)

//   if (!data?.admin_graphql_api_id) {
//     console.error('No order ID found in webhook data')
//     return
//   }

//   const order = await getOrderById(data.admin_graphql_api_id)
//   console.log('Fetched order:', order)
// }
