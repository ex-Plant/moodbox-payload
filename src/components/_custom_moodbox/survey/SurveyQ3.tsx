import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Button } from '@/components/ui/button'
import { ratings, surveyQuestions } from './survey_constants'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyEvalCard from './SurveyEvalCard'
import SurveyQWrapper from './SurveyQWrapper'

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
        <SurveyEvalCard key={brand} brand={brand} questionId="p3">
          <form.Field name={`brand_evaluations.${brand}.rating` as DeepKeys<SurveySchemaT>}>
            {(field) => (
              <div className="flex flex-col gap-2">
                {ratings.map(({ rating, text }) => (
                  <div key={rating} className="flex items-center gap-4">
                    <Button
                      type="button"
                      size="icon-lg"
                      variant={field.state.value === rating ? 'mood' : 'outline'}
                      onClick={() => field.handleChange(rating as never)}
                      className=" text-sm font-bold size-6 p-2"
                    >
                      {rating}
                    </Button>
                    <span
                      className={`text-sm ${field.state.value === rating ? 'font-bold' : 'text-muted-foreground'}`}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </form.Field>
        </SurveyEvalCard>
      ))}
    </SurveyQWrapper>
  )
}
