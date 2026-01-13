'use client'
import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { useField } from '@payloadcms/ui'

const SHOPIFY_BASE_URL = 'https://admin.shopify.com/store/moodboxpl/orders'

const ShopifyLink: React.FC<DefaultCellComponentProps & { watchField?: string }> = (props) => {
  const { cellData, watchField, rowData } = props

  // If watchField is provided, we are in an Edit View (Field context)
  // Otherwise, we use cellData from the List View (Cell context)
  const { value: fieldValue } = useField<string>({ path: watchField || '' })

  const data = cellData || fieldValue || rowData?.id
  if (!data) return null

  const link = `${SHOPIFY_BASE_URL}/${data}`

  return (
    <div style={{ marginTop: watchField ? '8px' : 0 }}>
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
