import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Button } from '@/components/ui/button'
import { ratings, surveyQuestions } from './survey_constants'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyEvalCard from './SurveyEvalCard'
import SurveyQWrapper from './SurveyQWrapper'
import { Field, FieldError } from '../../ui/field'

export default function SurveyQ3() {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)

  if (!consideredBrands || consideredBrands.length < 1) return null

  return (
    <SurveyQWrapper className="space-y-6">
      <SurveyQuestionHeader
        title={surveyQuestions[2].title}
        subtitle={surveyQuestions[2].subtitle}
      />

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
                  {ratings.map(({ rating, text }) => (
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
                        {text}
                      </span>
                    </div>
                  ))}

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
