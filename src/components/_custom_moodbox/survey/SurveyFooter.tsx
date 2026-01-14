import { useState } from 'react'
import { toastMessage, ToastType } from '../../../lib/toasts/toasts'
import { Button } from '../../ui/button'
import { UI_MESSAGES } from './survey_constants'
import SurveyCheckbox from './SurveyCheckbox'
import { useStore } from '@tanstack/react-form'
import useSurveyForm from '../../../lib/hooks/useSurveyForm'
import { useSurveyContext } from '../../../lib/hooks/tenStackFormHooks'

export default function SurveyFooter() {
  const { currentStep, setStep } = useSurveyForm()
  const form = useSurveyContext()

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
      toastMessage(UI_MESSAGES.SELECT_AT_LEAST_ONE_BRAND, ToastType.Info)
      return
    }
    if (currentStep < 3) setStep(currentStep + 1)
  }

  return (
    <div className={`flex flex-col items-end w-full `}>
      {currentStep < 3 && (
        <Button className={``} type="button" variant="mood" onClick={nextStep}>
          {UI_MESSAGES.NEXT_STEP}
        </Button>
      )}
      {currentStep === 3 && (
        <div>
          <SurveyCheckbox
            id="terms-acceptance"
            checked={termsAccepted}
            onCheckedChange={setTermsAccepted}
            label={UI_MESSAGES.TERMS_ACCEPTANCE_TEXT}
          />
          <Button disabled={!termsAccepted} className={`mt-8`} type="submit" variant="mood">
            {UI_MESSAGES.SEND_SURVEY}
          </Button>
          {isInvalid && (
            <p className="mt-2 text-sm text-destructive font-medium ">
              {UI_MESSAGES.FIX_ERRORS_BEFORE_SENDING}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
