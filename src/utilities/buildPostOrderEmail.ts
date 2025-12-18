export function buildPostOrderEmail(linkUrl: string): {
  subject: string
  html: string
  text: string
} {
  const subject: string = 'How did your order go?'
  const text: string = `We'd love your feedback on your purchase. Visit: ${linkUrl}`
  const html: string = `<h1>We'd love your feedback</h1>
  <p>Click the link below to answer a few quick questions about your recent order.</p>
  <p><a href="${linkUrl}">Give feedback</a></p>`

  return { subject, html, text }
}
