import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'

export default function SurveyQ8() {
  const form = useSurveyContext()

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Jedna rzecz, którą możemy poprawić w MoodBox:</h2>
      <form.AppField name="improvement_suggestion">
        {(field) => <field.Textarea placeholder="Twoja odpowiedź..." />}
      </form.AppField>
    </section>
  )
}
