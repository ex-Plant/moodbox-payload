import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { REASONS_P4A, REASONS_P4B } from './survey_constants'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'

export default function SurveyQ4() {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)
  const brandEvaluations = useStore(form.store, (state) => state.values.brand_evaluations)

  const hasRating = consideredBrands.some((brand) => brandEvaluations[brand]?.rating)

  if (!consideredBrands || consideredBrands.length < 1 || !hasRating) return null

  return (
    <QuestionWrapper className="space-y-6">
      <SurveyQuestionHeader title="Szczegółowa ocena wybranych marek:" />

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
                        ? 'Co najbardziej przemawia za użyciem tej marki w projekcie?'
                        : 'Co ogranicza użycie tej marki in tym projekcie?'}
                      <span className="text-xs text-muted-foreground block">(wybierz maks. 2)</span>
                    </p>
                    <div className="grid gap-2">
                      {reasons.map((reason) => {
                        const id = `reason-${brand}-${reason}`
                        return (
                          <div key={reason} className="flex items-center space-x-2">
                            <Checkbox
                              id={id}
                              checked={currentReasons.includes(reason)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  if (currentReasons.length < 2) {
                                    field.handleChange([...currentReasons, reason] as never)
                                  } else {
                                    toastMessage(
                                      'Możesz wybrać maksymalnie 2 powody',
                                      ToastType.Warning,
                                    )
                                  }
                                } else {
                                  field.handleChange(
                                    currentReasons.filter((r) => r !== reason) as never,
                                  )
                                }
                              }}
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
                          <otherField.Input placeholder="Co dokładnie?" className="mt-2" />
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
