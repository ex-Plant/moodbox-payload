import SurveyCheckbox from './SurveyCheckbox'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { useStore } from '@tanstack/react-form'
import { toggleReasons } from './helpers/toggleReasons'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyEvalCard from './SurveyEvalCard'
import SurveyQWrapper from './SurveyQWrapper'
import { Field, FieldError } from '../../ui/field'
import { useSurveyContent } from './SurveyContentProvider'

export default function SurveyQ5() {
  const form = useSurveyContext()
  const rejectedBrand = useStore(form.store, (state) => state.values.rejected_brand)
  const { questions, reasonsRejection, uiMessages } = useSurveyContent()

  if (
    !rejectedBrand ||
    rejectedBrand.toLocaleLowerCase() === 'none' ||
    rejectedBrand.toLocaleLowerCase() === 'brak'
  )
    return null

  const title = questions.q5.title.replace('{rejectedBrand}', rejectedBrand)

  return (
    <SurveyQWrapper className="space-y-6">
      <SurveyQuestionHeader title={title} subtitle={questions.q5.subtitle} />
      <form.Field name="rejection_reasons">
        {(field) => {
          const current = (field.state.value as string[]) || []
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <SurveyEvalCard brand={rejectedBrand} questionId="p4" data-invalid={isInvalid}>
              <Field data-invalid={isInvalid} className="grid gap-2">
                {(reasonsRejection ?? []).map((item) => {
                  const reason = item.text
                  const id = `rej-reason-${reason}`
                  return (
                    <SurveyCheckbox
                      key={reason}
                      id={id}
                      checked={current.includes(reason)}
                      onCheckedChange={(v) =>
                        toggleReasons(
                          !!v,
                          current,
                          field,
                          reason,
                          uiMessages.toasts.maxReasonsSelected,
                        )
                      }
                      label={reason}
                      aria-invalid={isInvalid}
                    />
                  )
                })}
                {current.includes('inne') && (
                  <form.AppField name="rejection_other">
                    {(otherField) => (
                      <otherField.Input placeholder={uiMessages.formLabels.specifyExactly} />
                    )}
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
