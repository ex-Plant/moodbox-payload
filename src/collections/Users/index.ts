import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/is-admin'

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
    delete: isAdmin,
    read: authenticated,
    update: ({ req: { user }, id }) => user?.role === 'admin' || user?.id === id,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  hooks: {
    beforeDelete: [
      async ({ req }) => {
        const userCount = await req.payload.count({ collection: 'users' })
        if (userCount.totalDocs <= 1) {
          throw new Error('Nie można usunąć ostatniego użytkownika')
        }
      },
    ],
  },
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
      name: 'role',
      type: 'select',
      label: {
        pl: 'Rola',
        en: 'Role',
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  timestamps: true,
}
