'use server'

const SHOPIFY_ADMIN_API_URL = process.env.SHOPIFY_ADMIN_API_URL
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

export async function shopifyAdminFetch(endpoint: string, options: RequestInit = {}) {
  if (!SHOPIFY_ADMIN_ACCESS_TOKEN) throw new Error('❗SHOPIFY_ADMIN_ACCESS_TOKEN missing')
  if (!SHOPIFY_ADMIN_API_URL) throw new Error('❗SHOPIFY_ADMIN_API_URL missing')

  const url = `${SHOPIFY_ADMIN_API_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Shopify Admin API error: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  return response.json()
}
