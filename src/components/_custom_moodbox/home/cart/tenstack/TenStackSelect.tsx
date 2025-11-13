import { ReactNode } from 'react'
import { TenStackFormBase, FormControlProps } from './TenStackFormBase'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFieldContext } from '@/lib/hooks/tenStackFormHooks'

export function TenStackSelect({ children, ...props }: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <TenStackFormBase {...props}>
      <Select onValueChange={(e) => field.handleChange(e)} value={field.state.value}>
        <SelectTrigger
          className=" "
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
        >
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </TenStackFormBase>
  )
}
