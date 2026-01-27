import Link from 'next/link'
import type { SurveyContent } from '@/payload-types'
import { DEFAULT_SURVEY_CONTENT } from '../survey/survey-content-defaults'

type SurveyCompletedPagePropsT = {
  surveyContent: SurveyContent | null
}

export default function SurveyCompletedPage({ surveyContent }: SurveyCompletedPagePropsT) {
  const content = surveyContent ?? DEFAULT_SURVEY_CONTENT
  const { completed } = content.uiMessages

  return (
    <main className="mx-auto max-w-[800px] py-32 px-4 xPaddings text-center grow content-center">
      <h1 className="text-2xl font-bold mb-4">{completed.surveyAlreadyCompletedTitle}</h1>
      <p>{completed.surveyAlreadyCompletedThankYou}</p>
      <div className={`pt-2 text-balance space-y-2`}>
        <p>{completed.surveyAlreadyCompletedInstructions}</p>
        <p>
          <Link href={`mailto:${completed.contactEmail}`}>{completed.contactEmail}</Link>
        </p>
      </div>
    </main>
  )
}
