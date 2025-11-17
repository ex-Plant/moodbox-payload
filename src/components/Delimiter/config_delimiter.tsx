import type { Block } from 'payload'

export const config_delimiter: Block = {
  slug: 'delimiterBlock',
  interfaceName: 'DelimiterBlock',
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
      name: 'bottomPageDelimiter',
      type: 'checkbox',
      defaultValue: false,
      label: {
        pl: 'Separator na dole strony',
        en: 'Bottom page delimiter',
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
