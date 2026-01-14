import { DefaultCellComponentProps } from 'payload'

const LinkOrderCell: React.FC<DefaultCellComponentProps> = ({ rowData }) => {
  const linkedOrder = rowData.linkedOrder || rowData.order
  if (!linkedOrder) return null

  const orderId = typeof linkedOrder === 'object' ? linkedOrder.id : linkedOrder

  return (
    <a
      href={`/admin/collections/orders/${orderId}`}
      className="relationship-cell"
      style={{ textDecoration: 'underline' }}
    >
      {orderId}
    </a>
  )
}

export default LinkOrderCell
