import { useState } from 'react'
import { toastMessage, ToastType } from '../../../lib/toasts/toasts'
import { Button } from '../../ui/button'
import SurveyCheckbox from './SurveyCheckbox'
import { useStore } from '@tanstack/react-form'
import useSurveyForm from '../../../lib/hooks/useSurveyForm'
import { useSurveyContext } from '../../../lib/hooks/tenStackFormHooks'
import { useSurveyContent } from './SurveyContentProvider'

export default function SurveyFooter() {
  const { currentStep, setStep } = useSurveyForm()
  const form = useSurveyContext()
  const { uiMessages } = useSurveyContent()

  const formValues = useStore(form.store, (state) => state.values)
  const submissionAttempts = useStore(form.store, (s) => s.submissionAttempts)
  const isFormValid = useStore(
    form.store,
    (state) => !state.isValidating && Object.keys(state.errors || {}).length === 0,
  )
  const hasFieldErrors = useStore(form.store, (state) =>
    Object.values(state.fieldMeta).some((meta) => meta.errors.length > 0),
  )

  const [termsAccepted, setTermsAccepted] = useState(false)
  const isInvalid = submissionAttempts > 0 && (!isFormValid || hasFieldErrors)
  const consideredBrands = formValues.considered_brands

  function nextStep() {
    if (consideredBrands.length < 1) {
      toastMessage(uiMessages.toasts.selectAtLeastOneBrand, ToastType.Info)
      return
    }
    if (currentStep < 3) setStep(currentStep + 1)
  }

  return (
    <div className={`flex flex-col items-end w-full `}>
      {currentStep < 3 && (
        <Button className={``} type="button" variant="mood" onClick={nextStep}>
          {uiMessages.buttons.nextStep}
        </Button>
      )}
      {currentStep === 3 && (
        <div>
          <SurveyCheckbox
            id="terms-acceptance"
            checked={termsAccepted}
            onCheckedChange={setTermsAccepted}
            label={uiMessages.terms.termsAcceptanceText}
          />
          <Button disabled={!termsAccepted} className={`mt-8`} type="submit" variant="mood">
            {uiMessages.buttons.sendSurvey}
          </Button>
          {isInvalid && (
            <p className="mt-2 text-sm text-destructive font-medium ">
              {uiMessages.errors.fixErrorsBeforeSending}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
