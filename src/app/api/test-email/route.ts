import { getPayload as getPayloadClient } from 'payload'
import { NextResponse } from 'next/server'
import configPromise from '@payload-config'

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// }

export async function GET() {
  try {
    const payload = await getPayloadClient({
      config: configPromise,
    })

    await payload.sendEmail({
      to: process.env.EMAIL_USER || '',
      subject: 'Test Email from Payload',
      text: 'This is a test email from your Payload CMS.',
      html: '<h1>Test Email</h1><p>This is a test email from your Payload CMS.</p>'
    })

    return NextResponse.json({ success: true, message: 'Test email sent successfully' })
  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send test email'
      },
      { status: 500 }
    )
  }
}
