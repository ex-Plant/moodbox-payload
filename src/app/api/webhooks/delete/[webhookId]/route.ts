import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/utilities/checkAuth'
import { env } from '@/lib/env'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ webhookId: string }> },
) {
  try {
    // Authentication check
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in to the admin panel' },
        { status: 401 },
      )
    }

    const { webhookId } = await params

    if (!webhookId) {
      return NextResponse.json({ error: 'Webhook ID is required' }, { status: 400 })
    }

    const result = await fetch(
      `https://moodboxpl.myshopify.com/admin/api/2024-10/webhooks/${webhookId}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
      },
    )

    if (!result.ok) {
      const errorText = await result.text()
      throw new Error(`Shopify API error: ${result.status} ${result.statusText} - ${errorText}`)
    }

    return NextResponse.json({ success: true, message: 'Webhook deleted successfully' })

    return NextResponse.json({ success: true, message: 'Webhook deleted successfully' })
  } catch (error) {
    console.error('Error deleting webhook:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete webhook' },
      { status: 500 },
    )
  }
}
