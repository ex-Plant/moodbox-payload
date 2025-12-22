type BrandEvaluationCardProps = {
  brand: string
  questionId: string
  children: React.ReactNode
}

export default function BrandEvaluationCard({
  brand,
  questionId,
  children,
}: BrandEvaluationCardProps) {
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
