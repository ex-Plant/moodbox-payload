import SurveyCheckbox from './SurveyCheckbox'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import { surveyQuestions, UI_MESSAGES } from './survey_constants'
import SurveyQWrapper from './SurveyQWrapper'
type PropsT = {
  availableBrands: string[]
}

type FieldApi = {
  state: { value: string[] }
  handleChange: (value: string[]) => void
}

export default function SurveyQ1({ availableBrands }: PropsT) {
  const form = useSurveyContext()

  function toggle(checked: boolean, field: FieldApi, brand: string) {
    if (!checked) return field.handleChange(field.state.value.filter((b: string) => b !== brand))
    if (field.state.value.length < 3) return field.handleChange([...field.state.value, brand])
    toastMessage(UI_MESSAGES.MAX_BRANDS_SELECTED, ToastType.Warning)
  }

  return (
    <SurveyQWrapper>
      <SurveyQuestionHeader
        title={surveyQuestions[0].title}
        subtitle={surveyQuestions[0].subtitle}
      />
      <form.Field name="considered_brands">
        {(field) => (
          <div className="grid gap-4 md:grid-cols-2">
            {availableBrands.map((brand) => {
              const id = `considered-${brand}`
              return (
                <SurveyCheckbox
                  key={id}
                  id={id}
                  checked={field.state.value.includes(brand)}
                  onCheckedChange={(checked) => toggle(!!checked, field, brand)}
                  label={brand}
                />
              )
            })}
          </div>
        )}
      </form.Field>
    </SurveyQWrapper>
  )
}
