import { SelectItem } from '@/components/ui/select'
import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import QuestionWrapper from './SurveyQuestionWrapper'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyQ2({ availableBrands }: PropsT) {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)

  return (
    <QuestionWrapper className="space-y-4">
      <header>
        <h2 className="text-xl font-bold">
          Jeśli miał(a)byś wskazać jednego producenta, którego raczej nie rozważasz w tym projekcie
          — który by to był?
        </h2>
      </header>
      {/* <div className={`max-w-[500px]`}> */}
      <form.AppField name="rejected_brand">
        {(field) => (
          <field.Select placeholder="Wybierz producenta (opcjonalnie)">
            <SelectItem value="none">Nie mam takiego / wszyscy są OK</SelectItem>
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
