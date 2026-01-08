import { renderBaseLayout, EmailItemT } from '../BaseLayout'

export function generateDiscountCodeEmailHTML(discountCode: string): string {
  const title = ''
  const footer = 'Zespół Moodbox Polska'

  const items: EmailItemT[] = [
    {
      type: 'text',
      content: 'Dzień dobry,',
      marginBottom: '0px',
    },
    {
      type: 'text',
      content: 'Dziękujemy za wypełnienie ankiety.',
      marginBottom: '0px',
    },
    {
      type: 'text',
      content: 'Przesyłamy indywidualny kod rabatowy na kolejne zamówienie w Moodbox Polska:',
    },
    {
      type: 'raw',
      html: `
        <div style=
          "background-color: white;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            color: #472f27;">
          KOD: ${discountCode}
        </div>`,
    },
    {
      type: 'text',
      content: 'Kod jest aktywny i gotowy do użycia przy składaniu zamówienia.',
      marginBottom: '0px',
    },
    {
      type: 'text',
      content: 'Ważny przez 30 dni od daty otrzymania tej wiadomości.',
      marginBottom: '0px',
    },
    {
      type: 'text',
      content: 'Jeśli pojawią się pytania - jesteśmy do dyspozycji.',
    },
    {
      type: 'button',
      label: 'ZAMÓW MOODBOX',
      url: 'https://moodbox.pl',
    },
  ]

  return renderBaseLayout({ title, items, footer })
}
