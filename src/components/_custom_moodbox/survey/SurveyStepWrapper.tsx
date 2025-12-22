import { cn } from '@/utilities/ui'
import { ReactNode } from 'react'

type PropsT = {
  children: ReactNode
  className?: string
}

export default function SurveyStepWrapper({ children, className }: PropsT) {
  return (
    <div className={cn('space-y-12 animate-in fade-in duration-500', className)}>{children}</div>
  )
}
