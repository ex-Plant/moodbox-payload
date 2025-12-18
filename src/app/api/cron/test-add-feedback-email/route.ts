import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

// curl -X POST http://localhost:3000/api/cron/test-add-feedback-email \
// -H "Content-Type: application/json" \
// -d '{"email": "konradantonik@gmail.com"}'

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  // Create a due record (scheduledAt = now)
  const token: string = crypto.randomUUID()

  let scheduled = null
  try {
    scheduled = await payload.create({
      collection: 'scheduled-emails',
      data: {
        shopifyOrderId: '123123',
        adminGraphqlId: 'sialala',
        customerEmail: email,
        scheduledAt: new Date().toISOString(), // Due now
        status: 'pending',
        emailType: 'post_purchase_questions',
        token,
      },
    })

    console.log('Successfully created scheduled email:', scheduled.id)
    return NextResponse.json({ success: true, message: 'Created', id: scheduled.id })
  } catch (e) {
    console.log('Error while creating test email - aborting ')
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to create', details: e.message || 'Unknown error' },
      { status: 500 },
    )
  }
  if (!scheduled) {
    console.log('No scheduled email - aborting ')
  }

  // Simulate cron processing: query due records and send

  return NextResponse.json({ success: true, message: 'Created' })
}
