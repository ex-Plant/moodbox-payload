import { createHmac } from 'crypto'

export function encode(orderId: string) {
  const secret = 'sislalaal'
  if (!secret) {
    throw new Error('❌ missing token secret')
  }

  const hmac = createHmac('sha256', secret).update(orderId).digest('hex')
}
