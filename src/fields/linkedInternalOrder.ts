import type { Field } from 'payload'

export const linkedInternalOrderField: Field = {
  name: 'linkedInternalOrder',
  label: {
    pl: 'Połączone zamówienie',
    en: 'Linked Order',
  },
  type: 'text',
  required: false,
  unique: true,
  admin: {
    readOnly: true,
    components: {
      Cell: {
        path: '@/components/LinkCell',
        clientProps: {
          href: '/admin/collections/orders',
          label: 'id',
        },
      },
    },
  },
}
