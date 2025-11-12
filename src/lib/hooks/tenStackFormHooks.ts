import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { TenStackFormInput } from '@/components/_custom_moodbox/home/cart/tenstack/TenStackFormInput'
import { TenStackSelect } from '@/components/_custom_moodbox/home/cart/tenstack/TenStackSelect'
import { TenStackCheckbox } from '@/components/_custom_moodbox/home/cart/tenstack/TenStackCheckbox'

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: TenStackFormInput,
    Select: TenStackSelect,
    Checkbox: TenStackCheckbox,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, useFieldContext, useFormContext }
