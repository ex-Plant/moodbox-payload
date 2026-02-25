import { BRAND_COLORS, EmailItemT } from '../email_templates_constants'
import { renderEmailTemplate } from '../render_email_template'

type DiscountCodeContentT = {
  greeting?: string | null
  thankYou?: string | null
  codeIntro?: string | null
  codeActiveNote?: string | null
  codeValidityNote?: string | null
  closingNote?: string | null
  buttonLabel?: string | null
  footer?: string | null
}

export function generateDiscountCodeEmailHTML(
  discountCode: string,
  content: DiscountCodeContentT,
  buttonUrl: string,
): string {
  const items = (
    [
      content.greeting
        ? { type: 'text' as const, content: content.greeting, marginBottom: '0px' }
        : null,
      content.thankYou
        ? { type: 'text' as const, content: content.thankYou, marginBottom: '0px' }
        : null,
      content.codeIntro ? { type: 'text' as const, content: content.codeIntro } : null,
      {
        type: 'raw' as const,
        html: `
        <div style=
          "background-color: white;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            color: ${BRAND_COLORS.moodDarkBrown};">
              ${discountCode}
        </div>`,
      },
      content.codeActiveNote
        ? { type: 'text' as const, content: content.codeActiveNote, marginBottom: '0px' }
        : null,
      content.codeValidityNote
        ? { type: 'text' as const, content: content.codeValidityNote, marginBottom: '0px' }
        : null,
      content.closingNote ? { type: 'text' as const, content: content.closingNote } : null,
      content.buttonLabel
        ? { type: 'button' as const, label: content.buttonLabel, url: buttonUrl }
        : null,
    ] as (EmailItemT | null)[]
  ).filter((item): item is EmailItemT => item !== null)

  return renderEmailTemplate({ items, footer: content.footer ?? undefined })
}
