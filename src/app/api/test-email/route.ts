import { getPayload as getPayloadClient } from 'payload'
import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { buildDiscountCodeEmail } from '../../../utilities/email_templates/buildDiscountCodeEmail'
import { checkAuth } from '@/utilities/checkAuth'
import { env } from '@/lib/env'

export async function GET() {
  try {
    // Authentication check
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in to the admin panel' },
        { status: 401 },
      )
    }

    const payload = await getPayloadClient({
      config: configPromise,
    })

    console.log('Sending test email 🍆')

    const { subject, html } = buildDiscountCodeEmail('To jest testowy kod rabatowy 🍆 : 123345')

    await payload.sendEmail({
      to: env.EMAIL_USER,
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
