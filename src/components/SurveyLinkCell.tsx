import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

type SurveyLinkCellProps = DefaultCellComponentProps & {
  href: string
  label: string
}

const SurveyLinkCell: React.FC<SurveyLinkCellProps> = ({ cellData, href, label }) => {
  if (!cellData?.docs?.length) return null
  const doc = cellData.docs[0]

  return (
    <a
      href={`${href}/${doc}`}
      className="relationship-cell"
      style={{ textDecoration: 'underline' }}
    >
      {label}
    </a>
  )
}

export default SurveyLinkCell
