import { ReactNode } from 'react'
import { cn } from '../../../utilities/ui'

type SurveyEvalCardProps = {
  brand?: string
  questionId?: string
  children: ReactNode
  className?: String
}

export default function SurveyEvalCard({
  brand,
  questionId,
  children,
  className,
}: SurveyEvalCardProps) {
  return (
    <div
      key={`eval-${questionId}-${brand}`}
      className={cn('p-6 border rounded-lg bg-white shadow-sm space-y-6', className)}
    >
      {brand && <h3 className="text-lg font-bold border-b border-mood-brown pb-2">{brand}</h3>}
      {children}
    </div>
  )
}
