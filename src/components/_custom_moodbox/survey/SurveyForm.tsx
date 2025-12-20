'use client'

import { formContext, useAppForm } from '@/lib/hooks/tenStackFormHooks'
import { surveySchema } from '@/lib/SurveySchema'
import useSurveyForm from '@/lib/hooks/useSurveyForm'
import { useStore } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { useEffect, useRef } from 'react'
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
import { toast } from 'react-toastify'

type SurveyFormProps = {
  availableBrands: string[]
}

export default function SurveyForm({ availableBrands }: SurveyFormProps) {
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
      toastMessage(
        `Wybierz przynajmniej jednego producenta z którym rozważasz współpracę `,
        ToastType.Info,
      )
      return
    }
    if (currentStep < 3) setStep(currentStep + 1)
  }

  function prevStep() {
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

        {/* {currentStep === 1 && ( */}
        <section className="space-y-12 animate-in fade-in duration-500 pt-8">
          <SurveyQ1 availableBrands={availableBrands} />
          <SurveyQ2 availableBrands={availableBrands} />
        </section>
        {/* )} */}

        {currentStep >= 2 && (
          <section className="space-y-12 animate-in fade-in duration-500">
            <SurveyQ3 />
            <SurveyQ4 />
            <SurveyQ5 />
            <SurveyQ6 availableBrands={availableBrands} />
          </section>
        )}

        {currentStep === 3 && (
          <section className="space-y-8 animate-in fade-in duration-500">
            <SurveyQ7 />
            <SurveyQ8 />
          </section>
        )}

        <div className={`flex flex-col w-full`}>
          <div className="flex justify-between pt-8 ">
            {/* <Button
              type="button"
              variant="secondary"
              onClick={prevStep}
              className={cn(currentStep === 1 && 'invisible')}
            >
              Wstecz
            </Button> */}

            {currentStep < 3 ? (
              <Button className={`ml-auto`} type="button" variant="mood" onClick={nextStep}>
                Następny krok
              </Button>
            ) : (
              <Button className={`ml-auto mt-8`} type="submit" variant="mood">
                Wyślij ankietę
              </Button>
            )}
          </div>
        </div>
      </form>
    </formContext.Provider>
  )
}
