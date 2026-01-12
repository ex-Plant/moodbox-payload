import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const BooleanCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  return <span>{cellData ? 'tak' : 'nie'}</span>
}

export default BooleanCell
