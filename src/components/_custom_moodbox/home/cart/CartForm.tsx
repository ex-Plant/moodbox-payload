'use client'

import { SelectItem } from '@/components/ui/select'

import { useAppForm } from '@/lib/hooks/tenStackFormHooks'
import useCart from '@/lib/hooks/useCart'
import { cartSchema } from '@/lib/CartSchema'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { Button } from '@/components/ui/button'
import LogoSvg from '@/components/_custom_moodbox/common/Logo'
import { Input } from '@/components/ui/input'
import { Field, FieldError } from '@/components/ui/field'
import { useStore } from '@tanstack/react-form'
import { checkoutA } from '@/app/actions/checkoutA'
import { Tip } from '@/components/ui/Tip'
import { CircleHelp as CircleQuestionMark } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { ShopifyCartBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import useCartForm from '../../../../lib/hooks/useCartForm'
import { useEffect, useRef } from 'react'

// const defaultFormData: CartSchemaT = {
//   company_name: '',
//   email: '',
//   projects_per_year: '',
//   nip: '',
//   website: '',
//   city: '',
//   project_type: '',
//   completion_date: '',
//   project_stage: '',
//   project_area: '',
//   project_budget: '',
//   consents: {
//     consent1: false,
//     consent2: false,
//   },
// }

export default function CartForm({ ...props }: ShopifyCartBlock) {
  const { cartItems } = useCart()
  const { formData, updateFormData } = useCartForm()

  const form = useAppForm({
    defaultValues: formData,
    // defaultValues: defaultFormData,
    validators: {
      onSubmit: cartSchema,
    },
    onSubmit: async (data) => {
      // console.log('🚀 formData: ', data.value);

      updateFormData(data.value)
      const res = await checkoutA(cartItems, data.value)
      console.log('res', res)

      if (res.error) {
        toastMessage(res.message, ToastType.Error)
        console.log('res', res)
      }
      // prevent resetting form
      return false
    },
  })

  // Subscribe to form changes and update Zustand store in real-time
  const formValues = useStore(form.store, (state) => state.values)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!formValues) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    //
    timeoutRef.current = setTimeout(() => {
      updateFormData(formValues)
    }, 1000)
    //
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [formValues, updateFormData])

  const emptyCart = cartItems.length < 1
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting)
  const isFormValid = useStore(
    form.store,
    (state) => !state.isValidating && Object.keys(state.errors || {}).length === 0,
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={`relative grid gap-4`}
    >
      <div>
        <header className={`flex items-center`}>
          <h4 className={`text-[18px] font-bold`}>{props.companyDataLabel || 'Dane firmowe'} </h4>
          <Tip content={props.formTipText} side={`right`} className={`p-2`}>
            <CircleQuestionMark className={`fill-mood-dark-brown w-5 border-none stroke-white`} />
          </Tip>
        </header>
        <div className={`grid gap-4 md:grid-cols-2 xl:mr-4`}>
          <form.AppField name="company_name">
            {(field) => <field.Input placeholder={props.companyName || 'Nazwa firmy'} />}
          </form.AppField>

          <form.Field name="nip">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                  <Input
                    placeholder={props.nip || 'NIP'}
                    inputMode="numeric" // Shows numeric keyboard on mobile
                    pattern="[0-9]*" // Ensures only numbers are entered
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '')
                      // Limit to 10 digits
                      if (value.length <= 10) {
                        field.handleChange(value)
                      }
                    }}
                    className="text-foreground placeholder:text-foreground bg-white"
                  />
                </Field>
              )
            }}
          </form.Field>

          <form.AppField name="email">
            {(field) => <field.Input type={`email`} placeholder={props.email || 'Adres email'} />}
          </form.AppField>

          <form.AppField name="website">
            {(field) => <field.Input placeholder={props.website || 'Strona www'} />}
          </form.AppField>

          <form.AppField name="projects_per_year">
            {(field) => (
              <field.Input
                placeholder={props.projectsPerYearPlaceholder || 'Liczba projektów rocznie'}
              />
            )}
          </form.AppField>
        </div>
      </div>
      <div>
        <h4 className={`text-[18px] font-bold`}>
          {props.additionalInfoLabel || 'Informacje dodatkowe o Twoim projekcie'}
        </h4>
        <div className={`grid gap-4 pt-2 md:grid-cols-2 xl:mr-4`}>
          <form.AppField name="city">
            {(field) => <field.Input placeholder={props.city || 'Miejscowość'} />}
          </form.AppField>

          <form.AppField name="project_type">
            {(field) => (
              <field.Select placeholder={props.projectTypePlaceholder || 'Typ projektu'}>
                {props.projectTypeOptions?.map((option) => (
                  <SelectItem key={option.id} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>

          <form.AppField name="project_area">
            {(field) => (
              <field.Select placeholder={props.projectAreaPlaceholder || 'Powierzchnia projektu'}>
                {props.projectAreaValues?.map((option) => (
                  <SelectItem key={option.id} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>

          <form.AppField name="completion_date">
            {(field) => (
              <field.Input
                placeholder={props.completionDatePlaceholder || 'Termin realizacji MM / RR'}
              />
            )}
          </form.AppField>

          <form.AppField name="project_budget">
            {(field) => (
              <field.Select placeholder={props.projectBudget || 'Budżet projektu'}>
                {props.projectBudgetValues?.map((option) => (
                  <SelectItem key={option.id} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>

          <form.AppField name="project_stage">
            {(field) => (
              <field.Select placeholder={props.projectStagePlaceholder || 'Etap projektu'}>
                {props.projectStageOptions?.map((option) => (
                  <SelectItem key={option.id} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
        </div>
      </div>

      <div className={`grid gap-2 pt-4`}>
        <div className={`flex items-center`}>
          <div className="w-fit">
            <form.AppField name="consents.consent1">{(field) => <field.Checkbox />}</form.AppField>
          </div>
          {props.consentText && (
            <RichText
              enableProse={true}
              className={`px-2 text-foreground text-sm prose_a [&_*]:leading-tight max-w-full`}
              data={props.consentText}
            />
          )}
        </div>
        <div className={`flex items-center`}>
          <div className="w-fit">
            <form.AppField name="consents.consent2">{(field) => <field.Checkbox />}</form.AppField>
          </div>
          {props.consentText2 && (
            <RichText
              enableProse={true}
              className={`px-2 text-foreground text-sm prose_a [&_*]:leading-tight max-w-full`}
              data={props.consentText2}
            />
          )}
        </div>
      </div>

      <div className={`flex flex-col gap-4 pt-4 xl:mr-4 xl:items-end`}>
        <div className={`grid gap-2`}>
          <p className={`ml-auto text-[2rem] text-nowrap xl:text-[2.5rem]`}>
            {props.fixedPriceLabel || '39 PLN'}
          </p>
          <Tip
            disabled={!emptyCart}
            content={props.emptyBasketLabel || 'Koszyk jest pusty'}
            side={`bottom`}
            className={cn(`ml-auto`, emptyCart && 'cursor-not-allowed')}
          >
            <Button
              disabled={emptyCart}
              type={'submit'}
              variant={'mood'}
              size={`lg`}
              className={cn(
                `ml-auto w-fit cursor-pointer xl:w-full`,
                (!isFormValid || emptyCart) && 'cursor-not-allowed opacity-50',
              )}
            >
              {props.proceedToCheckoutLabel || 'Przejdź do płatności'}
            </Button>
          </Tip>
        </div>
      </div>
      {isSubmitting && (
        <div className={`pointer-events-none absolute inset-0 flex items-center justify-center`}>
          <LogoSvg asButon={false} className={`animate-bounce `} />
        </div>
      )}
    </form>
  )
}
