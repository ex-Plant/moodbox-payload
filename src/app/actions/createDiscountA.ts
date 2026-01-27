'use server'

import { DEFAULT_SURVEY_CONTENT } from '../../components/_custom_moodbox/survey/survey-content-defaults'
import { createDiscountCode } from '../../lib/shopify/adminApi'
import { generateHexToken } from '../../utilities/generateTokenString'

const { discount } = DEFAULT_SURVEY_CONTENT.uiMessages

export async function createDiscountA() {
  const code = generateHexToken(6, 'MOODBOX')

  // Calculate expiration date 30 days limit
  const endsAt = new Date()
  endsAt.setDate(endsAt.getDate() + 30)

  const result = await createDiscountCode({
    title: discount.welcomeDiscountTitle,
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
    console.log(discount.discountSuccessMessage, result.discountId)
    return code
  } else {
    throw new Error(discount.discountFailureMessage)
  }
}
