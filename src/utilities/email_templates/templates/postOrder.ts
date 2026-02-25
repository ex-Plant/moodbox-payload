import { EmailItemT } from '../email_templates_constants'
import { renderEmailTemplate } from '../render_email_template'

type SurveyInvitationContentT = {
  title: string
  paragraph1?: string | null
  paragraph2?: string | null
  paragraph3?: string | null
  paragraph4?: string | null
  buttonLabel?: string | null
  footer?: string | null
}

export function generatePostOrderEmailHTML(
  linkUrl: string,
  content: SurveyInvitationContentT,
): string {
  const items = (
    [
      content.paragraph1 ? { type: 'text' as const, content: content.paragraph1 } : null,
      content.paragraph2 ? { type: 'text' as const, content: content.paragraph2 } : null,
      content.paragraph3 ? { type: 'text' as const, content: content.paragraph3 } : null,
      content.paragraph4 ? { type: 'text' as const, content: content.paragraph4 } : null,
      content.buttonLabel
        ? { type: 'button' as const, label: content.buttonLabel, url: linkUrl }
        : null,
    ] as (EmailItemT | null)[]
  ).filter((item): item is EmailItemT => item !== null)

  return renderEmailTemplate({
    title: content.title,
    items,
    footer: content.footer ?? undefined,
  })
}
