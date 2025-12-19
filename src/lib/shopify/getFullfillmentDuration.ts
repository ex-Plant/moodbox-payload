import { OrderT } from './types'

function getFulfillmentDuration(order: OrderT): {
  days: number
  hours: number
  formatted: string
} | null {
  if (!order.fulfillments || order.fulfillments.length === 0) {
    return null
  }

  const start = new Date(order.createdAt)
  const end = new Date(order.fulfillments[0].createdAt)
  const diffSecs = (end.getTime() - start.getTime()) / 1000

  const days = Math.floor(diffSecs / (60 * 60 * 24))
  const hours = Math.floor((diffSecs % (60 * 60 * 24)) / (60 * 60))

  return {
    days,
    hours,
    formatted: `${days}d ${hours}h `,
  }
}
