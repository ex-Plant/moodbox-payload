import { DefaultCellComponentProps } from 'payload'

const LinkOrderCell: React.FC<DefaultCellComponentProps> = ({ rowData }) => {
  const linkedOrder = rowData.linkedOrder

  if (!linkedOrder) return null

  // If linkedOrder is a full object
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
