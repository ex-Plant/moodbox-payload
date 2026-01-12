import { ReactNode } from 'react'
import { cn } from '../../../utilities/ui'

type SurveyEvalCardProps = {
  brand?: string
  questionId?: string
  children: ReactNode
  className?: string
  'data-invalid'?: boolean
}

export default function SurveyEvalCard({
  brand,
  questionId,
  children,
  className,
  'data-invalid': dataInvalid,
}: SurveyEvalCardProps) {
  return (
    <div
      key={`eval-${questionId}-${brand}`}
      data-invalid={dataInvalid}
      className={cn(
        'group/eval-card p-6 border rounded-lg bg-white shadow-sm space-y-6',
        'data-[invalid=true]:border-destructive data-[invalid=true]:text-destructive',
        className,
      )}
    >
      {brand && (
        <h3 className="text-lg font-bold border-b border-mood-brown pb-2 group-data-[invalid=true]/eval-card:border-destructive">
          {brand}
        </h3>
      )}
      {children}
    </div>
  )
}
