import { ReactNode } from 'react'

type SurveyEvalCardProps = {
  brand: string
  questionId: string
  children: ReactNode
}

export default function SurveyEvalCard({ brand, questionId, children }: SurveyEvalCardProps) {
  return (
    <div
      key={`eval-${questionId}-${brand}`}
      className="p-6 border rounded-lg bg-white shadow-sm space-y-6"
    >
      <h3 className="text-lg font-bold border-b border-mood-brown pb-2">{brand}</h3>
      {children}
    </div>
  )
}
