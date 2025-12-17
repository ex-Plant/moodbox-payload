import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ATTRIBUTE_KEY_PL } from '@/lib/CartSchema'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'

export const dynamic = 'force-dynamic'

type ShopifyOrder = {
  id?: number
  email?: string
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

  if (!email) {
    console.warn('⚠️ Webhook skipped: No email found in order.')
    return
  }

  const clientData: Record<string, unknown> = { email }

  for (const [payloadKey, shopifyKey] of Object.entries(ATTRIBUTE_KEY_PL)) {
    if (payloadKey === 'email') continue

    if (rawAttributes[shopifyKey]) {
      clientData[payloadKey] = rawAttributes[shopifyKey]
    }
  }

  console.log(`Processing Client: ${clientData.email}`)

  try {
    // Try to Update First
    // Since 'email' is unique and indexed, this is very fast.
    const updateResult = await payload.update({
      collection: 'clients',
      where: {
        email: { equals: clientData.email },
      },
      data: clientData,
    })

    if (updateResult.docs.length > 0) {
      console.log(`✅ Client updated: ${updateResult.docs[0].id}`)
      return
    }

    // If updateResult.docs is empty, the user doesn't exist. Create them.
    await payload.create({
      collection: 'clients',
      data: clientData,
    })
    console.log(`✅ New client created`)
  } catch (error: unknown) {
    // 3. Race Condition Handling
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('unique')) {
      console.log('ℹ️ Race condition hit: Client was created by another process. Skipping.')
    } else {
      console.error(`❌ Error saving client ${clientData.email}:`, error)
      throw error // Re-throw real errors so Shopify knows to retry
    }
  }
}
