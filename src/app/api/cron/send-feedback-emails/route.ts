import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildPostOrderEmail } from '../../../../utilities/buildPostOrderEmail'

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

export async function POST(req: NextRequest) {
  const authHeader: string | null = req.headers.get('authorization')
  const expected: string = `Bearer ${process.env.CRON_SECRET ?? ''}`

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

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

    const { subject, html, text } = buildPostOrderEmail(linkUrl)
    try {
      // For now reuse payload.sendEmail; you can swap to Nodemailer transport later if desired
      await payload.sendEmail({
        to: doc.customerEmail,
        subject,
        html,
        text,
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
