import { NextRequest, NextResponse } from 'next/server'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const verified = await verifyShopifyHmacHeader(req)
  if (verified.status !== 200) {
    //   shopify expects status code only, body is irrelevant
    return new NextResponse(verified.message, { status: verified.status })
  }

  return NextResponse.json('')
}

/* 
      NextResponse.json() builds a JSON response body with:
      { "message": "Unauthorized: Missing Signature" }
      new NextResponse('Unauthorized: Missing Signature', { status: 401 }) sends a plain text payload:
      Unauthorized: Missing Signature
      In webhook endpoints, it’s common and preferable to return plain text (or even an empty body) for error responses: 
      - faster, more performant
      - shopify expects status code only, body is irrelevant
      */
