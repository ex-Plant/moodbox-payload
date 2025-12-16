'use server'

export type ShopifyAdminResponseT<T> = {
  data: T
  errors?: Array<{ message: string }>
}

type ShopifyAdminFetchParamsT = {
  query: string
  variables?: Record<string, unknown>
}

const SHOPIFY_ADMIN_API_URL: string | undefined = process.env.SHOPIFY_ADMIN_API_URL
const SHOPIFY_ADMIN_ACCESS_TOKEN: string | undefined = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

export async function shopifyAdminFetch<T>({
  query,
  variables = {},
}: ShopifyAdminFetchParamsT): Promise<ShopifyAdminResponseT<T> | null> {
  if (!SHOPIFY_ADMIN_API_URL) throw new Error('❗SHOPIFY_ADMIN_API_URL is missing')
  if (!SHOPIFY_ADMIN_ACCESS_TOKEN) throw new Error('❗SHOPIFY_ADMIN_ACCESS_TOKEN is missing')

  const response: Response = await fetch(SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    console.error(`Shopify Admin API error: ${response.status} ${response.statusText}`)
    return null
  }

  const json: ShopifyAdminResponseT<T> = await response.json()

  if (json.errors) {
    console.error('Shopify Admin GraphQL errors:', json.errors)
    return null
  }

  return json
}
