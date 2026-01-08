import { generatePostOrderEmailHTML } from './email/templates/postOrder'

export function buildPostOrderEmail(linkUrl: string): {
  subject: string
  html: string
} {
  const subject: string = 'Moodbox Polska — Twoja opinia jest dla nas ważna'
  const html: string = generatePostOrderEmailHTML(linkUrl)

  return { subject, html }
}
