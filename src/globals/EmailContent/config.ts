import type { GlobalConfig } from 'payload'

export const EmailContent: GlobalConfig = {
  slug: 'email-content',
  label: {
    pl: 'Treści emaili',
    en: 'Email Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'surveyInvitation',
      type: 'group',
      label: { pl: 'Zaproszenie do ankiety', en: 'Survey Invitation Email' },
      fields: [
        {
          name: 'subject',
          type: 'text',
          label: { pl: 'Temat', en: 'Subject' },
          required: true,
          defaultValue: 'Moodbox Polska — Twoja opinia jest dla nas ważna',
        },
        {
          name: 'title',
          type: 'text',
          label: { pl: 'Tytuł', en: 'Title' },
          required: true,
          defaultValue: 'Dziękujemy za skorzystanie z Moodbox Polska.',
        },
        {
          name: 'paragraph1',
          type: 'textarea',
          label: { pl: 'Akapit 1', en: 'Paragraph 1' },
          defaultValue:
            'Jesteśmy na etapie pilotażu i rozwijamy Moodbox w oparciu o realne doświadczenia projektantów.',
        },
        {
          name: 'paragraph2',
          type: 'textarea',
          label: { pl: 'Akapit 2', en: 'Paragraph 2' },
          defaultValue:
            'Twoja opinia pomaga nam lepiej zrozumieć potrzeby i kierunek dalszego rozwoju Moodboxa.',
        },
        {
          name: 'paragraph3',
          type: 'textarea',
          label: { pl: 'Akapit 3', en: 'Paragraph 3' },
          defaultValue: 'Wypełnienie ankiety zajmie tylko około 2–3 minut.',
        },
        {
          name: 'paragraph4',
          type: 'textarea',
          label: { pl: 'Akapit 4', en: 'Paragraph 4' },
          defaultValue:
            'Po jej wypełnieniu otrzymasz kod rabatowy na kolejne zamówienie w Moodbox Polska.',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: { pl: 'Tekst przycisku', en: 'Button Label' },
          defaultValue: 'WYPEŁNIJ ANKIETĘ',
        },
        {
          name: 'footer',
          type: 'text',
          label: { pl: 'Stopka', en: 'Footer' },
          defaultValue: 'Zespół Moodbox Polska',
        },
      ],
    },
    {
      name: 'discountCode',
      type: 'group',
      label: { pl: 'Email z kodem rabatowym', en: 'Discount Code Email' },
      fields: [
        {
          name: 'subject',
          type: 'text',
          label: { pl: 'Temat', en: 'Subject' },
          required: true,
          defaultValue: 'Kod rabatowy od Moodbox Polska',
        },
        {
          name: 'greeting',
          type: 'text',
          label: { pl: 'Powitanie', en: 'Greeting' },
          defaultValue: 'Dzień dobry,',
        },
        {
          name: 'thankYou',
          type: 'text',
          label: { pl: 'Podziękowanie', en: 'Thank You' },
          defaultValue: 'Dziękujemy za wypełnienie ankiety.',
        },
        {
          name: 'codeIntro',
          type: 'textarea',
          label: { pl: 'Wprowadzenie do kodu', en: 'Code Introduction' },
          defaultValue:
            'Przesyłamy indywidualny kod rabatowy na kolejne zamówienie w Moodbox Polska:',
        },
        {
          name: 'codeActiveNote',
          type: 'text',
          label: { pl: 'Informacja o aktywności kodu', en: 'Code Active Note' },
          defaultValue: 'Kod jest aktywny i gotowy do użycia przy składaniu zamówienia.',
        },
        {
          name: 'codeValidityNote',
          type: 'text',
          label: { pl: 'Ważność kodu', en: 'Code Validity Note' },
          defaultValue: 'Ważny przez 30 dni od daty otrzymania tej wiadomości.',
        },
        {
          name: 'closingNote',
          type: 'textarea',
          label: { pl: 'Zakończenie', en: 'Closing Note' },
          defaultValue: 'Jeśli pojawią się pytania - jesteśmy do dyspozycji.',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: { pl: 'Tekst przycisku', en: 'Button Label' },
          defaultValue: 'ZAMÓW MOODBOX',
        },
        {
          name: 'footer',
          type: 'text',
          label: { pl: 'Stopka', en: 'Footer' },
          defaultValue: 'Zespół Moodbox Polska',
        },
      ],
    },
  ],
}
