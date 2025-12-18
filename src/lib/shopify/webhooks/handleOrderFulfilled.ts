import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
type ShopifyOrderWebhookBodyT = {
  id?: string
  email?: string
}
export async function handleOrderFulfilled(
  data: ShopifyOrderWebhookBodyT | null,
  email?: string,
  orderId?: string,
): Promise<void> {
  const id = data?.id ?? orderId
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
      scheduledAt: new Date().toISOString(),
      status: 'pending',
      emailType: 'post_purchase_questions',
      token: crypto.randomUUID(),
    },
  })
}
