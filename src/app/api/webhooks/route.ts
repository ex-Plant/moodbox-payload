import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
export async function POST(request: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const topic = request.headers.get('x-shopify-topic')
  // const hmacHeader = request.headers.get('x-shopify-hmac-sha256')
  // const secret = process.env.SHOPIFY_API_SECRET as string

  // todo validate webhooks - currently something is wrong

  // if header missing
  // if (!hmacHeader) {
  // 	console.warn('⚠️ Missing HMAC header');
  // 	return new NextResponse('Unauthorized', { status: 401 });
  // }
  //
  // // recreate signature
  // const digest = createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64');
  //
  // const digestBuf = Buffer.from(digest, 'base64');
  // const hmacBuf = Buffer.from(hmacHeader, 'base64');
  //
  // // check lengths
  // if (digestBuf.length !== hmacBuf.length) {
  // 	console.warn('🚨 Shopify HMAC length mismatch');
  // 	return new NextResponse('Unauthorized', { status: 401 });
  // }
  //
  // // ✅ use existing buffers here
  // const verified = timingSafeEqual(digestBuf, hmacBuf);
  //
  // if (!verified) {
  // 	console.warn('🚨 Webhook verification failed!');
  // 	return new NextResponse('Unauthorized', { status: 401 });
  // }

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
        company_name: attributeMap.company_name || 'test_name',
        email: attributeMap.email || order.email || '',
        projects_per_year: attributeMap.projects_per_year || '',
        nip: attributeMap.nip || '',
        website: attributeMap.website || '',
        city: attributeMap.city || '',
        project_type: attributeMap.project_type || '',
        completion_date: attributeMap.completion_date || '',
        project_stage: attributeMap.project_stage || '',
        project_area: attributeMap.project_area || '',
        project_budget: attributeMap.project_budget || '',
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
