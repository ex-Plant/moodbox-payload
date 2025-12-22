import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { Button } from '@/components/ui/button'
import SurveyCheckbox from './SurveyCheckbox'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'
import { surveyQuestions, UI_MESSAGES } from './survey_constants'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyQ6({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const contactRequest = useStore(form.store, (state) => state.values.contact_request)

  return (
    <QuestionWrapper className="space-y-6">
      <SurveyQuestionHeader title={surveyQuestions[5].title} />
      <form.AppField name="contact_request">
        {(field) => (
          <div className="flex gap-4">
            <Button
              type="button"
              variant={field.state.value ? 'mood' : 'secondary'}
              onClick={() => field.handleChange(true)}
            >
              {UI_MESSAGES.YES}
            </Button>
            <Button
              type="button"
              variant={!field.state.value ? 'mood' : 'secondary'}
              onClick={() => field.handleChange(false)}
            >
              {UI_MESSAGES.NO}
            </Button>
          </div>
        )}
      </form.AppField>

      {contactRequest && (
        <div className="p-4 border rounded bg-white space-y-4 animate-in slide-in-from-top-2 duration-300">
          <p className="font-medium">{UI_MESSAGES.WHICH_BRANDS}</p>
          <form.Field name="contact_brands">
            {(field) => {
              const current = (field.state.value as string[]) || []
              return (
                <div className="grid gap-2 md:grid-cols-2">
                  {availableBrands.map((brand) => {
                    const id = `contact-${brand}`
                    return (
                      <SurveyCheckbox
                        key={id}
                        id={id}
                        checked={current.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.handleChange([...current, brand])
                          } else {
                            field.handleChange(current.filter((b) => b !== brand))
                          }
                        }}
                        label={brand}
                      />
                    )
                  })}
                </div>
              )
            }}
          </form.Field>
        </div>
      )}
    </QuestionWrapper>
  )
}
