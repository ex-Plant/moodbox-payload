import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import SurveyCheckbox from './SurveyCheckbox'
import { REASONS_P4A, REASONS_P4B, surveyQuestions, UI_MESSAGES } from './survey_constants'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyEvalCard from './SurveyEvalCard'
import { toggleReasons } from './helpers/toggleReasons'
import SurveyQWrapper from './SurveyQWrapper'
import { Field, FieldError } from '../../ui/field'

export default function SurveyQ4() {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)
  const brandEvaluations = useStore(form.store, (state) => state.values.brand_evaluations)

  // show this section after at least one producer is rated
  const hasRating = consideredBrands.some((brand) => brandEvaluations[brand]?.rating)
  if (!consideredBrands || consideredBrands.length < 1 || !hasRating) return null

  return (
    <SurveyQWrapper className="space-y-6">
      <SurveyQuestionHeader title={surveyQuestions[3].title} />

      {consideredBrands.map((brand) => {
        if (!brandEvaluations[brand]?.rating) return null

        return (
          <form.Field
            key={brand}
            name={`brand_evaluations.${brand}.reasons` as DeepKeys<SurveySchemaT>}
          >
            {(field) => {
              const rating = brandEvaluations[brand].rating
              const isPositive = (rating || 0) >= 4
              const reasons = isPositive ? REASONS_P4A : REASONS_P4B
              const currentReasons = (field.state.value as string[]) || []
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <SurveyEvalCard brand={brand} questionId="p4" data-invalid={isInvalid}>
                  <Field data-invalid={isInvalid} className="space-y-4">
                    <p className="font-medium">
                      {isPositive
                        ? UI_MESSAGES.POSITIVE_BRAND_QUESTION
                        : UI_MESSAGES.NEGATIVE_BRAND_QUESTION}
                      <span className="text-xs text-muted-foreground block">
                        {UI_MESSAGES.SELECT_MAX_2}
                      </span>
                    </p>
                    <div className="grid gap-2">
                      {reasons.map((reason) => {
                        const id = `reason-${brand}-${reason}`
                        const checked = currentReasons.includes(reason)

                        return (
                          <SurveyCheckbox
                            key={reason}
                            id={id}
                            checked={checked}
                            onCheckedChange={(v) =>
                              toggleReasons(!!v, currentReasons, field, reason)
                            }
                            label={reason}
                            aria-invalid={isInvalid}
                          />
                        )
                      })}
                    </div>

                    {currentReasons.includes('inne') && (
                      <form.AppField
                        name={`brand_evaluations.${brand}.other_reason` as DeepKeys<SurveySchemaT>}
                      >
                        {(otherField) => (
                          <otherField.Input
                            placeholder={UI_MESSAGES.SPECIFY_EXACTLY}
                            className="mt-2"
                          />
                        )}
                      </form.AppField>
                    )}
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                </SurveyEvalCard>
              )
            }}
          </form.Field>
        )
      })}
    </SurveyQWrapper>
  )
}
