import {
  createFormHook,
  createFormHookContexts,
  type AppFieldExtendedReactFormApi,
} from '@tanstack/react-form'
import { TenStackFormInput } from '@/components/_custom_moodbox/home/cart/tenstack/TenStackFormInput'
import { TenStackSelect } from '@/components/_custom_moodbox/home/cart/tenstack/TenStackSelect'
import { TenStackCheckbox } from '@/components/_custom_moodbox/home/cart/tenstack/TenStackCheckbox'
import { TenStackTextarea } from '@/components/_custom_moodbox/home/cart/tenstack/TenStackTextarea'
import { ComponentType } from 'react'
import { SurveySchemaT } from '../SurveySchema'

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: TenStackFormInput,
    Select: TenStackSelect,
    Checkbox: TenStackCheckbox,
    Textarea: TenStackTextarea,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export function useSurveyContext() {
  return useFormContext() as unknown as AppFormApi<SurveySchemaT>
}

export type AppFormApi<TFormData> = AppFieldExtendedReactFormApi<
  TFormData,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  {
    Input: typeof TenStackFormInput
    Select: typeof TenStackSelect
    Checkbox: typeof TenStackCheckbox
    Textarea: typeof TenStackTextarea
  },
  {}
>

export { useAppForm, useFieldContext, useFormContext, formContext }
