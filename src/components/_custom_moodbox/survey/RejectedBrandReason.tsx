import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { REASONS_P5 } from './survey_constants'

export default function RejectedBrandReason() {
  const form = useSurveyContext()
  const formValues = useStore(form.store, (state) => state.values)

  if (!formValues.rejected_brand || formValues.rejected_brand === 'none') return null

  return (
    <section className="p-6 border rounded-lg bg-mood-beige/20 space-y-6">
      <header>
        <h2 className="text-xl font-bold">
          P5. Dlaczego marka {formValues.rejected_brand} nie sprawdzi się w tym projekcie?
        </h2>
        <p className="text-sm text-muted-foreground">(wybierz maksymalnie 2)</p>
      </header>
      <form.Field name="rejection_reasons">
        {(field) => {
          const current = (field.state.value as string[]) || []
          return (
            <div className="grid gap-2">
              {REASONS_P5.map((reason) => {
                const id = `rej-reason-${reason}`
                return (
                  <div key={reason} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={current.includes(reason)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          if (current.length < 2) {
                            field.handleChange([...current, reason])
                          } else {
                            toastMessage('Możesz wybrać maksymalnie 2 powody', ToastType.Warning)
                          }
                        } else {
                          field.handleChange(current.filter((r) => r !== reason))
                        }
                      }}
                    />
                    <Label htmlFor={id} className="cursor-pointer">
                      {reason}
                    </Label>
                  </div>
                )
              })}
              {current.includes('inne') && (
                <form.AppField name="rejection_other">
                  {(otherField) => <otherField.Input placeholder="Co dokładnie?" />}
                </form.AppField>
              )}
            </div>
          )
        }}
      </form.Field>
    </section>
  )
}
