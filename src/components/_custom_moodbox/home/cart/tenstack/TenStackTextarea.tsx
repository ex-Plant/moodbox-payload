import { TenStackFormBase, FormControlProps } from './TenStackFormBase'
import { Textarea } from '@/components/ui/textarea'
import { useFieldContext } from '@/lib/hooks/tenStackFormHooks'

export function TenStackTextarea(props: FormControlProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <TenStackFormBase {...props}>
      <Textarea
        placeholder={props.placeholder}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        className={props.className}
      />
    </TenStackFormBase>
  )
}
