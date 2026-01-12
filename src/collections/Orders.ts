import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    plural: {
      pl: 'Zamówienia',
      en: 'Orders',
    },
    singular: {
      pl: 'Zamówienie',
      en: 'Order',
    },
  },
  admin: {
    components: {
      afterListTable: [
        {
          path: '@/components/ExportCSV',
          clientProps: {
            route: '/api/export/orders',
            fileTitle: 'Zamówienia',
          },
        },
      ],
    },
    useAsTitle: 'orderId',
    defaultColumns: ['orderId', 'email', 'company_name', 'survey', 'hasSurvey', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'orderId',
      type: 'text',
      label: {
        pl: 'Shopify link',
        en: 'Shopify link',
      },
      required: true,
      unique: true,
      index: true,
      admin: {
        components: {
          Cell: '@/components/ShopifyLink',
          afterInput: [
            {
              path: '@/components/ShopifyLink',
              clientProps: {
                watchField: 'orderId',
              },
            },
          ],
        },
      },
    },
    {
      name: 'hasSurvey',
      type: 'checkbox',
      label: {
        pl: 'Wypełniona ankieta',
        en: 'Has Survey',
      },
      defaultValue: false,
      admin: {
        components: {
          Cell: '@/components/BooleanCell',
        },
        readOnly: true,
      },
    },
    {
      name: 'survey',
      type: 'join',
      label: {
        pl: 'Ankieta',
        en: 'Survey',
      },
      collection: 'survey-responses',
      on: 'order',
      admin: {
        components: {
          Cell: {
            path: '@/components/LinkCell',
            clientProps: {
              href: '/admin/collections/survey-responses',
              label: 'Ankieta',
            },
          },
        },
      },
    },
    {
      name: 'email',
      type: 'email',
      label: {
        pl: 'Adres email',
        en: 'Email',
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'company_name',
      type: 'text',
      label: 'Nazwa firmy',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'projects_per_year',
      type: 'text',
      label: 'Projekty rocznie',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'city',
      type: 'text',
      label: 'Miasto',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'project_type',
      type: 'text',
      label: 'Typ projektu',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'completion_date',
      type: 'text',
      label: 'Termin realizacji',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'project_stage',
      type: 'text',
      label: 'Etap projektu',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'project_area',
      type: 'text',
      label: 'Powierzchnia projektu',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'project_budget',
      type: 'text',
      label: 'Budżet projektu',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'nip',
      type: 'text',
      label: 'NIP',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Strona www',
      admin: {
        readOnly: true,
      },
    },
  ],
}
