'use server'

import { env } from '@/lib/env'

export async function shopifyAdminFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${env.SHOPIFY_ADMIN_API_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_ACCESS_TOKEN,
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
