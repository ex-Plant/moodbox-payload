import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import { surveyQuestions, UI_MESSAGES } from './survey_constants'
import SurveyQWrapper from './SurveyQWrapper'

export default function SurveyQ7() {
  const form = useSurveyContext()

  return (
    <SurveyQWrapper>
      <SurveyQuestionHeader
        title={surveyQuestions[6].title}
        subtitle={surveyQuestions[6].subtitle}
      />
      <form.AppField name="missing_brands">
        {(field) => <field.Textarea placeholder={UI_MESSAGES.YOUR_ANSWER_PLACEHOLDER} />}
      </form.AppField>
    </SurveyQWrapper>
  )
}
