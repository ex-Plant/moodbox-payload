import React from 'react'

import type { DefaultCellComponentProps } from 'payload'

const BrandEvaluationsCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  console.log('BrandEvaluationsCell.tsx:5 - cellDAta:', cellData)
  if (!cellData || !Array.isArray(cellData)) return null

  return (
    <div>
      {cellData.map((d) => {
        return (
          /*  */
          <div
            style={{
              paddingBottom: '8px',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
              }}
            >
              {d.brand_name}
            </div>
            <div> Ocena: {d.rating}</div>
            <ul>
              {d.reasons.map((r: string) => (
                <li>{r}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default BrandEvaluationsCell
