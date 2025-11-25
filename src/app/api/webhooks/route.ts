import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { createHmac, timingSafeEqual } from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const topic = request.headers.get('x-shopify-topic')
  const hmacHeader = request.headers.get('x-shopify-hmac-sha256')
  const secret = process.env.SHOPIFY_API_SECRET

  if (!secret) {
    console.error('❌ SHOPIFY_API_SECRET is not defined')
    return new NextResponse('Server Configuration Error', { status: 500 })
  }

  // Validate webhooks - CRITICAL for security
  if (!hmacHeader) {
    console.warn('⚠️ Missing HMAC header')
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Get raw body for HMAC calculation
  const rawBody = await request.text()

  // DEBUG: Log what we're working with
  console.log('🔍 DEBUG INFO:')
  console.log('Secret length:', secret?.length)
  console.log('Secret starts with:', secret?.substring(0, 10) + '...')
  console.log('HMAC header:', hmacHeader)
  console.log('Raw body length:', rawBody.length)
  console.log('Raw body preview:', rawBody.substring(0, 100) + '...')

  // Create digests
  const digest = createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64')

  console.log('Our calculated digest:', digest)

  const digestBuf = Buffer.from(digest, 'base64')
  const hmacBuf = Buffer.from(hmacHeader, 'base64')

  // Check lengths first (timingSafeEqual throws if lengths differ)
  if (digestBuf.length !== hmacBuf.length) {
    console.warn('🚨 Shopify HMAC length mismatch')
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Use timing-safe comparison to prevent timing attacks
  // wrapping in Uint8Array fixes the 'Buffer not assignable to Uint8Array' TS error
  const verified = timingSafeEqual(new Uint8Array(digestBuf), new Uint8Array(hmacBuf))

  if (!verified) {
    console.warn('🚨 Webhook verification failed!')
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Parse body only after verification
  const body = JSON.parse(rawBody)

  console.log('✅ Webhook received:', topic)
  console.log('Order data:', JSON.stringify(body, null, 2))

  if (topic === 'orders/create') {
    try {
      const order = body

      // Extract custom attributes from the order
      const customAttributes = order.note_attributes || []
      const attributeMap: Record<string, any> = {}

      // Convert array of attributes to key-value pairs3
      customAttributes.forEach((attr: { name: string; value: string }) => {
        attributeMap[attr.name] = attr.value
      })

      // Parse consents if it's a JSON string
      let consents = attributeMap.consents
      if (typeof consents === 'string') {
        try {
          consents = JSON.parse(consents)
        } catch {
          consents = {}
        }
      }

      // Create client record
      const clientData = {
        company_name: attributeMap['Nazwa firmy / pracowni'] || 'test_name',
        email: attributeMap['E-mail'] || order.email || '',
        projects_per_year: attributeMap['Liczba projektów rocznie'] || '',
        nip: attributeMap['NIP'] || '',
        website: attributeMap['Strona WWW'] || '',
        city: attributeMap['Miejscowość'] || '',
        project_type: attributeMap['Typ projektu'] || '',
        completion_date: attributeMap['Termin realizacji (MM/RR)'] || '',
        project_stage: attributeMap['Etap projektu'] || '',
        project_area: attributeMap['Metraż'] || '',
        project_budget: attributeMap['Budżet'] || '',
      }

      console.log('=== SAVING CLIENT DATA ===')
      console.log(JSON.stringify(clientData, null, 2))

      const existingClient = await payload.find({
        collection: 'clients',
        where: {
          email: {
            equals: clientData.email,
          },
        },
        limit: 1,
      })

      if (existingClient.docs.length > 0) {
        await payload.update({
          collection: 'clients',
          id: existingClient.docs[0].id,
          data: clientData,
        })
        console.log('✅ Existing client updated successfully')
      } else {
        await payload.create({
          collection: 'clients',
          data: clientData,
        })
        console.log('✅ Client data saved successfully')
      }
    } catch (error) {
      console.error('❌ Error saving client data:', error)
      return NextResponse.json({ error: 'Failed to save client data' }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
