import { notFound } from 'next/navigation'
import { decodeOrderToken } from '@/lib/token/decodeOrderToken'
import { getOrderById } from '@/lib/shopify/adminApi'
import SurveyForm from '@/components/_custom_moodbox/survey/SurveyForm'

export const dynamic = 'force-dynamic'

type PostPurchasePagePropsT = {
  params: Promise<{ token: string }>
}

export default async function PostPurchasePage({ params }: PostPurchasePagePropsT) {
  const { token } = await params

  let orderId: string
  // try {
  //   const payload = decodeOrderToken(token)
  //   orderId = payload.orderId
  // } catch (error) {
  //   console.error('Failed to decode token:', error)
  //   notFound()
  // }

  const id = 'gid://shopify/Order/7377246191963'

  // const order = await getOrderById(orderId)
  const order = await getOrderById(id)
  if (!order) {
    // console.error('Order not found:', orderId)
    notFound()
  }

  // Extract unique brands from line items
  const brands = Array.from(
    new Set(
      order.lineItems.edges
        .map((edge) => edge.node.product?.metafield?.value)
        .filter((brand): brand is string => !!brand),
    ),
  )

  return (
    <main className="mx-auto max-w-[800px] mt-32 py-16 px-4">
      <SurveyForm order={order} availableBrands={brands} />
    </main>
  )
}
