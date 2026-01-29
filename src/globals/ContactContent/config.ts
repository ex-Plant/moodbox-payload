import type { GlobalConfig } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { revalidateContactContent } from './hooks/revalidateContactContent'

export const ContactContent: GlobalConfig = {
  slug: 'contact-content',
  label: {
    pl: 'Treści strony kontaktowej',
    en: 'Contact Page Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'header',
      type: 'text',
      required: true,
      label: { pl: 'Nagłówek strony', en: 'Page Header' },
      defaultValue: 'Skontaktuj się z nami',
    },
    {
      name: 'subjectPlaceholder',
      type: 'text',
      required: true,
      label: { pl: 'Placeholder pola temat ', en: 'Subject Placeholder' },
      defaultValue: 'Temat',
    },
    {
      name: 'messagePlaceholder',
      type: 'text',
      required: true,
      label: { pl: 'Placeholder pola wiadomość', en: 'Message Placeholder' },
      defaultValue: 'Treść wiadomości',
    },
    {
      name: 'emailPlaceholder',
      type: 'text',
      required: true,
      label: { pl: 'Placeholder pola email', en: 'Email Placeholder' },
      defaultValue: 'Twój email',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: { pl: 'Tekst przycisku', en: 'Button Text' },
      defaultValue: 'Wyślij',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: defaultLexical,
      label: { pl: 'Dodatkowa treść', en: 'Additional Content' },
      admin: {
        description: {
          pl: 'Opcjonalna dodatkowa treść wyświetlana pod formularzem',
          en: 'Optional additional content displayed below the form',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateContactContent],
  },
}
