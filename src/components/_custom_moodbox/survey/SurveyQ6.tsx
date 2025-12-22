import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import QuestionWrapper from './SurveyQuestionWrapper'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyQ6({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const contactRequest = useStore(form.store, (state) => state.values.contact_request)

  return (
    <QuestionWrapper className="space-y-6">
      <header>
        <h2 className="text-xl font-bold">
          Czy chcesz, aby któryś z producentów skontaktował się z Tobą?
        </h2>
      </header>
      <form.AppField name="contact_request">
        {(field) => (
          <div className="flex gap-4">
            <Button
              type="button"
              variant={field.state.value ? 'mood' : 'secondary'}
              onClick={() => field.handleChange(true)}
            >
              Tak
            </Button>
            <Button
              type="button"
              variant={!field.state.value ? 'mood' : 'secondary'}
              onClick={() => field.handleChange(false)}
            >
              Nie
            </Button>
          </div>
        )}
      </form.AppField>

      {contactRequest && (
        <div className="p-4 border rounded bg-white space-y-4 animate-in slide-in-from-top-2 duration-300">
          <p className="font-medium">Które marki?</p>
          <form.Field name="contact_brands">
            {(field) => {
              const current = (field.state.value as string[]) || []
              return (
                <div className="grid gap-2 md:grid-cols-2">
                  {availableBrands.map((brand) => {
                    const id = `contact-${brand}`
                    return (
                      <div key={id} className="flex items-center space-x-2">
                        <Checkbox
                          id={id}
                          checked={current.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.handleChange([...current, brand])
                            } else {
                              field.handleChange(current.filter((b) => b !== brand))
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
              )
            }}
          </form.Field>
        </div>
      )}
    </QuestionWrapper>
  )
}
