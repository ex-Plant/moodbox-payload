import crypto from 'node:crypto'

export function generateHexToken(length = 6, prefix = 'TOKEN') {
  const suffix = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
    .toUpperCase()

  return `${prefix}-${suffix}`
}
