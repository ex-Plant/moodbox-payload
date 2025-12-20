import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { createFutureDate } from '../../../utilities/createFutureDate'
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

  // const token = encodeOrderToken({ orderId: id })
  const token = crypto.randomUUID()
  // console.log('ecoded token: ', token)

  await payload.create({
    collection: 'scheduled-emails',
    data: {
      orderId: id,
      customerEmail: email,
      scheduledAt: createFutureDate({ daysFromNow: 0 }).toISOString(),
      expiresAt: createFutureDate({ daysFromNow: 7 }).toISOString(),
      status: 'pending',
      emailType: 'post_purchase_questions',
      token,
    },
  })
}
