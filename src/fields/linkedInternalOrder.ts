import type { Field } from 'payload'

export const linkedInternalOrderField: Field = {
  name: 'linkedInternalOrder',
  label: {
    pl: 'Połączone zamówienie',
    en: 'Linked Order',
  },
  type: 'text',
  required: false,
  admin: {
    readOnly: true,
    components: {
      Cell: {
        path: '@/components/LinkOrderCell',
        clientProps: {
          href: '/admin/collections/orders',
          label: 'id',
        },
      },
    },
  },
}
