import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const OrderLinkCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  if (!cellData) return null

  const id = typeof cellData === 'object' ? cellData.id : cellData
  const label = typeof cellData === 'object' ? cellData.orderId : cellData

  return (
    <a
      href={`/admin/collections/orders/${id}`}
      className="relationship-cell"
      style={{ textDecoration: 'underline' }}
    >
      {label}
    </a>
  )
}

export default OrderLinkCell
