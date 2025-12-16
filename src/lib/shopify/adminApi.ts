'use server'

import { shopifyAdminFetch } from './adminClient'
import { GET_CUSTOMERS_WITH_ORDERS_QUERY } from './adminQueries'

type ShopifyOrderLineItemT = {
  id: string
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

type ShopifyOrderT = {
  id: string
  name: string
  createdAt: string
  displayFinancialStatus: string
  displayFulfillmentStatus: string
  currencyCode: string
  currentTotalPriceSet: {
    shopMoney: {
      amount: string
      currencyCode: string
    }
  }
  lineItems: {
    edges: { node: ShopifyOrderLineItemT }[]
  }
}

type ShopifyCustomerT = {
  id: string
  email: string | null
  firstName: string | null
  lastName: string | null
  createdAt: string
  state: string
  tags: string[]
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

    const { edges, pageInfo } = response.data.customers
    const customersPage: ShopifyCustomerT[] = edges.map((edge) => edge.node)
    allCustomers.push(...customersPage)

    hasNextPage = pageInfo.hasNextPage
    after = pageInfo.endCursor
  }

  return allCustomers
}
