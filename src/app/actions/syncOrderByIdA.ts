'use server'

import { getOrderById } from '@/lib/shopify/adminApi'
import { handleOrderFulfilled } from '@/lib/shopify/webhooks/handleOrderFulfilled'
import { handleOrderCreated } from '@/lib/shopify/webhooks/handleOrderCreated'

type SyncResult = {
  success: boolean
  message: string
}

export async function syncOrderByIdA(input: string): Promise<SyncResult> {
  try {
    // If it's a numeric ID, convert to GraphQL ID
    const orderId = `gid://shopify/Order/${input}`

    const order = await getOrderById(orderId)

    if (!order) {
      return { success: false, message: 'Nie znaleziono zamówienia w Shopify' }
    }

    // Map OrderT to ShopifyOrder structure expected by webhook handlers
    const webhookPayload = {
      id: Number(order.legacyResourceId),
      email: order.email,
      admin_graphql_api_id: order.id,
      note_attributes: order.customAttributes.map((attr) => ({
        name: attr.key,
        value: attr.value,
      })),
    }
    console.log('📦 Syncing order:', webhookPayload.id)

    // Run handlers sequentially
    await handleOrderCreated(webhookPayload)
    await handleOrderFulfilled(webhookPayload)

    return {
      success: true,
      message: `Zsynchronizowano zamówienie ${order.name}`,
    }
  } catch (error) {
    console.error('❌ Sync order error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Wystąpił nieznany błąd',
    }
  }
}
