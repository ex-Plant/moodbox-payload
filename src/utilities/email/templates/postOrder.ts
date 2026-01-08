import { renderBaseLayout, EmailItemT } from '../BaseLayout'

export function generatePostOrderEmailHTML(linkUrl: string): string {
  const title = 'Dziękujemy za skorzystanie z Moodbox Polska.'
  const footer = 'Zespół Moodbox Polska'

  const items: EmailItemT[] = [
    {
      type: 'text',
      content:
        'Jesteśmy na etapie pilotażu i rozwijamy Moodbox w oparciu o realne doświadczenia projektantów.',
    },
    {
      type: 'text',
      content:
        'Twoja opinia pomaga nam lepiej zrozumieć potrzeby i kierunek dalszego rozwoju Moodboxa.',
    },
    {
      type: 'text',
      content: 'Wypełnienie ankiety zajmie tylko około 2–3 minut.',
    },
    {
      type: 'text',
      content: 'Po jej wypełnieniu otrzymasz kod rabatowy na kolejne zamówienie w Moodbox Polska.',
    },
    {
      type: 'button',
      label: 'WYPEŁNIJ ANKIETĘ',
      url: linkUrl,
    },
  ]

  return renderBaseLayout({ title, items, footer })
}
