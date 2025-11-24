import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
export async function POST(request: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const topic = request.headers.get('x-shopify-topic')
  // const hmacHeader = request.headers.get('x-shopify-hmac-sha256')
  // const secret = process.env.SHOPIFY_API_SECRET as string

  const rawBody = await request.text()
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
        company_name: attributeMap.company_name || 'Unknown Company', // Required field fallback
        email: attributeMap.email || order.email || '',
        projects_per_year: attributeMap.projects_per_year || null,
        nip: attributeMap.nip || null,
        website: attributeMap.website || null,
        city: attributeMap.city || null,
        project_type: attributeMap.project_type || null, // null for select fields, not ''
        completion_date: attributeMap.completion_date || null,
        project_stage: attributeMap.project_stage || null, // null for select fields, not ''
        project_area: attributeMap.project_area || null,
        project_budget: attributeMap.project_budget || null,
        consents: {
          consent1: consents?.consent1 || false,
          consent2: consents?.consent2 || false,
        },
      }

      console.log('=== SAVING CLIENT DATA ===')
      console.log(JSON.stringify(clientData, null, 2))

      await payload.create({
        collection: 'clients',
        data: clientData,
      })

      console.log('✅ Client data saved successfully')
    } catch (error) {
      console.error('❌ Error saving client data:', error)
      return NextResponse.json({ error: 'Failed to save client data' }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
