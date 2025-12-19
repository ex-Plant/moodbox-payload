import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { createFutureDate } from '../../../utilities/createFutureDate'
import { encodeOrderToken } from '../../token/encodeOrderToken'
type ShopifyOrderWebhookBodyT = {
  email?: string
  admin_graphql_api_id?: string
}
export async function handleOrderFulfilled(
  data: ShopifyOrderWebhookBodyT | null,
  email?: string,
  orderId?: string,
): Promise<void> {
  const id = data?.admin_graphql_api_id ?? orderId
  const customerEmail = data?.email ?? email
  console.log('Webhook data:', data)

  if (!id) {
    console.error('No order ID provided')
    throw new Error('No order ID found in webhook data')
  }

  if (!customerEmail) {
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

  await payload.create({
    collection: 'scheduled-emails',
    data: {
      orderId: id,
      customerEmail: customerEmail,
      scheduledAt: createFutureDate({ daysFromNow: 0 }).toISOString(),
      expiresAt: createFutureDate({ daysFromNow: 7 }).toISOString(),
      status: 'pending',
      emailType: 'post_purchase_questions',
      token: encodeOrderToken({ orderId: id }),
    },
  })
}
