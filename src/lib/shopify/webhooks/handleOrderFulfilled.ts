import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { createFutureDate } from '../../../utilities/createFutureDate'
import { generateHexToken } from '../../../utilities/generateTokenString'
type ShopifyOrderWebhookBodyT = {
  id?: number
  email?: string
  admin_graphql_api_id?: string
}
export async function handleOrderFulfilled(data: ShopifyOrderWebhookBodyT | null): Promise<void> {
  const shopifyId = String(data?.id)
  const email = data?.email
  // console.log('Webhook data:', data)

  if (!shopifyId || shopifyId === 'undefined') {
    console.error('No order ID provided')
    throw new Error('No order ID found in webhook data')
  }

  if (!email) {
    console.error('No customer email provided')
    throw new Error('No customer email for fulfilled order')
  }

  const payload = await getPayload({ config: configPromise })

  // Find Order
  const orderDoc = await payload
    .findByID({
      collection: 'orders',
      id: shopifyId,
    })
    .catch(() => null)

  if (!orderDoc) {
    console.error('Order not found in DB:', shopifyId)
    throw new Error(`Order ${shopifyId} not found in database.`)
  }

  // Idempotency: avoid duplicate scheduled records for same order
  const existing = await payload.find({
    collection: 'scheduled-emails',
    limit: 1,
    where: {
      and: [
        { linkedOrder: { equals: shopifyId } },
        { emailType: { equals: 'post_purchase_questions' } },
      ],
    },
  })

  if (existing.totalDocs > 0) {
    console.log('Skipping - scheduled email already exists for order:', shopifyId)
    return
  }

  const token = generateHexToken(16, 'FORM')
  // console.log('ecoded token: ', token)

  await payload.create({
    collection: 'scheduled-emails',
    data: {
      linkedOrder: shopifyId,
      customerEmail: email,
      scheduledAt: createFutureDate({ daysFromNow: 7 }).toISOString(),
      expiresAt: createFutureDate({ daysFromNow: 14 }).toISOString(),
      status: 'pending',
      emailType: 'post_purchase_questions',
      token,
    },
  })
  console.log(` ✅ shopify order id: ${shopifyId} -> fullfiled `)
}
