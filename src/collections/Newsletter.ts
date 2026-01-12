// src/collections/Clients.ts
import { CollectionConfig } from 'payload'

export const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  labels: {
    plural: {
      pl: 'Lista newsletter',
      en: 'Newsletter List',
    },
    singular: {
      pl: 'Adres email',
      en: 'E-mail addresss',
    },
  },
  admin: {
    components: {
      afterListTable: [
        {
          path: '@/components/ExportCSV',
          clientProps: {
            route: '/api/export/newsletter',
            fileTitle: 'Lista Newsletter',
          },
        },
      ],
    },
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      unique: true,
    },
    {
      name: 'createdAt',
      label: {
        pl: 'Utworzono',
        en: 'Created At',
      },
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}
