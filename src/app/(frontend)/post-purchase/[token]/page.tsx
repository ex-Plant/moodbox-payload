import { notFound } from 'next/navigation'
import { decodeOrderToken } from '@/lib/token/decodeOrderToken'
import { getOrderById } from '@/lib/shopify/adminApi'

export const dynamic = 'force-dynamic'

type PostPurchasePagePropsT = {
  params: Promise<{ token: string }>
}

export default async function PostPurchasePage({ params }: PostPurchasePagePropsT) {
  const { token } = await params

  let orderId: string
  try {
    const payload = decodeOrderToken(token)
    orderId = payload.orderId
  } catch (error) {
    console.error('Failed to decode token:', error)
    notFound()
  }

  const order = await getOrderById(orderId)
  if (!order) {
    console.error('Order not found:', orderId)
    notFound()
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-semibold">We&apos;d love your feedback</h1>
      <p className="mb-6 text-sm text-gray-500">
        Thank you for your order {order.name}. We&apos;d appreciate your feedback on your recent
        purchase.
      </p>
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Order Details</h2>
        <p className="text-sm">Order: {order.name}</p>
        <p className="text-sm">Total: {order.totalPrice}</p>
        <p className="text-sm">Items: {order.lineItems.edges.length}</p>
      </div>
      {/* TODO: build dynamic questions based on order line items */}
      {/* TODO: render a form with questions */}
      <p>Feedback form coming soon.</p>
    </main>
  )
}
