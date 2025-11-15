import { Block } from 'payload'

export const steps_config: Block = {
  slug: 'stepsBlock',
  interfaceName: 'StepsBlock',
  labels: {
    singular: {
      en: 'How it works',
      pl: 'Jak to działa',
    },
    plural: {
      en: 'How it works',
      pl: 'Jak to działa',
    },
  },
  fields: [
    {
      name: 'steps',
      type: 'array',
      localized: true,
      label: {
        en: 'Steps',
        pl: 'Kroki',
      },
      fields: [
        {
          name: 'step',
          type: 'text',
          label: {
            en: 'Step',
            pl: 'Krok',
          },
          required: true,
          localized: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: {
              en: 'More icons here: https://www.shadcn.io/icons',
              pl: 'Więcej znajdziesz tutaj: https://www.shadcn.io/icons',
            },
          },
          label: {
            en: 'Icon',
            pl: 'Ikona',
          },
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
