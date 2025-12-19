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

  const token = Buffer.from(data).toString('base64url') + '.' + signature
  return token
}

// If your orderId is a MongoDB ID (like 65821...) or a Shopify ID, it’s fine. But if your "data" part ever contains characters like spaces, slashes /, or question marks ?, it will break the URL.

// - Base64 turns any data into a string of "safe" characters that every browser understands. This is why we use it.
