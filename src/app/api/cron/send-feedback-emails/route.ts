import { NextRequest, NextResponse } from 'next/server'
import { BasePayload, getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildPostOrderEmail } from '../../../../utilities/buildPostOrderEmail'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

type ScheduledEmailDocT = {
  id: string
  token: string
  customerEmail: string
  status: 'pending' | 'sent' | 'failed' | 'cancelled'
  emailType: string
}

// test
// curl -X POST http://localhost:3000/api/cron/send-feedback-emails \
// -H "Authorization: Bearer YOUR_CRON_SECRET_HERE"

type ResultsT = Array<{ email: string; status: string; errorMessage?: string }>

// todo security check of cron
// The Official Vercel Solution:
// Vercel recommends protecting cron routes by checking the Authorization header, but providing that header via vercel.json requires the value to be static.
// To avoid committing the secret:
// Use Vercel's "Cron Jobs" Dashboard (UI) instead of vercel.json.
// If you create the cron job via the Vercel dashboard (Project Settings > Cron Jobs), you can manually input the Authorization header value there. It stays in their system and isn't in your git repo.
// Plan:
// Go to Vercel Dashboard > Settings > Cron Jobs.
// Create a job:
// Path: /api/cron/send-feedback-emails
// Schedule: 0 * * * *
// Header: Authorization: Bearer <YOUR_SECRET_VALUE>
// In your code, check process.env.CRON_SECRET (which you also set in Env Vars to match <YOUR_SECRET_VALUE>).

export async function POST(req: NextRequest) {
  const authHeader: string | null = req.headers.get('authorization')
  const expected: string = `Bearer ${process.env.CRON_SECRET ?? ''}`

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const results = await sendScheduledEmail()
    return NextResponse.json({
      processed: results.length,
      details: results,
    })
  } catch (e) {
    console.error(e)
    const message = e instanceof Error ? e.message : '❌ Unexpected error while sending'
    return NextResponse.json({ error: message, status: 500 })
  }
}

async function sendScheduledEmail(): Promise<ResultsT> {
  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()
  const results: ResultsT = []

  const processedExpiredEmails = await processExpiredEmails(payload, now)
  results.push(...processedExpiredEmails)

  const scheduled = await payload.find({
    collection: 'scheduled-emails',
    limit: 20, // batching safety
    where: {
      and: [
        { status: { equals: 'pending' } },
        { scheduledAt: { less_than_equal: now } },
        { expiresAt: { greater_than: now } },
      ],
    },
  })

  if (scheduled.totalDocs === 0) return []

  console.log(`Processing batch of ${scheduled.docs.length} scheduled emails...`)

  // this is defensive - it shouldnt't be possible
  for (const doc of scheduled.docs as unknown as ScheduledEmailDocT[]) {
    if (!doc.token || !doc.customerEmail) {
      console.error(` ❌ ${doc.id} is missing required data - aborting`)
      await payload.update({
        collection: 'scheduled-emails',
        id: doc.id,
        data: { status: 'failed' },
      })
      results.push({
        email: doc.customerEmail,
        status: 'failed',
        errorMessage: 'Missing required data',
      })

      continue
    }

    const baseUrl: string = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
    const linkUrl: string = `${baseUrl}/post-purchase/${doc.token}`
    const { subject, html, text } = buildPostOrderEmail(linkUrl)

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

    results.push({ email: doc.customerEmail, status: 'sent' })
  }

  return results
}

async function processExpiredEmails(payload: BasePayload, now: string): Promise<ResultsT> {
  // We will try retrying sending emails for a certain amount of time, after that we will permanently set the status to failed

  const results: ResultsT = []

  const expired = await payload.find({
    collection: 'scheduled-emails',
    limit: 20,
    where: {
      and: [{ status: { equals: 'pending' } }, { expiresAt: { less_than_equal: now } }],
    },
  })

  for (const doc of expired.docs) {
    await payload.update({
      collection: 'scheduled-emails',
      id: doc.id,
      data: { status: 'failed' },
    })
    results.push({
      email: doc.customerEmail,
      status: 'failed',
      errorMessage: 'Sending failed repeatedly',
    })
  }
  return results
}
