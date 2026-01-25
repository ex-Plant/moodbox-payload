import 'server-only'

import { createHmac, timingSafeEqual } from 'crypto'
import { NextRequest } from 'next/server'
import { env } from '@/lib/env'

export async function verifyShopifyHmacHeader(req: NextRequest) {
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256')

  if (!hmacHeader)
    return {
      message: 'Unauthroized - missing shopify hmac header',
      status: 401,
    }

  try {
    const rawBody = await req.text()
    const generatedHash = createHmac('sha256', env.SHOPIFY_API_SECRET).update(rawBody).digest()
    const checksum = Buffer.from(hmacHeader, 'base64')

    if (
      generatedHash.length !== checksum.length ||
      !timingSafeEqual(new Uint8Array(generatedHash), new Uint8Array(checksum))
    ) {
      console.warn('🚨 Shopify HMAC mismatch')
      return {
        message: 'Unauthorized',
        status: 401,
      }
    }

    return {
      status: 200,
      body: JSON.parse(rawBody),
    }
  } catch (e) {
    console.error('❌ Webhook verification failed', e)
    return {
      message: 'Internal Server Error',
      status: 500,
    }
  }
}
