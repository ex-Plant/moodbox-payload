'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { shopifyAdminFetch, type ShopifyAdminResponseT } from '@/lib/shopify/adminClient'
import { GET_ALL_ORDERS_QUERY } from '@/lib/shopify/adminQueries'
import { ATTRIBUTE_KEY_PL } from '@/lib/CartSchema'
import { Order } from '@/payload-types'

type ShopifyOrderNode = {
  id: string
  legacyResourceId: string
  name: string
  email: string
  createdAt: string
  customer?: {
    email: string
    firstName: string
    lastName: string
  }
  customAttributes: Array<{ key: string; value: string }>
}

type ShopifyOrdersResponse = {
  orders: {
    edges: Array<{
      node: ShopifyOrderNode
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export async function syncOrdersA() {
  const payload = await getPayload({ config: configPromise })
  let hasNextPage = true
  let after: string | null = null
  let syncedCount = 0

  console.log('Starting Shopify orders sync...')

  try {
    while (hasNextPage) {
      const response: ShopifyAdminResponseT<ShopifyOrdersResponse> | null =
        await shopifyAdminFetch<ShopifyOrdersResponse>({
          query: GET_ALL_ORDERS_QUERY,
          variables: {
            first: 50,
            after,
          },
        })

      if (!response || !response.data) {
        throw new Error('Failed to fetch orders from Shopify')
      }

      const ordersData = response.data.orders
      const edges = ordersData.edges
      const pageInfo: ShopifyOrdersResponse['orders']['pageInfo'] = ordersData.pageInfo

      for (const edge of edges) {
        const order = edge.node
        // console.dir(order, { depth: 10 })
        const shopifyId = order.legacyResourceId

        if (!shopifyId) continue

        // Debug logging for the first order to see attribute keys
        // if (syncedCount === 0) {
        //   console.log(`DEBUG: Syncing order ${shopifyId}`)
        //   console.log('DEBUG: customAttributes:', JSON.stringify(order.customAttributes, null, 2))
        // }

        const orderData: Partial<Order> = {
          email: order.email || order.customer?.email,
          createdAt: order.createdAt,
        }

        // Map custom attributes to our fields
        const rawAttributes = (order.customAttributes || []).reduce(
          (acc, attr) => {
            acc[attr.key.trim()] = attr.value
            return acc
          },
          {} as Record<string, string>,
        )

        for (const [payloadKey, shopifyKey] of Object.entries(ATTRIBUTE_KEY_PL)) {
          if (payloadKey === 'email' || payloadKey === 'consents') continue
          const val = rawAttributes[shopifyKey.trim()]
          if (val) {
            // @ts-expect-error - mapping from translation map
            orderData[payloadKey as keyof Order] = val
          }
        }

        // Debug logging for the final object
        // if (syncedCount === 0) {
        //   console.log(
        //     `DEBUG: Final orderData for ${shopifyId}:`,
        //     JSON.stringify(orderData, null, 2),
        //   )
        // }

        try {
          // Upsert order
          const existing = await payload
            .findByID({
              collection: 'orders',
              id: shopifyId,
            })
            .catch(() => null)

          if (existing) {
            await payload.update({
              collection: 'orders',
              id: shopifyId,
              data: orderData,
            })
          } else {
            await payload.create({
              collection: 'orders',
              data: {
                ...orderData,
                id: shopifyId,
              } as unknown as Order,
            })
          }
          syncedCount++
        } catch (err) {
          console.error(`Error syncing order ${shopifyId}:`, err)
        }
      }

      hasNextPage = pageInfo.hasNextPage
      after = pageInfo.endCursor
      console.log(`Synced ${syncedCount} orders so far...`)
    }

    return { success: true, count: syncedCount }
  } catch (error) {
    console.error('Sync failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
