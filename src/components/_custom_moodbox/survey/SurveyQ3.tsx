import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Button } from '@/components/ui/button'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyEvalCard from './SurveyEvalCard'
import SurveyQWrapper from './SurveyQWrapper'
import { Field, FieldError } from '../../ui/field'
import { useSurveyContent } from './SurveyContentProvider'

export default function SurveyQ3() {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)
  const { questions, ratings } = useSurveyContent()

  if (!consideredBrands || consideredBrands.length < 1) return null

  return (
    <SurveyQWrapper className="space-y-6">
      <SurveyQuestionHeader title={questions.q3.title} subtitle={questions.q3.subtitle} />

      {consideredBrands.map((brand) => (
        <form.Field
          key={brand}
          name={`brand_evaluations.${brand}.rating` as DeepKeys<SurveySchemaT>}
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <SurveyEvalCard brand={brand} questionId="p3" data-invalid={isInvalid}>
                <Field data-invalid={isInvalid} className="flex flex-col gap-2">
                  {(ratings ?? []).map((item, index) => {
                    const rating = index + 1
                    return (
                      <div key={rating} className="flex items-center gap-4">
                        <Button
                          type="button"
                          size="icon-lg"
                          variant={field.state.value === rating ? 'mood' : 'outline'}
                          onClick={() => field.handleChange(rating as never)}
                          className=" text-sm font-bold size-6 p-2"
                          aria-invalid={isInvalid}
                        >
                          {rating}
                        </Button>
                        <span
                          className={`text-sm ${
                            field.state.value === rating ? 'text-black' : 'text-muted-foreground'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    )
                  })}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </SurveyEvalCard>
            )
          }}
        </form.Field>
      ))}
    </SurveyQWrapper>
  )
}
