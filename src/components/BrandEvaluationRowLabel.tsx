'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const BrandEvaluationRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<{ brand_name?: string }>()

  console.log('data 🍆', data)
  return <div>{data?.brand_name || `Brand Evaluation ${rowNumber ?? 0 + 1}`}</div>
}

export default BrandEvaluationRowLabel
