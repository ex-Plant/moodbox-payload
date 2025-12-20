import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import QuestionWrapper from './SurveyQuestionWrapper'

export default function SurveyQ7() {
  const form = useSurveyContext()

  return (
    <QuestionWrapper className="space-y-4">
      <h2 className="text-xl font-bold">
        Czy jest producent, którego realnie brakuje Ci w Moodboxie?
      </h2>
      <p className="text-sm text-muted-foreground">(jeśli tak — wpisz maksymalnie 1–2 marki)</p>
      <form.AppField name="missing_brands">
        {(field) => <field.Textarea placeholder="Twoja odpowiedź..." />}
      </form.AppField>
    </QuestionWrapper>
  )
}
