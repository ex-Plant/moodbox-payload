import { useStore } from '@tanstack/react-form'
import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { REASONS_P5, surveyQuestions, UI_MESSAGES } from './survey_constants'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import QuestionWrapper from './SurveyQuestionWrapper'
import { toggleReasons } from './helpers/toggleReasons'

export default function SurveyQ5() {
  const form = useSurveyContext()
  const rejectedBrand = useStore(form.store, (state) => state.values.rejected_brand)

  if (!rejectedBrand || rejectedBrand === 'none') return null

  return (
    <QuestionWrapper className="p-6 border rounded-lg bg-mood-beige/20 space-y-6">
      <SurveyQuestionHeader
        title={surveyQuestions[4].title.replace('{rejectedBrand}', rejectedBrand)}
        subtitle={surveyQuestions[4].subtitle}
      />
      <form.Field name="rejection_reasons">
        {(field) => {
          const current = (field.state.value as string[]) || []
          return (
            <div className="grid gap-2">
              {REASONS_P5.map((reason) => {
                const id = `rej-reason-${reason}`
                return (
                  <div key={reason} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={current.includes(reason)}
                      onCheckedChange={(v) => toggleReasons(!!v, current, field, reason)}
                    />
                    <Label htmlFor={id} className="cursor-pointer">
                      {reason}
                    </Label>
                  </div>
                )
              })}
              {current.includes('inne') && (
                <form.AppField name="rejection_other">
                  {(otherField) => <otherField.Input placeholder={UI_MESSAGES.SPECIFY_EXACTLY} />}
                </form.AppField>
              )}
            </div>
          )
        }}
      </form.Field>
    </QuestionWrapper>
  )
}
