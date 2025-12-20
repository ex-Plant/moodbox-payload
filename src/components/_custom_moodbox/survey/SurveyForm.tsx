'use client'

import { formContext, useAppForm } from '@/lib/hooks/tenStackFormHooks'
import { surveySchema } from '@/lib/SurveySchema'
import useSurveyForm from '@/lib/hooks/useSurveyForm'
import { OrderT } from '@/lib/shopify/types'
import { useStore } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { useEffect, useRef } from 'react'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { submitSurveyA } from '@/app/actions/submitSurveyA'
import SurveyStepOne from './SurveyStepOne'
import SurveyStepTwo from './SurveyStepTwo'
import SurveyStepThree from './SurveyStepThree'
import SurveyHeader from './SurveyHeader'

type SurveyFormProps = {
  order: OrderT
  availableBrands: string[]
}

export default function SurveyForm({ order, availableBrands }: SurveyFormProps) {
  const { formData, currentStep, setStep, updateFormData, resetFormData } = useSurveyForm()

  const form = useAppForm({
    defaultValues: formData,
    validators: {
      onSubmit: surveySchema,
    },
    onSubmit: async (data) => {
      const res = await submitSurveyA(data.value)
      if (res.error) {
        toastMessage(res.message, ToastType.Error)
      } else {
        toastMessage('Dziękujemy za wypełnienie ankiety!', ToastType.Success)
        resetFormData()
      }
    },
  })

  const formValues = useStore(form.store, (state) => state.values)
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

  const nextStep = () => {
    if (currentStep < 3) setStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setStep(currentStep - 1)
  }

  return (
    <formContext.Provider value={form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-8"
      >
        <SurveyHeader currentStep={currentStep} />

        {currentStep === 1 && <SurveyStepOne availableBrands={availableBrands} />}
        {currentStep === 2 && <SurveyStepTwo availableBrands={availableBrands} />}
        {currentStep === 3 && <SurveyStepThree />}

        <div className="flex justify-between pt-8 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className={cn(currentStep === 1 && 'invisible')}
          >
            Wstecz
          </Button>

          {currentStep < 3 ? (
            <Button type="button" variant="mood" onClick={nextStep}>
              Dalej
            </Button>
          ) : (
            <Button type="submit" variant="mood">
              Wyślij ankietę
            </Button>
          )}
        </div>
      </form>
    </formContext.Provider>
  )
}
