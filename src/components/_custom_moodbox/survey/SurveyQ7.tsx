import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'

export default function SurveyQ7() {
  const form = useSurveyContext()

  return (
    <QuestionWrapper>
      <SurveyQuestionHeader
        title="Czy jest producent, którego realnie brakuje Ci w Moodboxie?"
        subtitle="(jeśli tak — wpisz maksymalnie 1–2 marki)"
      />
      <form.AppField name="missing_brands">
        {(field) => <field.Textarea placeholder="Twoja odpowiedź..." />}
      </form.AppField>
    </QuestionWrapper>
  )
}
