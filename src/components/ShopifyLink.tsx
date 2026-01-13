'use client'
import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { useField } from '@payloadcms/ui'

const SHOPIFY_BASE_URL = 'https://admin.shopify.com/store/moodboxpl/orders'

const ShopifyLink: React.FC<DefaultCellComponentProps & { watchField?: string }> = (props) => {
  const { cellData, rowData } = props

  // Detect context: cellData exists = list view, no cellData = edit view
  const isEditMode = !cellData

  // Only use useField in edit mode
  const { value: fieldValue } = useField<string>({ path: isEditMode ? 'id' : '' })

  const data = cellData || fieldValue || rowData?.id
  if (!data) return null

  const link = `${SHOPIFY_BASE_URL}/${data}`

  return (
    <div style={{ marginBottom: isEditMode ? '8px' : 0 }}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relationship-cell"
        style={{ textDecoration: 'underline' }}
      >
        Shopify ↗
      </a>
    </div>
  )
}

export default ShopifyLink
