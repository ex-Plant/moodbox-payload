import { getPayload as getPayloadClient } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { buildDiscountCodeEmail } from '../../../utilities/email_templates/buildDiscountCodeEmail'
import { buildPostOrderEmail } from '../../../utilities/email_templates/buildPostOrderEmail'
import { checkAuth } from '@/utilities/checkAuth'

export async function GET(request: NextRequest) {
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

    const template = request.nextUrl.searchParams.get('template') ?? 'discount'

    console.log(`Sending test email (${template}) 🍆`)

    const emailContent = await payload.findGlobal({ slug: 'email-content' })

    let subject: string
    let html: string

    if (template === 'survey') {
      ;({ subject, html } = buildPostOrderEmail(
        'https://moodbox.pl/ankieta/test-token',
        emailContent.surveyInvitation,
      ))
    } else {
      ;({ subject, html } = buildDiscountCodeEmail(
        'To jest testowy kod rabatowy 🍆 : 123345',
        emailContent.discountCode,
      ))
    }

    await payload.sendEmail({
      to: 'konradantonik@gmail.com',
      subject,
      html,
    })

    return NextResponse.json({
      success: true,
      message: `Test email (${template}) sent successfully`,
    })
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
