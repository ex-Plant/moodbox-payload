import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const LongTextCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  console.log(cellData)
  if (!cellData) return null

  return (
    <div
      style={{
        wordBreak: 'break-word',
        minWidth: '250px',
        maxHeight: '250px',
        overflowY: 'auto',
      }}
    >
      {cellData}
    </div>
  )
}

export default LongTextCell
