'use server'

import { ShopifyResponseT } from './types'

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STOREFRONT_API_URL
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

type ShopifyFetchParamsT = {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'no-cache',
  tags = [],
}: ShopifyFetchParamsT): Promise<ShopifyResponseT<T> | null> {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) throw new Error(' ❗SHOPIFY_STOREFRONT_ACCESS_TOKEN')
  if (!SHOPIFY_STORE_DOMAIN) throw new Error('❗SHOPIFY_STORE_DOMAIN')

  // console.log('🚀', { query, variables });

  const response = await fetch(SHOPIFY_STORE_DOMAIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: {
      // revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
      tags,
    },
  })

  if (!response.ok) {
    console.log(`Shopify API error: ${response.status} ${response.statusText}`)
    return null
  }

  const json = await response.json()

  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors)
    console.error('Shopify GraphQL errors:', JSON.stringify(json.errors, null, 2))
    return null
  }
  return json
}
