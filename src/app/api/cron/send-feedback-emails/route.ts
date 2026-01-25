import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { sendScheduledEmail } from '@/lib/shopify/webhooks/sendScheduledEmail'
import { getPayload } from 'payload'
import { env } from '@/lib/env'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  console.log(`Initializing send-feedback-emails cron`)
  const authHeader: string | null = req.headers.get('authorization')
  const expected: string = `Bearer ${env.CRON_SECRET}`

  const payload = await getPayload({
    config: configPromise,
  })

  const cronExecutionTime = new Date().toISOString()

  if (authHeader !== expected) {
    const text = `authHeader: ${authHeader}`

    // TODO REMOVE AFTER TESTING
    await payload.sendEmail({
      to: env.EMAIL_USER,
      subject: `CRON TEST EMAIL FAILED`,
      text: text,
      html: `<p>Cron execution time: ${cronExecutionTime}</p>`,
    })

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
