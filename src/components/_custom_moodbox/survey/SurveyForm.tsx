'use client'

import { formContext, useAppForm } from '@/lib/hooks/tenStackFormHooks'
import { surveySchema } from '@/lib/SurveySchema'
import useSurveyForm from '@/lib/hooks/useSurveyForm'
import { useStore } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { submitSurveyA } from '@/app/actions/submitSurveyA'
import SurveyHeader from './SurveyHeader'
import SurveyQ1 from './SurveyQ1'
import SurveyQ2 from './SurveyQ2'
import SurveyQ3 from './SurveyQ3'
import SurveyQ4 from './SurveyQ4'
import SurveyQ5 from './SurveyQ5'
import SurveyQ6 from './SurveyQ6'
import SurveyQ7 from './SurveyQ7'
import SurveyQ8 from './SurveyQ8'
import SurveyDialog from './SurveyDialog'
import SurveyStepWrapper from './SurveyStepWrapper'
import { UI_MESSAGES } from './survey_constants'
import { createDiscountA } from '../../../app/actions/createDiscountA'
import SurveyCheckbox from './SurveyCheckbox'
import LogoMoodboxSvg from '../common/LogoMoodboxSvg'

type SurveyFormProps = {
  availableBrands: string[]
  customerName: string | undefined
}

export default function SurveyForm({
  availableBrands,
  customerName,
  token,
}: SurveyFormProps & { token: string }) {
  const { formData, currentStep, setStep, updateFormData, resetFormData } = useSurveyForm()

  const [surveyDialoOpen, setSurveyDialogOpen] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

  const [termsAccepted, setTermsAccepted] = useState(false)

  const form = useAppForm({
    defaultValues: formData,
    validators: {
      onSubmit: surveySchema,
    },

    onSubmit: async (data) => {
      const res = await submitSurveyA(data.value, token)
      if (res.error) {
        toastMessage(res.message, ToastType.Error)
      } else {
        // todo move to one place ?
        // todo moile styling
        const code = UI_MESSAGES.WELCOME_DISCOUNT_PREFIX + crypto.randomUUID()
        const res = await createDiscountA(code)
        if (res) {
          setDiscountCode(code)
          setSurveyDialogOpen(true)
          resetFormData()
        }
      }
    },
  })

  const formValues = useStore(form.store, (state) => state.values)
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting)

  const consideredBrands = formValues.considered_brands
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!formValues) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      updateFormData(formValues)
    }, 1000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [formValues, updateFormData])

  function nextStep() {
    if (consideredBrands.length < 1) {
      toastMessage(UI_MESSAGES.SELECT_AT_LEAST_ONE_BRAND, ToastType.Info)
      return
    }
    if (currentStep < 3) setStep(currentStep + 1)
  }

  return (
    <>
      <formContext.Provider value={form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-12"
        >
          <SurveyHeader currentStep={currentStep} customerName={customerName} />

          <SurveyStepWrapper>
            <SurveyQ1 availableBrands={availableBrands} />
            <SurveyQ2 availableBrands={availableBrands} />
          </SurveyStepWrapper>

          {currentStep >= 2 && (
            <SurveyStepWrapper>
              <SurveyQ3 />
              <SurveyQ4 />
              <SurveyQ5 />
              <SurveyQ6 availableBrands={availableBrands} />
            </SurveyStepWrapper>
          )}

          {currentStep === 3 && (
            <SurveyStepWrapper>
              <SurveyQ7 />
              <SurveyQ8 />
            </SurveyStepWrapper>
          )}

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
              </div>
            )}
          </div>
        </form>
      </formContext.Provider>
      <SurveyDialog
        setSurveyDialogOpen={setSurveyDialogOpen}
        surveyDialoOpen={surveyDialoOpen}
        discountCode={discountCode}
      />
      {isSubmitting && (
        <div className={`pointer-events-none absolute inset-0 flex items-center justify-center`}>
          <LogoMoodboxSvg className={`animate-bounce `} />
        </div>
      )}
    </>
  )
}
