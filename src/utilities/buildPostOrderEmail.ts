export function buildPostOrderEmail(linkUrl: string): {
  subject: string
  html: string
} {
  const subject: string = 'Czy podobał Ci się box Moodbox?'
  const html: string = `<h1>Bardzo zależy nam na Twojej opinii!</h1>
  <p> Wypełnij krótką ankietę i otrzymaj kod rabatowy na kolejne zamówienie.</p>
  <p><a href="${linkUrl}">Ankietę możesz wypełnić tutaj</a></p>
  <p> Z góry dziękujemy!</p>
  <p> Moodbox</p>
  `

  return { subject, html }
}
