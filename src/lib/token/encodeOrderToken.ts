import 'server-only'
import { createHmac } from 'crypto'

export type OrderTokenPayloadT = {
  orderId: string
  timestamp?: number
}

export function encodeOrderToken(payload: OrderTokenPayloadT): string {
  const secret = process.env.TOKEN_SECRET
  if (!secret) throw new Error('❌ TOKEN_SECRET environment variable is not set')

  const timestamp = payload.timestamp ?? Date.now()
  const data = JSON.stringify({ orderId: payload.orderId, timestamp })

  const signature = createHmac('sha256', secret).update(data).digest('hex')

  // Base64 turns any data into a string of "safe" characters that every browser understands.
  const token = Buffer.from(data).toString('base64url') + '.' + signature
  return token
}
