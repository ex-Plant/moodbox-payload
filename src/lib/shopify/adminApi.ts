'use server'

import { shopifyAdminFetch } from './adminClient'
import { GET_CUSTOMERS_WITH_ORDERS_QUERY, GET_ORDER_BY_ID_QUERY } from './adminQueries'
import { OrderT } from './types'

type ShopifyOrderLineItemT = {
  name: string
  quantity: number
  sku: string | null
  discountedTotalSet: {
    shopMoney: {
      amount: string
      currencyCode: string
    }
  }
}

type ShopifyMetafieldT = {
  id: string
  namespace: string
  key: string
  value: string
  type: string
}

type ShopifyOrderT = {
  id: string
  name: string
  createdAt: string
  displayFinancialStatus: string
  displayFulfillmentStatus: string
  currentTotalPriceSet: {
    shopMoney: {
      amount: string
      currencyCode: string
    }
  }
  customAttributes: {
    key: string
    value: string
  }[]
  lineItems: {
    edges: { node: ShopifyOrderLineItemT }[]
  }
  metafields: {
    edges: { node: ShopifyMetafieldT }[]
  }
}

type ShopifyCustomerT = {
  id: string
  email: string | null
  firstName: string | null
  lastName: string | null
  phone?: string | null
  state: string
  tags: string[]
  createdAt: string
  defaultAddress?: {
    address1?: string | null
    city?: string | null
    province?: string | null
    country?: string | null
    zip?: string | null
  } | null
  orders: {
    edges: { node: ShopifyOrderT }[]
  }
}

type CustomersWithOrdersResponseT = {
  customers: {
    edges: {
      cursor: string
      node: ShopifyCustomerT
    }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export async function getAllShopifyCustomersWithOrders(
  pageSize: number = 50,
): Promise<ShopifyCustomerT[]> {
  const allCustomers: ShopifyCustomerT[] = []
  let after: string | null = null
  let hasNextPage: boolean = true

  while (hasNextPage) {
    const response = await shopifyAdminFetch<CustomersWithOrdersResponseT>({
      query: GET_CUSTOMERS_WITH_ORDERS_QUERY,
      variables: {
        first: pageSize,
        after,
      },
    })

    if (!response) break

    const { edges, pageInfo } = response.data.customers as CustomersWithOrdersResponseT['customers']
    const customersPage: ShopifyCustomerT[] = edges.map((edge) => edge.node)
    allCustomers.push(...customersPage)

    hasNextPage = pageInfo.hasNextPage
    after = pageInfo.endCursor
  }

  return allCustomers
}

export async function getOrderById(orderId: string): Promise<OrderT | null> {
  const response = await shopifyAdminFetch<{
    order: OrderT | null
  }>({
    query: GET_ORDER_BY_ID_QUERY,
    variables: { id: orderId },
  })

  if (!response) return null
  return response.data.order
}
