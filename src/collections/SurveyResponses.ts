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
    components: {
      afterListTable: [
        {
          path: '@/components/ExportCSV',
          clientProps: {
            route: '/api/export/survey',
            fileTitle: 'Ankieta odpowiedzi',
          },
        },
      ],
    },
    useAsTitle: 'customer_email',
    defaultColumns: [
      'order',
      'customer_email',
      'completedAt',
      'rejected_brand',
      'brand_evaluations',
      'contact_request',
    ],
  },
  access: {
    read: () => true,
    create: () => false,
    // update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'order',
      label: {
        pl: 'Zamówienie',
        en: 'Order',
      },
      type: 'relationship',
      relationTo: 'orders',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        components: {
          Cell: '@/components/ShopifyLink',
        },
      },
    },
    {
      name: 'customer_email',
      type: 'email',
      label: {
        pl: 'Email klienta',
        en: 'Customer Email',
      },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Completed At',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'considered_brands',
      type: 'text',
      hasMany: true,
      admin: {
        readOnly: true,
        components: {
          Cell: '@/components/ListCell',
        },
      },
      label: {
        pl: 'Rozważane marki',
        en: 'Considered Brands',
      },
    },
    {
      name: 'rejected_brand',
      type: 'text',
      admin: {
        readOnly: true,
        components: {
          Cell: '@/components/RejectionSummaryCell',
        },
      },
      label: {
        pl: 'Odrzucona marka',
        en: 'Rejected Brand',
      },
    },
    {
      name: 'brand_evaluations',
      type: 'array',
      admin: {
        readOnly: true,
        initCollapsed: true,
        components: {
          Cell: '@/components/BrandEvaluationsCell',
        },
      },
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
      admin: {
        readOnly: true,
        hidden: true,
        components: {
          Cell: '@/components/ListCell',
        },
      },
      label: {
        pl: 'Powody odrzucenia',
        en: 'Rejection Reasons',
      },
    },
    {
      name: 'rejection_other',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
      label: {
        pl: 'Inny powód odrzucenia',
        en: 'Other Rejection Reason',
      },
    },
    {
      name: 'contact_request',
      type: 'checkbox',
      admin: {
        readOnly: true,
        components: {
          Cell: '@/components/BooleanCell',
        },
      },
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
      admin: {
        readOnly: true,
        components: {
          Cell: '@/components/ListCell',
        },
      },
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'improvement_suggestion',
      type: 'textarea',
      admin: {
        readOnly: true,
        components: {
          Cell: '@/components/LongTextCell',
        },
      },
      label: {
        pl: 'Sugestie poprawy',
        en: 'Improvement Suggestions',
      },
    },
  ],
}
