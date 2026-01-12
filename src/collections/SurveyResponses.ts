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
  admin: {
    useAsTitle: 'customer_email',
    defaultColumns: ['customer_email', 'order', 'completedAt'],
  },
  access: {
    read: () => true,
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
      name: 'customer_email',
      type: 'email',
      label: {
        pl: 'Email klienta',
        en: 'Customer Email',
      },
      required: true,
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Completed At',
      required: true,
    },
    {
      name: 'considered_brands',
      type: 'text',
      hasMany: true,
      label: {
        pl: 'Rozważane marki',
        en: 'Considered Brands',
      },
    },
    {
      name: 'rejected_brand',
      type: 'text',
      label: {
        pl: 'Odrzucona marka',
        en: 'Rejected Brand',
      },
    },
    {
      name: 'brand_evaluations',
      type: 'array',
      label: {
        pl: 'Oceny marek',
        en: 'Brand Evaluations',
      },
      fields: [
        {
          name: 'brand_name',
          type: 'text',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'reasons',
          type: 'text',
          hasMany: true,
          label: {
            pl: 'Powody',
            en: 'Reasons',
          },
        },
        {
          name: 'other_reason',
          type: 'text',
        },
      ],
    },
    {
      name: 'rejection_reasons',
      type: 'text',
      hasMany: true,
      label: {
        pl: 'Powody odrzucenia',
        en: 'Rejection Reasons',
      },
    },
    {
      name: 'rejection_other',
      type: 'text',
      label: {
        pl: 'Inny powód odrzucenia',
        en: 'Other Rejection Reason',
      },
    },
    {
      name: 'contact_request',
      type: 'checkbox',
      label: {
        pl: 'Prośba o kontakt',
        en: 'Contact Request',
      },
      defaultValue: false,
    },
    {
      name: 'contact_brands',
      type: 'text',
      hasMany: true,
      label: {
        pl: 'Marki do kontaktu',
        en: 'Contact Brands',
      },
    },
    {
      name: 'missing_brands',
      type: 'text',
      label: {
        pl: 'Brakujące marki',
        en: 'Missing Brands',
      },
    },
    {
      name: 'improvement_suggestion',
      type: 'textarea',
      label: {
        pl: 'Sugestie poprawy',
        en: 'Improvement Suggestions',
      },
    },
  ],
}
