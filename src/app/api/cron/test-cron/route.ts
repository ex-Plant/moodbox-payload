import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

type ScheduledEmailDocT = {
  id: string
  token: string
  customerEmail: string
  adminGraphqlId: string
  status: 'pending' | 'sent' | 'failed' | 'cancelled'
  emailType: string
}

// curl -X POST http://localhost:3000/api/cron/test-cron \
// -H "Content-Type: application/json" \

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const now: Date = new Date()

  const scheduled = await payload.find({
    collection: 'scheduled-emails',
    limit: 20, // batching safety
    where: {
      and: [
        { status: { equals: 'pending' } },
        { scheduledAt: { less_than_equal: now.toISOString() } },
      ],
    },
  })

  if (scheduled.totalDocs === 0) {
    return NextResponse.json({ message: 'No emails due' })
  }

  console.log(`Processing batch of ${scheduled.docs.length} scheduled emails...`)

  const baseUrl: string = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
  const results: Array<{ id: string; status: string; errorMessage?: string }> = []

  for (const doc of scheduled.docs as unknown as ScheduledEmailDocT[]) {
    if (!doc.token || !doc.customerEmail || !doc.adminGraphqlId) {
      console.error('Scheduled email missing required data', { id: doc.id })
      await payload.update({
        collection: 'scheduled-emails',
        id: doc.id,
        data: { status: 'failed' },
      })
      results.push({ id: doc.id, status: 'failed', errorMessage: 'Missing required data' })
      continue
    }

    const linkUrl: string = `${baseUrl}/post-purchase/${doc.token}`

    try {
      // For now reuse payload.sendEmail; you can swap to Nodemailer transport later if desired
      await payload.sendEmail({
        to: doc.customerEmail,
        subject: 'How did your order go?',
        html: `<p>We'd love your feedback on your purchase.</p>
<p><a href="${linkUrl}">Click here to answer a few quick questions</a></p>`,
        text: `We'd love your feedback on your purchase. Visit: ${linkUrl}`,
      })

      await payload.update({
        collection: 'scheduled-emails',
        id: doc.id,
        data: { status: 'sent' },
      })

      results.push({ id: doc.id, status: 'sent' })
    } catch (error) {
      console.error('Failed to send scheduled email', { id: doc.id, error })

      await payload.update({
        collection: 'scheduled-emails',
        id: doc.id,
        data: { status: 'failed' },
      })

      results.push({ id: doc.id, status: 'failed', errorMessage: 'Send failed' })
    }
  }

  return NextResponse.json({
    processed: results.length,
    details: results,
  })
}
