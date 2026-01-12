import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

type LinkCellProps = DefaultCellComponentProps & {
  href: string
  label: string
}

const LinkCell: React.FC<LinkCellProps> = ({ cellData, href, label }) => {
  const doc = cellData?.docs?.[0] || (Array.isArray(cellData) ? cellData[0] : cellData)
  if (!doc) return null

  const id = doc.id || doc
  const text = doc[label] || label

  return (
    <a href={`${href}/${id}`} className="relationship-cell" style={{ textDecoration: 'underline' }}>
      {text}
    </a>
  )
}

export default LinkCell
