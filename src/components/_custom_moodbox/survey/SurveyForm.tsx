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
import SurveyCheckbox from './SurveyCheckbox'
import FixedLoader from '../FixedLoader'

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

  const [surveyDialogOpen, setSurveyDialogOpen] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

  const [termsAccepted, setTermsAccepted] = useState(false)

  const form = useAppForm({
    defaultValues: formData,
    validators: {
      onSubmit: surveySchema,
    },

    onSubmit: async (data) => {
      const res = await submitSurveyA(data.value, token)
      if (res.error) return toastMessage(res.message, ToastType.Error)

      setDiscountCode(res.generatedDiscount ?? '')
      setSurveyDialogOpen(true)
      resetFormData()
    },
  })

  const formValues = useStore(form.store, (state) => state.values)
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting)
  const submissionAttempts = useStore(form.store, (s) => s.submissionAttempts)
  const isFormValid = useStore(
    form.store,
    (state) => !state.isValidating && Object.keys(state.errors || {}).length === 0,
  )
  const hasFieldErrors = useStore(form.store, (state) =>
    Object.values(state.fieldMeta).some((meta) => meta.errors.length > 0),
  )
  const isInvalid = submissionAttempts > 0 && (!isFormValid || hasFieldErrors)

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

  // useEffect(() => {
  //   // 1. Check form-level errors (usually from the schema validator)
  //   if (form.state.errors.length > 0) {
  //     console.group('🚫 Form Validation Errors')
  //     console.table(form.state.errors)
  //     console.groupEnd()
  //   }

  //   // 2. Check field-specific errors
  //   const fieldsWithErrors = Object.entries(form.state.fieldMeta)
  //     .filter(([_, meta]) => meta.errors.length > 0)
  //     .map(([name, meta]) => ({
  //       field: name,
  //       errors: meta.errors.map((e) => (typeof e === 'object' ? e?.message : e)),
  //     }))

  //   if (fieldsWithErrors.length > 0) {
  //     console.group('⚠️ Field Validation Errors')
  //     console.table(fieldsWithErrors)
  //     console.groupEnd()
  //   }
  // }, [form.state.errors, form.state.fieldMeta])

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
                {isInvalid && (
                  <p className="mt-2 text-sm text-destructive font-medium ">
                    {UI_MESSAGES.FIX_ERRORS_BEFORE_SENDING}
                  </p>
                )}
              </div>
            )}
          </div>
        </form>
      </formContext.Provider>
      <SurveyDialog
        setSurveyDialogOpen={setSurveyDialogOpen}
        surveyDialogOpen={surveyDialogOpen}
        discountCode={discountCode}
      />

      <FixedLoader active={isSubmitting} />
    </>
  )
}
