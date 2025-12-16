import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { CartSchemaT } from '@/lib/CartSchema'

type CartFormStoreT = {
  formData: CartSchemaT
  updateFormData: (data: Partial<CartSchemaT>) => void
  resetFormData: () => void
}

const defaultFormData: CartSchemaT = {
  company_name: '',
  email: '',
  projects_per_year: '',
  nip: '',
  website: '',
  city: '',
  project_type: '',
  completion_date: '',
  project_stage: '',
  project_area: '',
  project_budget: '',
  consents: {
    consent1: false,
    consent2: false,
  },
}

export const useCartFormStore = create<CartFormStoreT>()(
  persist(
    (set) => ({
      formData: defaultFormData,
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetFormData: () => set({ formData: defaultFormData }),
    }),
    {
      name: 'cart-form-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
)

export default function useCartForm() {
  const formData = useCartFormStore((s) => s.formData)
  const updateFormData = useCartFormStore((s) => s.updateFormData)
  const resetFormData = useCartFormStore((s) => s.resetFormData)
  return { formData, updateFormData, resetFormData }
}
