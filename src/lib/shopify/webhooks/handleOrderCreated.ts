import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ATTRIBUTE_KEY_PL } from '@/lib/CartSchema'
import { Order } from '@/payload-types'

type ShopifyOrder = {
  id?: number
  email?: string
  admin_graphql_api_id?: string
  note_attributes?: Array<{ name: string; value: string }>
}

export async function handleOrderCreated(order: ShopifyOrder) {
  const payload = await getPayload({ config: configPromise })

  /*  1. Extract and Normalize Attributes from 
      { "name": "Nazwa firmy / pracowni", "value": "ABC Studio" },
      To an object
      {
        "Nazwa firmy / pracowni": "ABC Studio",
        "E-mail": "test@example.com",
        "NIP": "1234567890"
      }
    */

  const rawAttributes = (order?.note_attributes || []).reduce(
    (acc, attr) => {
      acc[attr.name] = attr.value
      return acc
    },
    {} as Record<string, string>,
  )
  console.log('order:', order)
  const email = order.email
  const shopifyId = String(order.id)

  if (!email) {
    console.warn('⚠️ Webhook skipped: No email  found in order.')
    return
  }

  if (!shopifyId) {
    console.warn('⚠️ Webhook skipped: No id found in order.')
    return
  }

  const orderData: Record<string, unknown> = { email }

  for (const [payloadKey, shopifyKey] of Object.entries(ATTRIBUTE_KEY_PL)) {
    if (payloadKey === 'email') continue

    if (rawAttributes[shopifyKey]) {
      orderData[payloadKey] = rawAttributes[shopifyKey]
    }
  }

  console.log(`Processing Order: ${shopifyId} for ${email}`)

  try {
    const existingOrder = await payload
      .findByID({
        collection: 'orders',
        id: shopifyId,
      })
      .catch(() => null)

    if (existingOrder) {
      await payload.update({
        collection: 'orders',
        id: shopifyId,
        data: orderData,
      })
      console.log(`✅ Order updated: ${shopifyId}`)
    } else {
      await payload.create({
        collection: 'orders',
        data: {
          ...orderData,
          id: shopifyId,
        } as unknown as Order,
      })
      console.log(`✅ New order created: ${shopifyId}`)
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('unique')) {
      console.log('ℹ️ Race condition hit: Order was created by another process. Skipping.')
    } else {
      console.error(`❌ Error saving order ${shopifyId}:`, error)
      throw error
    }
  }
}
