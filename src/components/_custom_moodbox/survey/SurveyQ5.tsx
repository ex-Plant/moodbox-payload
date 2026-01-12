import SurveyCheckbox from './SurveyCheckbox'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { useStore } from '@tanstack/react-form'
import { toggleReasons } from './helpers/toggleReasons'
import { REASONS_P5, surveyQuestions, UI_MESSAGES } from './survey_constants'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyEvalCard from './SurveyEvalCard'
import SurveyQWrapper from './SurveyQWrapper'
import { Field, FieldError } from '../../ui/field'

export default function SurveyQ5() {
  const form = useSurveyContext()
  const rejectedBrand = useStore(form.store, (state) => state.values.rejected_brand)

  if (!rejectedBrand || rejectedBrand === 'none') return null

  return (
    <SurveyQWrapper className="space-y-6">
      <SurveyQuestionHeader
        title={surveyQuestions[4].title.replace('{rejectedBrand}', rejectedBrand)}
        subtitle={surveyQuestions[4].subtitle}
      />
      <form.Field name="rejection_reasons">
        {(field) => {
          const current = (field.state.value as string[]) || []
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <SurveyEvalCard brand={rejectedBrand} questionId="p4" data-invalid={isInvalid}>
              <Field data-invalid={isInvalid} className="grid gap-2">
                {REASONS_P5.map((reason) => {
                  const id = `rej-reason-${reason}`
                  return (
                    <SurveyCheckbox
                      key={reason}
                      id={id}
                      checked={current.includes(reason)}
                      onCheckedChange={(v) => toggleReasons(!!v, current, field, reason)}
                      label={reason}
                      aria-invalid={isInvalid}
                    />
                  )
                })}
                {current.includes('inne') && (
                  <form.AppField name="rejection_other">
                    {(otherField) => <otherField.Input placeholder={UI_MESSAGES.SPECIFY_EXACTLY} />}
                  </form.AppField>
                )}
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            </SurveyEvalCard>
          )
        }}
      </form.Field>
    </SurveyQWrapper>
  )
}
