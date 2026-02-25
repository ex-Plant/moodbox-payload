import { env } from '@/lib/env'
import { generateDiscountCodeEmailHTML } from './templates/discountCode'

type DiscountCodeContentT = {
  subject: string
  greeting?: string | null
  thankYou?: string | null
  codeIntro?: string | null
  codeActiveNote?: string | null
  codeValidityNote?: string | null
  closingNote?: string | null
  buttonLabel?: string | null
  footer?: string | null
}

export function buildDiscountCodeEmail(
  code: string,
  content: DiscountCodeContentT,
): {
  subject: string
  html: string
} {
  const html = generateDiscountCodeEmailHTML(code, content, env.NEXT_PUBLIC_SERVER_URL)
  return { subject: content.subject, html }
}
