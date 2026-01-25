import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/utilities/checkAuth'
import { env } from '@/lib/env'

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in to the admin panel' },
        { status: 401 },
      )
    }

    const result = await fetch('https://moodboxpl.myshopify.com/admin/api/2024-10/webhooks.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      },
    })

    const data = await result.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch webhooks' },
      { status: 500 },
    )
  }
}
