import { cn } from '@/utilities/ui'
import { ReactNode } from 'react'

type PropsT = {
  title: ReactNode
  subtitle?: ReactNode
  className?: string
}

export default function SurveyQuestionHeader({ title, subtitle, className }: PropsT) {
  return (
    <header className={cn(className)}>
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </header>
  )
}
