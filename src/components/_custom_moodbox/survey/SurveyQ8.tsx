import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'
import { surveyQuestions, UI_MESSAGES } from './survey_constants'

export default function SurveyQ8() {
  const form = useSurveyContext()

  return (
    <QuestionWrapper>
      <SurveyQuestionHeader title={surveyQuestions[7].title} />
      <form.AppField name="improvement_suggestion">
        {(field) => <field.Textarea placeholder={UI_MESSAGES.YOUR_ANSWER_PLACEHOLDER} />}
      </form.AppField>
    </QuestionWrapper>
  )
}
