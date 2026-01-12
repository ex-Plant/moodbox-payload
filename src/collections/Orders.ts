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
      afterListTable: ['@/components/TriggerSendingScheduledEmails'],
    },
    useAsTitle: 'orderId',
    defaultColumns: ['orderId', 'email', 'company_name', 'hasSurvey', 'createdAt'],
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
        pl: 'Id zamówienia shopify',
        en: 'Shopify Order ID',
      },
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'hasSurvey',
      type: 'checkbox',
      label: {
        pl: 'Ankieta',
        en: 'Has Survey',
      },
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'survey',
      type: 'join',
      label: {
        pl: 'Ankieta wypełniona',
        en: 'Survey',
      },
      collection: 'survey-responses',
      on: 'order',
    },
    {
      name: 'email',
      type: 'email',
      label: {
        pl: 'Adres email',
        en: 'Email',
      },
    },
    {
      name: 'company_name',
      type: 'text',
      label: 'Nazwa firmy',
    },
    {
      name: 'projects_per_year',
      type: 'text',
      label: 'Projekty rocznie',
    },
    {
      name: 'city',
      type: 'text',
      label: 'Miasto',
    },
    {
      name: 'project_type',
      type: 'text',
      label: 'Typ projektu',
    },
    {
      name: 'completion_date',
      type: 'text',
      label: 'Termin realizacji',
    },
    {
      name: 'project_stage',
      type: 'text',
      label: 'Etap projektu',
    },
    {
      name: 'project_area',
      type: 'text',
      label: 'Powierzchnia projektu',
    },
    {
      name: 'project_budget',
      type: 'text',
      label: 'Budżet projektu',
    },
    {
      name: 'nip',
      type: 'text',
      label: 'NIP',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Strona www',
    },
  ],
}
