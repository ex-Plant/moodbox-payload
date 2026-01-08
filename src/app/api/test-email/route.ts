import { getPayload as getPayloadClient } from 'payload'
import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { buildPostOrderEmail } from '../../../utilities/buildPostOrderEmail'

export async function GET() {
  try {
    const payload = await getPayloadClient({
      config: configPromise,
    })

    console.log('Sending test email 🍆')

    const { subject, html } = buildPostOrderEmail(
      'http://localhost:3000/ankieta/ba0b6a7a-c9ab-4cb8-a237-417926cddef0',
    )

    await payload.sendEmail({
      to: process.env.EMAIL_USER || '',
      subject,
      // text: '',
      html,
    })

    return NextResponse.json({ success: true, message: 'Test email sent successfully' })
  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send test email',
      },
      { status: 500 },
    )
  }
}
