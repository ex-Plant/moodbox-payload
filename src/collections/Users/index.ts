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
    },
    {
      name: 'test_required',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
}
