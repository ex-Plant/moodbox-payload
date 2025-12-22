import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ReactNode } from 'react'

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
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label
        htmlFor={id}
        className={`cursor-pointer text-sm ${checked ? 'font-bold' : 'text-muted-foreground'}`}
      >
        {label}
      </Label>
    </div>
  )
}
