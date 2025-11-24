// src/collections/Orders.ts
import { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
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
      required: true,
      label: 'Nazwa firmy',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
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
      type: 'select',
      label: 'Typ projektu',
      options: [
        { label: 'Dom', value: 'Dom' },
        { label: 'Mieszkanie', value: 'Mieszkanie' },
        { label: 'Biuro', value: 'Biuro' },
        { label: 'Inny', value: 'Inny' },
      ],
    },
    {
      name: 'completion_date',
      type: 'text',
      label: 'Termin realizacji',
    },
    {
      name: 'project_stage',
      type: 'select',
      label: 'Etap projektu',
      options: [
        { label: 'Koncepcja', value: 'koncepcja' },
        { label: 'Projekt budowlany', value: 'projekt budowlany' },
        { label: 'Projekt wykonawczy', value: 'projekt wykonawczy' },
        { label: 'Inny', value: 'inny' },
      ],
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
