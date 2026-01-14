'use client'

import { submitSurveyA } from '@/app/actions/submitSurveyA'
import { formContext, useAppForm } from '@/lib/hooks/tenStackFormHooks'
import useSurveyForm from '@/lib/hooks/useSurveyForm'
import { surveySchema } from '@/lib/SurveySchema'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { useStore } from '@tanstack/react-form'
import { useEffect, useRef, useState } from 'react'
import FixedLoader from '../FixedLoader'
import SurveyDialog from './SurveyDialog'
import SurveyHeader from './SurveyHeader'
import SurveyQ1 from './SurveyQ1'
import SurveyQ2 from './SurveyQ2'
import SurveyQ3 from './SurveyQ3'
import SurveyQ4 from './SurveyQ4'
import SurveyQ5 from './SurveyQ5'
import SurveyQ6 from './SurveyQ6'
import SurveyQ7 from './SurveyQ7'
import SurveyQ8 from './SurveyQ8'
import SurveyStepWrapper from './SurveyStepWrapper'
import useCheckFormErrors from '../../../lib/hooks/useCheckFormErrors'
import SurveyFooter from './SurveyFooter'

type SurveyFormProps = {
  availableBrands: string[]
  customerName: string | undefined
}

export default function SurveyForm({
  availableBrands,
  customerName,
  token,
}: SurveyFormProps & { token: string }) {
  const { formData, currentStep, updateFormData, resetFormData } = useSurveyForm()

  const [surveyDialogOpen, setSurveyDialogOpen] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

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

  useCheckFormErrors(form)

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
          <SurveyFooter />
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
