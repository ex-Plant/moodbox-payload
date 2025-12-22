import { SelectItem } from '@/components/ui/select'
import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'
import { surveyQuestions, UI_MESSAGES } from './survey_constants'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyQ2({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)

  return (
    <QuestionWrapper>
      <SurveyQuestionHeader title={surveyQuestions[1].title} />
      <form.AppField name="rejected_brand">
        {(field) => (
          <field.Select placeholder={UI_MESSAGES.SELECT_BRAND_OPTIONAL}>
            <SelectItem value="none">{UI_MESSAGES.NO_SUCH_BRAND_OPTION}</SelectItem>
            {availableBrands.map((brand) => (
              <SelectItem
                key={`rejected-${brand}`}
                value={brand}
                disabled={consideredBrands.includes(brand)}
              >
                {brand}
              </SelectItem>
            ))}
          </field.Select>
        )}
      </form.AppField>
    </QuestionWrapper>
  )
}
