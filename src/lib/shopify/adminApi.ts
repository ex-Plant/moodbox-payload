'use server'

import { shopifyAdminFetch } from './adminClient'
import { GET_CUSTOMERS_WITH_ORDERS_QUERY, GET_ORDER_BY_ID_QUERY } from './adminQueries'
import { OrderT } from './types'
import { CREATE_DISCOUNT_CODE_MUTATION } from './adminQueries'

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

type CreateDiscountInputT = {
  title: string
  code: string
  startsAt?: string
  endsAt?: string
  usageLimit?: number
  appliesOncePerCustomer?: boolean
  minimumRequirement?: {
    subtotal: {
      greaterThanOrEqualToSubtotal: string
    }
  }
  customerGets: {
    value: {
      percentage?: number
      amount?: {
        amount: string
        currencyCode: string
      }
    }
    items: {
      all?: boolean
      products?: {
        productVariantsToAdd?: string[]
      }
    }
  }
}

type CreateDiscountResponseT = {
  discountCodeBasicCreate: {
    codeDiscountNode: {
      id: string
      codeDiscount: {
        title: string
        code: string
        status: string
      }
    } | null
    userErrors: Array<{
      field: string[]
      message: string
    }>
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

  // console.log('adminApi.ts:122 - response:', response)

  if (!response) return null
  return response.data.order
}

export async function createDiscountCode(
  input: CreateDiscountInputT,
): Promise<{ success: boolean; discountId?: string; errors?: string[] }> {
  // Transform input to match Shopify's expected format
  const basicCodeDiscount = {
    title: input.title,
    code: input.code,
    startsAt: input.startsAt || new Date().toISOString(),
    endsAt: input.endsAt,
    usageLimit: input.usageLimit,
    appliesOncePerCustomer: input.appliesOncePerCustomer || false,
    minimumRequirement: input.minimumRequirement,
    customerGets: {
      value: input.customerGets.value.percentage
        ? { percentage: input.customerGets.value.percentage }
        : { amount: input.customerGets.value.amount },
      items: input.customerGets.items.all
        ? { all: true }
        : { productVariants: input.customerGets.items.products },
    },
    customerSelection: {
      all: true,
    },
  }

  const response = await shopifyAdminFetch<CreateDiscountResponseT>({
    query: CREATE_DISCOUNT_CODE_MUTATION,
    variables: { basicCodeDiscount },
  })

  if (!response) {
    return { success: false, errors: ['API call failed'] }
  }

  const { codeDiscountNode, userErrors } = response.data.discountCodeBasicCreate

  if (userErrors.length > 0) {
    return {
      success: false,
      errors: userErrors.map((error) => error.message),
    }
  }

  return {
    success: true,
    discountId: codeDiscountNode?.id,
  }
}
