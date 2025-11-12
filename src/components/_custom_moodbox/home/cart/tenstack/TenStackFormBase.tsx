import * as React from 'react'
import { ReactNode } from 'react'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { useFieldContext } from '@/lib/hooks/tenStackFormHooks'

export type FormControlProps = {
  label?: string
  description?: string
  placeholder?: string
  showError?: boolean
  type?: React.ComponentProps<'input'>['type']
}

type FormBaseProps = FormControlProps & {
  children: ReactNode
  horizontal?: boolean
  controlFirst?: boolean
}

export function TenStackFormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
  showError,
}: FormBaseProps) {
  const field = useFieldContext()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const labelElement = (
    <>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  )
  const errorElem = showError && isInvalid && <FieldError errors={field.state.meta.errors} />

  return (
    <Field
      className={`gap-0`}
      data-invalid={isInvalid}
      orientation={horizontal ? 'horizontal' : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElem}
        </>
      )}
    </Field>
  )
}
