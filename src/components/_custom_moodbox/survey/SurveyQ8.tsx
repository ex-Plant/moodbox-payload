import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'

export default function SurveyQ8() {
  const form = useSurveyContext()

  return (
    <QuestionWrapper>
      <SurveyQuestionHeader title="Jedna rzecz, którą możemy poprawić w MoodBox:" />
      <form.AppField name="improvement_suggestion">
        {(field) => <field.Textarea placeholder="Twoja odpowiedź..." />}
      </form.AppField>
    </QuestionWrapper>
  )
}
