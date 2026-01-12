import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const BrandEvaluationsCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  if (!cellData || !Array.isArray(cellData)) return null

  return (
    <div>
      {cellData.map((d, i) => (
        <div key={i} style={{ paddingBottom: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>{d.brand_name}</div>
          <div>Ocena: {d.rating} / 5</div>
          <ul>
            {d.reasons?.map((r: string, j: number) => (
              <li key={j}>{r}</li>
            ))}
            {d.other_reason && <li>Inne: {d.other_reason}</li>}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default BrandEvaluationsCell
