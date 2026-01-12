import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { createFutureDate } from '../../../utilities/createFutureDate'
import { generateHexToken } from '../../../utilities/generateTokenString'
type ShopifyOrderWebhookBodyT = {
  email?: string
  admin_graphql_api_id?: string
}
export async function handleOrderFulfilled(data: ShopifyOrderWebhookBodyT | null): Promise<void> {
  const id = data?.admin_graphql_api_id
  const email = data?.email
  // console.log('Webhook data:', data)

  if (!id) {
    console.error('No order ID provided')
    throw new Error('No order ID found in webhook data')
  }

  if (!email) {
    console.error('No customer email provided')
    throw new Error('No customer email for fulfilled order')
  }

  const payload = await getPayload({ config: configPromise })

  // Find Order
  const orders = await payload.find({
    collection: 'orders',
    where: { orderId: { equals: id } },
    limit: 1,
  })

  if (orders.totalDocs === 0) {
    console.error('Order not found in DB:', id)
    throw new Error(`Order ${id} not found in database.`)
  }

  const orderDoc = orders.docs[0]

  // Idempotency: avoid duplicate scheduled records for same order
  const existing = await payload.find({
    collection: 'scheduled-emails',
    limit: 1,
    where: {
      and: [{ orderId: { equals: id } }, { emailType: { equals: 'post_purchase_questions' } }],
    },
  })

  if (existing.totalDocs > 0) {
    console.log('Skipping - scheduled email already exists for order:', id)
    return
  }

  const token = generateHexToken(16, 'FORM')
  // console.log('ecoded token: ', token)

  await payload.create({
    collection: 'scheduled-emails',
    data: {
      linkedOrder: orderDoc.id,
      orderId: id,
      customerEmail: email,
      scheduledAt: createFutureDate({ daysFromNow: 0 }).toISOString(),
      expiresAt: createFutureDate({ daysFromNow: 7 }).toISOString(),
      status: 'pending',
      emailType: 'post_purchase_questions',
      token,
    },
  })
  console.log(` ✅ shopify order id: ${id} -> fullfiled `)
}
