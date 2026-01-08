import Link from 'next/link'
import { UI_MESSAGES } from '../survey/survey_constants'

export default function SurveyCompletedPage() {
  return (
    <main className="mx-auto max-w-[800px] py-32 px-4 xPaddings text-center grow content-center">
      <h1 className="text-2xl font-bold mb-4">{UI_MESSAGES.SURVEY_ALREADY_COMPLETED_TITLE}</h1>
      <p>{UI_MESSAGES.SURVEY_ALREADY_COMPLETED_THANK_YOU}</p>
      <div className={`pt-2 text-balance space-y-2`}>
        <p>{UI_MESSAGES.SURVEY_ALREADY_COMPLETED_INSTRUCTIONS}</p>
        <p>
          <Link href={`mailto:${UI_MESSAGES.CONTACT_EMAIL}`}>{UI_MESSAGES.CONTACT_EMAIL}</Link>
        </p>
      </div>
    </main>
  )
}
