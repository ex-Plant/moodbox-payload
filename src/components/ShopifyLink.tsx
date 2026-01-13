'use client'
import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { useField } from '@payloadcms/ui'

const SHOPIFY_BASE_URL = 'https://admin.shopify.com/store/moodboxpl/orders'

const ShopifyLink: React.FC<DefaultCellComponentProps & { watchField?: string }> = (props) => {
  const { cellData, watchField } = props

  // If watchField is provided, we are in an Edit View (Field context)
  // Otherwise, we use cellData from the List View (Cell context)
  const { value: fieldValue } = useField<string>({ path: watchField || '' })

  const data = cellData || fieldValue
  if (!data) return null

  // Extract numeric ID from Shopify GID if necessary
  const id = typeof data === 'string' ? data.split('/').pop() : data
  const link = `${SHOPIFY_BASE_URL}/${id}`

  return (
    <div style={{ marginTop: watchField ? '8px' : 0 }}>
      <a href={link} target="_blank" rel="noopener noreferrer" className="relationship-cell">
        {link}
      </a>
    </div>
  )
}

export default ShopifyLink
