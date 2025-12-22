import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SurveySchemaT } from '@/lib/SurveySchema'

type SurveyStoreT = {
  formData: SurveySchemaT
  currentStep: number
  setStep: (step: number) => void
  updateFormData: (data: Partial<SurveySchemaT>) => void
  resetFormData: () => void
}

const defaultFormData: SurveySchemaT = {
  considered_brands: [],
  rejected_brand: '',
  brand_evaluations: {},
  rejection_reasons: [],
  rejection_other: '',
  contact_request: false,
  contact_brands: [],
  missing_brands: '',
  improvement_suggestion: '',
}

export const useSurveyFormStore = create<SurveyStoreT>()(
  persist(
    (set) => ({
      formData: defaultFormData,
      currentStep: 1,
      setStep: (step) => set({ currentStep: step }),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetFormData: () => set({ formData: defaultFormData, currentStep: 1 }),
    }),
    {
      name: 'survey-form-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default function useSurveyForm() {
  const formData = useSurveyFormStore((s) => s.formData)
  const currentStep = useSurveyFormStore((s) => s.currentStep)
  const setStep = useSurveyFormStore((s) => s.setStep)
  const updateFormData = useSurveyFormStore((s) => s.updateFormData)
  const resetFormData = useSurveyFormStore((s) => s.resetFormData)

  return { formData, currentStep, setStep, updateFormData, resetFormData }
}
