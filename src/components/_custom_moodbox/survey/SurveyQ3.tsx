import { useStore, type DeepKeys } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { SurveySchemaT } from '@/lib/SurveySchema'
import { Button } from '@/components/ui/button'

export default function SurveyQ3() {
  const form = useSurveyContext()
  const consideredBrands = useStore(form.store, (state) => state.values.considered_brands)

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-bold">
          P3. Na ile prawdopodobne jest, że użyjesz tego producenta w projekcie wnętrza?
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
          <h3 className="text-lg font-bold border-b pb-2">{brand}</h3>

          <form.Field name={`brand_evaluations.${brand}.rating` as DeepKeys<SurveySchemaT>}>
            {(field) => (
              <div className="space-y-2">
                <p className="text-sm font-medium">Ocena (1-5):</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      type="button"
                      variant={field.state.value === num ? 'mood' : 'outline'}
                      onClick={() => field.handleChange(num as never)}
                      className="w-12 h-12 text-lg font-bold"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </form.Field>
        </div>
      ))}
    </section>
  )
}
