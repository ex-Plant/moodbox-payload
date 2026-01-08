import { generateDiscountCodeEmailHTML } from './templates/discountCode'

export function buildDiscountCodeEmail(code: string): {
  subject: string
  html: string
} {
  const subject: string = 'Kod rabatowy od Moodbox Polska '
  const html: string = generateDiscountCodeEmailHTML(code)

  return { subject, html }
}
