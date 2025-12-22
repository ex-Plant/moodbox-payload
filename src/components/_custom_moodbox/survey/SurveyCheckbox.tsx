import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ReactNode } from 'react'
import { cn } from '@/utilities/ui'

type SurveyCheckboxProps = {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: ReactNode
  className?: string
}

export default function SurveyCheckbox({
  id,
  checked,
  onCheckedChange,
  label,
  className,
}: SurveyCheckboxProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Checkbox
        className={cn(
          `size-6 rounded-md border transition-all duration-200
          shadow-xs hover:bg-accent bg-white border-input text-orange
           data-[state=checked]:bg-mood-brown  data-[state=checked]:text-orange`,
        )}
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label
        htmlFor={id}
        className={cn(
          ' duration-200 cursor-pointer text-sm',
          checked ? 'font-bold' : 'text-muted-foreground',
        )}
      >
        {label}
      </Label>
    </div>
  )
}
