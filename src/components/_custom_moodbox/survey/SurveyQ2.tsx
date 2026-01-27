import { SelectItem } from '@/components/ui/select'
import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyQWrapper from './SurveyQWrapper'
import { useSurveyContent } from './SurveyContentProvider'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyQ2({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)
  const { questions, uiMessages } = useSurveyContent()

  return (
    <SurveyQWrapper>
      <SurveyQuestionHeader title={questions.q2.title} subtitle={questions.q2.subtitle} />
      <form.AppField name="rejected_brand">
        {(field) => (
          <field.Select placeholder={uiMessages.formLabels.selectBrandOptional}>
            <SelectItem value="Brak">{uiMessages.formLabels.noSuchBrandOption}</SelectItem>
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
    </SurveyQWrapper>
  )
}
