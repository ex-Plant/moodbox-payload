import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyQ1({ availableBrands }: PropsT) {
  const form = useSurveyContext()

  return (
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
                          toastMessage('Możesz wybrać maksymalnie 3 producentów', ToastType.Warning)
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
  )
}
