import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const ListCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  if (!cellData || !Array.isArray(cellData) || cellData.length === 0) return null

  return (
    <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
      {cellData.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export default ListCell
