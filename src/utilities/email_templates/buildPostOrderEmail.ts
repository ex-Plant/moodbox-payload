import { generatePostOrderEmailHTML } from './templates/postOrder'

type SurveyInvitationContentT = {
  subject: string
  title: string
  paragraph1?: string | null
  paragraph2?: string | null
  paragraph3?: string | null
  paragraph4?: string | null
  buttonLabel?: string | null
  footer?: string | null
}

export function buildPostOrderEmail(
  linkUrl: string,
  content: SurveyInvitationContentT,
): {
  subject: string
  html: string
} {
  const html = generatePostOrderEmailHTML(linkUrl, content)
  return { subject: content.subject, html }
}
