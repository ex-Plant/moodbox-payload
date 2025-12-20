import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { REASONS_P4A, REASONS_P4B } from './survey_constants'

export default function BrandEvaluation() {
  const form = useSurveyContext()
  const formValues = useStore(form.store, (state) => state.values)

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-bold">
          P3. Na ile prawdopodobne jest, że użyjesz tego producenta w projekcie wnętrza?
        </h2>
        <p className="text-sm text-muted-foreground">
          (biorąc pod uwagę jakość materiału, wygląd i przydatność projektową)
        </p>
      </header>

      {formValues.considered_brands.map((brand) => (
        <div key={`eval-${brand}`} className="p-6 border rounded-lg bg-white shadow-sm space-y-6">
          <h3 className="text-lg font-bold border-b pb-2">{brand}</h3>

          <form.Field name={`brand_evaluations.${brand}.rating` as DeepKeys<SurveySchemaT>}>
            {(field) => (
              <div className="space-y-2">
                <p className="text-sm font-medium">Ocena (1-5):</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      type="button"
                      variant={field.state.value === num ? 'mood' : 'outline'}
                      onClick={() => field.handleChange(num as never)}
                      className="w-12 h-12 text-lg font-bold"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </form.Field>

          {formValues.brand_evaluations[brand]?.rating && (
            <form.Field name={`brand_evaluations.${brand}.reasons` as DeepKeys<SurveySchemaT>}>
              {(field) => {
                const rating = formValues.brand_evaluations[brand].rating
                const isPositive = (rating || 0) >= 4
                const reasons = isPositive ? REASONS_P4A : REASONS_P4B
                const currentReasons = (field.state.value as string[]) || []

                return (
                  <div className="space-y-4 pt-4 border-t">
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
          )}
        </div>
      ))}
    </section>
  )
}
