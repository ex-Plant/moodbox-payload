import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { SelectItem } from '@/components/ui/select'
import { useStore } from '@tanstack/react-form'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { useSurveyContext } from '../../../lib/hooks/tenStackFormHooks'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyStepOne({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const formValues = useStore(form.store, (state) => state.values)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="space-y-4">
        <header>
          <h2 className="text-xl font-bold">
            P1. Których producentów z Twojego boxa realnie rozważył(a)byś w deklarowanym projekcie?
          </h2>
          <p className="text-sm text-muted-foreground">(wybierz maks. 3)</p>
        </header>
        <form.Field name="considered_brands">
          {(field) => (
            <div className="grid gap-4 md:grid-cols-2">
              {availableBrands.map((brand) => {
                const id = `considered-${brand}`
                const isChecked = field.state.value.includes(brand)
                return (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          if (field.state.value.length < 3) {
                            field.handleChange([...field.state.value, brand])
                          } else {
                            toastMessage(
                              'Możesz wybrać maksymalnie 3 producentów',
                              ToastType.Warning,
                            )
                          }
                        } else {
                          field.handleChange(field.state.value.filter((b) => b !== brand))
                        }
                      }}
                    />
                    <Label htmlFor={id} className="cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                )
              })}
            </div>
          )}
        </form.Field>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-xl font-bold">
            P2. Jeśli miał(a)byś wskazać jednego producenta, którego raczej nie rozważasz w tym
            projekcie — który by to był?
          </h2>
        </header>
        <form.AppField name="rejected_brand">
          {(field) => (
            <field.Select placeholder="Wybierz producenta (opcjonalnie)">
              <SelectItem value="none">Nie mam takiej / wszystkie są OK</SelectItem>
              {availableBrands.map((brand) => (
                <SelectItem
                  key={`rejected-${brand}`}
                  value={brand}
                  disabled={formValues.considered_brands.includes(brand)}
                >
                  {brand}
                </SelectItem>
              ))}
            </field.Select>
          )}
        </form.AppField>
      </section>
    </div>
  )
}
