import { notFound } from 'next/navigation'
import configPromise from '@payload-config'

import { getOrderById } from '@/lib/shopify/adminApi'
import SurveyForm from '@/components/_custom_moodbox/survey/SurveyForm'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type PropsT = {
  params: Promise<{ token: string }>
}

export default async function Ankieta({ params }: PropsT) {
  const { token } = await params
  const payload = await getPayload({ config: configPromise })

  let orderId: string
  let order
  try {
    const res = await payload.find({
      collection: 'scheduled-emails',
      limit: 1,
      where: { token: { equals: token } },
    })

    if (res.docs.length < 1) {
      console.log('page.tsx:28 - res:', res)
      console.error('Email not found')
      notFound()
    }

    orderId = res.docs[0].orderId

    order = await getOrderById(orderId)
    if (!order) {
      console.error('Order not found:', orderId)
      notFound()
    }
  } catch (error) {
    console.error('Failed to decode token:', error)
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
    <main className="mx-auto max-w-[1440px] py-32 px-4 xPaddings ">
      <SurveyForm availableBrands={brands} />
    </main>
  )
}
