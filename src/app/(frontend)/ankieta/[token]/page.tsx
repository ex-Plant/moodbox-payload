import { notFound } from 'next/navigation'

import SurveyForm from '@/components/_custom_moodbox/survey/SurveyForm'
import { getOrderById } from '@/lib/shopify/adminApi'
import SurveyCompletedPage from '../../../../components/_custom_moodbox/nav/SurveyCompletedPage'
import { checkSurveyStatus } from '../../../actions/checkSurveyStatus'

export const dynamic = 'force-dynamic'

type PropsT = {
  params: Promise<{ token: string }>
}

export default async function Ankieta({ params }: PropsT) {
  const { token } = await params

  let order = null
  let surveyInfo

  try {
    const { orderId, isSurveyCompleted } = await checkSurveyStatus(token)
    surveyInfo = isSurveyCompleted

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

  if (surveyInfo) return <SurveyCompletedPage />

  return (
    <main className="mx-auto max-w-[800px] py-32 px-4 xPaddings relative ">
      <SurveyForm
        availableBrands={brands}
        customerName={order?.customer?.firstName}
        token={token}
      />
    </main>
  )
}
