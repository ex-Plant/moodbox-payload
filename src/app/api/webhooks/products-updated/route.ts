// src/app/api/webhooks/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { verifyShopifyHmacHeader } from '@/lib/shopify/webhooks/verifyShopifyHmacHeader'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const verified = await verifyShopifyHmacHeader(request)

  if (verified.status !== 200)
    return new NextResponse(verified.message, { status: verified.status })

  const topic = request.headers.get('x-shopify-topic')

  if (
    topic === 'products/update' ||
    topic === 'products/create' ||
    topic === 'products/delete' ||
    topic === 'inventory_levels/update'
  ) {
    // Revalidate your collections and products cache
    revalidateTag('collections', 'max')
    revalidateTag('products', 'max')

    console.log(`✅ Revalidated collections cache due to ${topic}`)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ message: 'Topic not handled' }, { status: 200 })
}
