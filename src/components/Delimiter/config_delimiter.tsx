import type { Block } from 'payload'

export const config_delimiter: Block = {
  slug: 'delimiterBlock',
  interfaceName: 'Delimiter Block',
  labels: {
    singular: {
      en: 'Delimiter',
      pl: 'Separator',
    },
    plural: {
      en: 'Delimiters',
      pl: 'Separatory',
    },
  },
  fields: [
    {
      name: 'fullWidth',
      type: 'checkbox',
      defaultValue: false,
      label: {
        pl: 'Pełna szerokość',
        en: 'Full Width',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      label: {
        en: 'Title',
        pl: 'Tytuł',
      },
      localized: true,
    },
  ],
}
