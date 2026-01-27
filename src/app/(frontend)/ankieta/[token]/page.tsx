import { notFound } from 'next/navigation'

import SurveyForm from '@/components/_custom_moodbox/survey/SurveyForm'
import { getOrderById } from '@/lib/shopify/adminApi'
import SurveyCompletedPage from '../../../../components/_custom_moodbox/nav/SurveyCompletedPage'
import { checkSurveyStatus } from '../../../actions/checkSurveyStatus'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { DEFAULT_SURVEY_CONTENT } from '@/components/_custom_moodbox/survey/survey-content-defaults'
import type { SurveyContent } from '@/payload-types'

export const dynamic = 'force-dynamic'

type PropsT = {
  params: Promise<{ token: string }>
}

export default async function Ankieta({ params }: PropsT) {
  const { token } = await params

  let order = null
  let surveyInfo

  const surveyContent =
    ((await getCachedGlobal('survey-content', 0)()) as SurveyContent) ?? DEFAULT_SURVEY_CONTENT

  try {
    const { linkedOrderDocId, isSurveyCompleted } = await checkSurveyStatus(token)
    surveyInfo = isSurveyCompleted

    order = await getOrderById(`gid://shopify/Order/${linkedOrderDocId}`)
    if (!order) {
      console.error('Order not found:', linkedOrderDocId)
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

  if (surveyInfo) return <SurveyCompletedPage surveyContent={surveyContent} />

  return (
    <main className="mx-auto max-w-[800px] py-32 px-4 xPaddings relative ">
      <SurveyForm
        availableBrands={brands}
        customerName={order?.customer?.firstName}
        token={token}
        surveyContent={surveyContent}
      />
    </main>
  )
}
