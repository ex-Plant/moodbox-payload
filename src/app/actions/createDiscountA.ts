'use server'

import { UI_MESSAGES } from '../../components/_custom_moodbox/survey/survey_constants'
import { createDiscountCode } from '../../lib/shopify/adminApi'
import { generateHexToken } from '../../utilities/generateTokenString'

export async function createDiscountA() {
  const code = generateHexToken(6, 'MOODBOX')
  // console.log('createDiscountA.ts:9 - code:', code)

  // Calculate expiration date 30 days limit
  const endsAt = new Date()
  endsAt.setDate(endsAt.getDate() + 30)

  const result = await createDiscountCode({
    title: UI_MESSAGES.WELCOME_DISCOUNT_TITLE,
    code: code,
    endsAt: endsAt.toISOString(), // Shopify expects ISO8601 string
    usageLimit: 1,
    appliesOncePerCustomer: true,
    customerGets: {
      value: {
        percentage: 0.1,
      },
      items: {
        all: true,
      },
    },
  })

  console.log('createDiscountCode: ', result)

  if (result.success) {
    console.log(UI_MESSAGES.DISCOUNT_SUCCESS_MESSAGE, result.discountId)
    return code
  } else {
    throw new Error(UI_MESSAGES.DISCOUNT_FAILURE_MESSAGE)
  }
}
