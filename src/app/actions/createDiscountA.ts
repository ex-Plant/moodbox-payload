'use server'

import { createDiscountCode } from '../../lib/shopify/adminApi'
import { generateHexToken } from '../../utilities/generateTokenString'

type CreateDiscountParamsT = {
  title: string
  percentage: number
}

export async function createDiscountA({ title, percentage }: CreateDiscountParamsT) {
  const code = generateHexToken(6, 'MOODBOX')

  // Calculate expiration date 30 days limit
  const endsAt = new Date()
  endsAt.setDate(endsAt.getDate() + 30)

  const result = await createDiscountCode({
    title,
    code: code,
    endsAt: endsAt.toISOString(), // Shopify expects ISO8601 string
    usageLimit: 1,
    appliesOncePerCustomer: true,
    customerGets: {
      value: {
        percentage: percentage / 100,
      },
      items: {
        all: true,
      },
    },
  })

  console.log('createDiscountCode: ', result)

  if (result.success) {
    return code
  } else {
    throw new Error('Failed to create discount code')
  }
}
