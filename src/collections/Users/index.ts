import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: {
      pl: 'Użytkownicy',
      en: 'Users',
    },
    singular: {
      pl: 'Użytkownik',
      en: 'User',
    },
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        pl: 'Imię i nazwisko',
        en: 'Name',
      },
    },
    {
      name: 'test_required',
      type: 'text',
      label: {
        pl: 'Pole testowe (wymagane)',
        en: 'Test Field (Required)',
      },
      required: true,
    },
  ],
  timestamps: true,
}
