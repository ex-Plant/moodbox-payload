'use server'

import { BasePayload, getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildPostOrderEmail } from '../../../utilities/email_templates/buildPostOrderEmail'

type ScheduledEmailDocT = {
  id: string
  token: string
  customerEmail: string
  status: 'pending' | 'sent' | 'failed' | 'cancelled'
  emailType: string
}
type ResultsT = Array<{ email: string; status: string; errorMessage?: string }>

export async function sendScheduledEmail(limit = 20): Promise<ResultsT> {
  console.log('sendScheduledEmail.ts:17 - :')
  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()
  const results: ResultsT = []

  const processedExpiredEmails = await processExpiredEmails(payload, now, limit)
  results.push(...processedExpiredEmails)

  const scheduled = await payload.find({
    collection: 'scheduled-emails',
    limit: limit, // batching safety
    where: {
      and: [
        { status: { equals: 'pending' } },
        { scheduledAt: { less_than_equal: now } },
        { expiresAt: { greater_than: now } },
      ],
    },
  })

  if (scheduled.totalDocs === 0) {
    console.log(`No scheduled emails found`)
    return []
  }
  console.log(`💥 Processing batch of ${scheduled.docs.length} scheduled emails...`)

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

    if (!baseUrl) {
      throw new Error('❌ NEXT_PUBLIC_SERVER_URL is not defined in environment variables')
    }

    const linkUrl: string = `${baseUrl}/ankieta/${doc.token}`
    console.log('linkUrl: ', linkUrl, 'baseUrl: ', baseUrl)
    const { subject, html } = buildPostOrderEmail(linkUrl)

    await payload.sendEmail({
      to: doc.customerEmail,
      subject,
      html,
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

async function processExpiredEmails(
  payload: BasePayload,
  now: string,
  limit: number,
): Promise<ResultsT> {
  // We will try retrying sending emails for a certain amount of time, after that we will permanently set the status to failed

  const results: ResultsT = []

  const expired = await payload.find({
    collection: 'scheduled-emails',
    limit: limit,
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
