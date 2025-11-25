import { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    plural: {
      pl: 'Klienci',
      en: 'Clients',
    },
    singular: {
      pl: 'Klient',
      en: 'Client',
    },
  },
  admin: {
    components: {
      afterListTable: ['@/components/DownloadClients'],
    },

    useAsTitle: 'email',
    defaultColumns: [
      'email',
      'company_name',
      'project_type',
      'projects_per_year',
      'city',
      'project_budget',
    ],
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
    // {
    //   name: 'consents',
    //   type: 'group',
    //   label: 'Zgody',
    //   fields: [
    //     {
    //       name: 'consent1',
    //       type: 'checkbox',
    //       label: 'Zgoda na przetwarzanie danych',
    //     },
    //     {
    //       name: 'consent2',
    //       type: 'checkbox',
    //       label: 'Zgoda na kontakt marketingowy',
    //     },
    //   ],
    // },
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
