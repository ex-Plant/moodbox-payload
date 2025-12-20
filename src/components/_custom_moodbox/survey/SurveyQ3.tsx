import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Button } from '@/components/ui/button'
import { ratings } from './survey_constants'
import QuestionWrapper from './SurveyQuestionWrapper'

export default function SurveyQ3() {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)

  if (!consideredBrands || consideredBrands.length < 1) return null

  return (
    <QuestionWrapper className="space-y-6">
      <header>
        <h2 className="text-xl font-bold">
          Na ile prawdopodobne jest, że użyjesz tego producenta w projekcie wnętrza?
        </h2>
        <p className="text-sm text-muted-foreground">
          (biorąc pod uwagę jakość materiału, wygląd i przydatność projektową)
        </p>
      </header>

      {consideredBrands.map((brand) => (
        <div
          key={`eval-p3-${brand}`}
          className="p-6 border rounded-lg bg-white shadow-sm space-y-4"
        >
          <h3 className="text-lg font-bold border-b border-mood-brown pb-2">{brand}</h3>

          <form.Field name={`brand_evaluations.${brand}.rating` as DeepKeys<SurveySchemaT>}>
            {(field) => (
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  {ratings.map(({ rating, text }) => (
                    <div key={rating} className="flex items-center gap-4">
                      <Button
                        type="button"
                        size="icon-lg"
                        variant={field.state.value === rating ? 'mood' : 'ghost'}
                        onClick={() => {
                          if (field.state.value === rating) {
                            return field.handleChange(null)
                          }

                          return field.handleChange(rating as never)
                        }}
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
              </div>
            )}
          </form.Field>
        </div>
      ))}
    </QuestionWrapper>
  )
}
