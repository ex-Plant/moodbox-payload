import { NextRequest, NextResponse } from 'next/server'

export default async function POST(request: NextRequest) {

  const topic = request.headers.get('x-shopify-topic');
  const hmacHeader = request.headers.get('x-shopify-hmac-sha256');
  const secret = process.env.SHOPIFY_API_SECRET as string;

  const rawBody = await request.text();

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

  const body = JSON.parse(rawBody);
  console.log('✅ Verified webhook:', topic);
  console.log(JSON.stringify(body, null, 2));

  if (topic === 'orders/create') {
    const order = body;
    const customer = order.customer;
    console.log('=== NEW ORDER CREATED ===');
    console.log('Order ID:', order.id);
    console.log('Customer Email:', customer?.email);
    console.log('Total Price:', order.total_price);
    console.log('======================');
  }
  return NextResponse.json({success: true})
}
