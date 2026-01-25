import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/utilities/checkAuth'
import { env } from '@/lib/env'

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in to the admin panel' },
        { status: 401 },
      )
    }

    const body = await request.json()
    const { topic, address, format = 'json' } = body

    if (!topic || !address) {
      return NextResponse.json({ error: 'Topic and address are required' }, { status: 400 })
    }

    const webhookData = {
      webhook: {
        topic,
        address,
        format,
      },
    }

    const result = await fetch('https://moodboxpl.myshopify.com/admin/api/2024-10/webhooks.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify(webhookData),
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating webhook:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create webhook' },
      { status: 500 },
    )
  }
}
