import { Block } from 'payload'

export const config_partners: Block = {
  slug: 'partnersBlock',
  interfaceName: 'PartnersBlock',
  labels: {
    singular: {
      en: 'Partners',
      pl: 'Partnerzy',
    },
    plural: {
      en: 'Partners',
      pl: 'Partnerzy',
    },
  },
  fields: [
    {
      name: 'partners',
      type: 'array',
      fields: [
        {
          name: 'partner',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
