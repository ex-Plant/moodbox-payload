import 'server-only'
import crypto, { createHmac } from 'crypto'
import { OrderTokenPayloadT } from './encodeOrderToken'
/**
 * Decodes and verifies an order token.
 * @throws {Error} Throws if the signature is invalid, token is malformed, or expired.
 */
export function decodeOrderToken(token: string): OrderTokenPayloadT {
  const secret = process.env.TOKEN_SECRET
  if (!secret) throw new Error('❌ TOKEN_SECRET environment variable is not set')

  const parts = token.split('.')
  if (parts.length !== 2) throw new Error('❌ Invalid token format')

  const [encodedData, signature] = parts

  const data = Buffer.from(encodedData, 'base64url').toString('utf-8')

  const expectedSignature = createHmac('sha256', secret).update(data).digest('hex')

  if (signature !== expectedSignature) throw new Error('❌ Invalid token signature')

  return JSON.parse(data)
}
