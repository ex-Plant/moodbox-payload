// src/collections/Clients.ts
import { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    components: {
      // beforeList: ['@/components/CustomAdminHeader'],
      // beforeListTable: ['@/components/CustomAdminHeader'],
      afterListTable: ['@/components/DownloadClients'],
    },
    useAsTitle: 'company_name',
    defaultColumns: ['company_name', 'email', 'city', 'project_type', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'company_name',
      type: 'text',
      label: 'Nazwa firmy',
      // Removed 'required: true' to allow empty strings
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      // Removed 'required: true' to allow empty strings
    },
    {
      name: 'projects_per_year',
      type: 'text',
      label: 'Projekty rocznie',
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
    {
      name: 'city',
      type: 'text',
      label: 'Miasto',
    },
    {
      name: 'project_type',
      type: 'text', // Changed from 'select' to 'text' to accept any string including empty
      label: 'Typ projektu',
    },
    {
      name: 'completion_date',
      type: 'text',
      label: 'Termin realizacji',
    },
    {
      name: 'project_stage',
      type: 'text', // Changed from 'select' to 'text' to accept any string including empty
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
      name: 'consents',
      type: 'group',
      label: 'Zgody',
      fields: [
        {
          name: 'consent1',
          type: 'checkbox',
          label: 'Zgoda na przetwarzanie danych',
        },
        {
          name: 'consent2',
          type: 'checkbox',
          label: 'Zgoda na kontakt marketingowy',
        },
      ],
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}
