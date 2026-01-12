import { CollectionConfig } from 'payload'

export const SurveyResponses: CollectionConfig = {
  slug: 'survey-responses',
  labels: {
    plural: {
      pl: 'Wypełnione Ankiety',
      en: 'Survey Responses',
    },
    singular: {
      pl: 'Odpowiedź Ankiety',
      en: 'Survey Response',
    },
  },
  access: {
    read: () => true,
    // create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
      unique: true,
    },
    {
      name: 'responses',
      type: 'json',
      label: 'Responses',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Completed At',
    },
  ],
}
