import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const RejectionSummaryCell: React.FC<DefaultCellComponentProps> = ({ rowData }) => {
  const rejectedBrand = rowData?.rejected_brand
  if (!rejectedBrand) return <span>brak</span>

  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>{rejectedBrand}</div>
      <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
        {(rowData?.rejection_reasons as string[])?.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
        {rowData?.rejection_other && <li>Inny: {rowData.rejection_other}</li>}
      </ul>
    </div>
  )
}

export default RejectionSummaryCell
