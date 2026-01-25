'use server'

import { env } from '@/lib/env'

export type ShopifyAdminResponseT<T> = {
  data: T
  errors?: Array<{ message: string }>
}

type ShopifyAdminFetchParamsT = {
  query: string
  variables?: Record<string, unknown>
}

export async function shopifyAdminFetch<T>({
  query,
  variables = {},
}: ShopifyAdminFetchParamsT): Promise<ShopifyAdminResponseT<T> | null> {
  const response: Response = await fetch(env.SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    console.error(`Shopify Admin API error: ${response.status} ${response.statusText}`)
    const errorText = await response.text()
    console.error('Error response body:', errorText)
    return null
  }

  const json: ShopifyAdminResponseT<T> = await response.json()
  // console.log('Full JSON response:', JSON.stringify(json, null, 2))

  if (json.errors) {
    console.error('Shopify Admin GraphQL errors:', json.errors)
    return null
  }

  console.log('No errors found, returning response')
  return json
}
