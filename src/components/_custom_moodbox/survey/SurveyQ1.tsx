import SurveyCheckbox from './SurveyCheckbox'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyQWrapper from './SurveyQWrapper'
import { Field, FieldError } from '../../ui/field'
import { useSurveyContent } from './SurveyContentProvider'

type PropsT = {
  availableBrands: string[]
}

type FieldApi = {
  state: { value: string[] }
  handleChange: (value: string[]) => void
}

export default function SurveyQ1({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const { questions, uiMessages } = useSurveyContent()

  function toggle(checked: boolean, field: FieldApi, brand: string) {
    if (!checked) return field.handleChange(field.state.value.filter((b: string) => b !== brand))
    if (field.state.value.length < 3) return field.handleChange([...field.state.value, brand])
    toastMessage(uiMessages.toasts.maxBrandsSelected, ToastType.Warning)
  }

  return (
    <SurveyQWrapper>
      <SurveyQuestionHeader title={questions.q1.title} subtitle={questions.q1.subtitle} />
      <form.Field name="considered_brands">
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field className="grid gap-4 md:grid-cols-2" data-invalid={isInvalid}>
              {availableBrands.map((brand) => {
                const id = `considered-${brand}`
                return (
                  <SurveyCheckbox
                    key={id}
                    id={id}
                    checked={field.state.value.includes(brand)}
                    onCheckedChange={(checked) => toggle(!!checked, field, brand)}
                    label={brand}
                    aria-invalid={isInvalid}
                  />
                )
              })}
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      </form.Field>
    </SurveyQWrapper>
  )
}
