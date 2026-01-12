import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFieldContext } from '@/lib/hooks/tenStackFormHooks'
import { ReactNode } from 'react'
import { FormControlProps, TenStackFormBase } from './TenStackFormBase'

export function TenStackSelect({ children, ...props }: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const safeValue = field.state.value ?? ''

  //and in the form

  return (
    <TenStackFormBase {...props}>
      <Select value={safeValue} onValueChange={(e) => e !== '' && field.handleChange(e)}>
        <SelectTrigger aria-invalid={isInvalid} id={field.name} onBlur={field.handleBlur}>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </TenStackFormBase>
  )
}
