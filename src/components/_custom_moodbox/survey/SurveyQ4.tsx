import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { REASONS_P4A, REASONS_P4B, surveyQuestions, UI_MESSAGES } from './survey_constants'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'

export default function SurveyQ4() {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)
  const brandEvaluations = useStore(form.store, (state) => state.values.brand_evaluations)

  const hasRating = consideredBrands.some((brand) => brandEvaluations[brand]?.rating)
  if (!consideredBrands || consideredBrands.length < 1 || !hasRating) return null

  function toggle(checked: boolean, current: string[], field: any, reason: string) {
    if (!checked) return field.handleChange(current.filter((r) => r !== reason) as never)
    if (current.length < 2) return field.handleChange([...current, reason] as never)

    toastMessage(UI_MESSAGES.MAX_REASONS_SELECTED, ToastType.Warning)
  }

  return (
    <QuestionWrapper className="space-y-6">
      <SurveyQuestionHeader title={surveyQuestions[3].title} />

      {consideredBrands.map((brand) => {
        if (!brandEvaluations[brand]?.rating) return null

        return (
          <div
            key={`eval-p4-${brand}`}
            className="p-6 border rounded-lg bg-white shadow-sm space-y-6"
          >
            <h3 className="text-lg font-bold border-b pb-2">{brand}</h3>

            <form.Field name={`brand_evaluations.${brand}.reasons` as DeepKeys<SurveySchemaT>}>
              {(field) => {
                const rating = brandEvaluations[brand].rating
                const isPositive = (rating || 0) >= 4
                const reasons = isPositive ? REASONS_P4A : REASONS_P4B
                const currentReasons = (field.state.value as string[]) || []

                return (
                  <div className="space-y-4">
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
                        return (
                          <div key={reason} className="flex items-center space-x-2">
                            <Checkbox
                              id={id}
                              checked={currentReasons.includes(reason)}
                              onCheckedChange={(checked) =>
                                toggle(!!checked, currentReasons, field, reason)
                              }
                            />
                            <Label htmlFor={id} className="cursor-pointer">
                              {reason}
                            </Label>
                          </div>
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
                  </div>
                )
              }}
            </form.Field>
          </div>
        )
      })}
    </QuestionWrapper>
  )
}
