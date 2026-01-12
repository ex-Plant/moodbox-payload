import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { Button } from '@/components/ui/button'
import SurveyCheckbox from './SurveyCheckbox'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import { surveyQuestions, UI_MESSAGES } from './survey_constants'
import SurveyEvalCard from './SurveyEvalCard'
import SurveyQWrapper from './SurveyQWrapper'
import { Field, FieldError } from '../../ui/field'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyQ6({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const contactRequest = useStore(form.store, (state) => state.values.contact_request)

  return (
    <SurveyQWrapper className="space-y-6">
      <SurveyQuestionHeader title={surveyQuestions[5].title} />
      <form.Field name="contact_request">
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid} className="flex flex-col gap-2">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={!field.state.value ? 'mood' : 'outline'}
                  onClick={() => field.handleChange(false)}
                  aria-invalid={isInvalid}
                >
                  {UI_MESSAGES.NO}
                </Button>
                <Button
                  type="button"
                  variant={field.state.value ? 'mood' : 'outline'}
                  onClick={() => field.handleChange(true)}
                  aria-invalid={isInvalid}
                >
                  {UI_MESSAGES.YES}
                </Button>
              </div>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      </form.Field>

      {contactRequest && (
        <form.Field name="contact_brands">
          {(field) => {
            const current = (field.state.value as string[]) || []
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <SurveyEvalCard
                className={`fade-in  animate-in  duration-500`}
                data-invalid={isInvalid}
              >
                <Field data-invalid={isInvalid} className="space-y-4">
                  <p className="font-medium">{UI_MESSAGES.WHICH_BRANDS}</p>
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
                          aria-invalid={isInvalid}
                        />
                      )
                    })}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </SurveyEvalCard>
            )
          }}
        </form.Field>
      )}
    </SurveyQWrapper>
  )
}
