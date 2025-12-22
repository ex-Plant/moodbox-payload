import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'
import { surveyQuestions } from './survey_constants'

export default function SurveyQ7() {
  const form = useSurveyContext()

  return (
    <QuestionWrapper>
      <SurveyQuestionHeader
        title={surveyQuestions[6].title}
        subtitle={surveyQuestions[6].subtitle}
      />
      <form.AppField name="missing_brands">
        {(field) => <field.Textarea placeholder="Twoja odpowiedź..." />}
      </form.AppField>
    </QuestionWrapper>
  )
}
