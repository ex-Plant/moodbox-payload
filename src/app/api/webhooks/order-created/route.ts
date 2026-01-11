import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ATTRIBUTE_KEY_PL } from '@/lib/CartSchema'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'
import { Order } from '../../../../payload-types'

export const dynamic = 'force-dynamic'

type ShopifyOrder = {
  id?: number
  email?: string
  admin_graphql_api_id?: string
  note_attributes?: Array<{ name: string; value: string }>
}

export async function POST(request: NextRequest) {
  const verified = await verifyShopifyHmacHeader(request)

  if (verified.status !== 200)
    return new NextResponse(verified.message, { status: verified.status })

  const topic = request.headers.get('x-shopify-topic')
  if (topic === 'orders/create' && verified.body) {
    await handleOrderCreate(verified.body)
    return NextResponse.json({ success: true })
  }
}

async function handleOrderCreate(order: ShopifyOrder) {
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
  const orderId = order.admin_graphql_api_id

  if (!email) {
    console.warn('⚠️ Webhook skipped: No email  found in order.')
    return
  }

  if (!orderId) {
    console.warn('⚠️ Webhook skipped:  or orderId found in order.')
    return
  }

  const orderData: Record<string, unknown> = { email, orderId }

  for (const [payloadKey, shopifyKey] of Object.entries(ATTRIBUTE_KEY_PL)) {
    if (payloadKey === 'email') continue

    if (rawAttributes[shopifyKey]) {
      orderData[payloadKey] = rawAttributes[shopifyKey]
    }
  }

  console.log(`Processing Order: ${orderId} for ${email}`)

  try {
    const existingOrders = await payload.find({
      collection: 'orders',
      where: {
        orderId: { equals: orderId },
      },
      limit: 1,
    })

    if (existingOrders.totalDocs > 0) {
      const existingId = existingOrders.docs[0].id
      await payload.update({
        collection: 'orders',
        id: existingId,
        data: orderData,
      })
      console.log(`✅ Order updated: ${existingId}`)
    } else {
      await payload.create({
        collection: 'orders',
        data: orderData as unknown as Order,
      })
      console.log(`✅ New order created`)
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('unique')) {
      console.log('ℹ️ Race condition hit: Order was created by another process. Skipping.')
    } else {
      console.error(`❌ Error saving order ${orderId}:`, error)
      throw error
    }
  }
}
