'use server'

import { UI_MESSAGES } from '../../components/_custom_moodbox/survey/survey_constants'
import { createDiscountCode } from '../../lib/shopify/adminApi'

export async function createDiscountA(code: string) {
  const result = await createDiscountCode({
    title: UI_MESSAGES.WELCOME_DISCOUNT_TITLE,
    code: code,
    usageLimit: 1,
    appliesOncePerCustomer: true,
    // minimumRequirement: {
    //   subtotal: {
    //     greaterThanOrEqualToSubtotal: '50.00',
    //   },
    // },
    customerGets: {
      value: {
        percentage: 0.1,
      },
      items: {
        all: true,
      },
    },
  })

  console.log(result)

  if (result.success) {
    console.log(UI_MESSAGES.DISCOUNT_SUCCESS_MESSAGE, result.discountId)
    return code
  } else {
    console.log(UI_MESSAGES.DISCOUNT_FAILURE_MESSAGE, result.errors)
    return null
  }
}
