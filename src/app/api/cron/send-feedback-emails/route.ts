import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { sendScheduledEmail } from '@/lib/shopify/webhooks/sendScheduledEmail'
import { getPayload } from 'payload'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

// test
// curl -X POST http://localhost:3000/api/cron/send-feedback-emails \
// -H "Authorization: Bearer YOUR_CRON_SECRET_HERE"

export async function POST(req: NextRequest) {
  console.log(`Initializing send-feedback-emails cron`)
  const authHeader: string | null = req.headers.get('authorization')
  const expected: string = `Bearer ${process.env.CRON_SECRET ?? ''}`

  const payload = await getPayload({
    config: configPromise,
  })

  const cronExecutionTime = new Date().toISOString()

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    const text = `authHeader: ${authHeader}, CRON_SECRET: ${process.env.CRON_SECRET}`

    // TODO REMOVE AFTER TESTING
    await payload.sendEmail({
      to: process.env.EMAIL_USER || '',
      subject: `CRON TEST EMAIL FAILED`,
      text: text,
      html: `<p>Cron execution time: ${cronExecutionTime}</p>`,
    })

    return new NextResponse('Unauthorized', { status: 401 })
  }

  // TODO REMOVE AFTER TESTING
  await payload.sendEmail({
    to: process.env.EMAIL_USER || '',
    subject: `CRON TEST EMAIL `,
    text: `SENDING FEEDBACK EMAILS`,
    html: `<p>Cron execution time: ${cronExecutionTime}</p>`,
  })

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
function getPayloadClient(arg0: { config: any }) {
  throw new Error('Function not implemented.')
}
