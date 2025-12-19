import { NextRequest, NextResponse } from 'next/server'
import { handleOrderFulfilled } from '@/lib/shopify/webhooks/handleOrderFulfilled'

export const dynamic = 'force-dynamic'

// curl -X POST http://localhost:3000/api/cron/test-add-feedback-email \
// -H "Content-Type: application/json" \
// -d '{"email": "konradantonik@gmail.com"}'

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 })
  }

  const admin_graphql_api_id = `test-${Math.random()}`

  try {
    await handleOrderFulfilled({ email, admin_graphql_api_id })
    return NextResponse.json({ message: 'test scheduled email created', success: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unexpected error '
    console.error('Error in order-fulfilled webhook:', e)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
