import type { Block } from 'payload'

export const config_delimiter: Block = {
  slug: 'delimiterBlock',
  interfaceName: 'Delimiter Block',
  labels: {
    singular: 'Delimiter',
    plural: 'Delimiters',
  },
  fields: [
    {
      name: 'fullWidth',
      type: 'checkbox',
      defaultValue: false,
      label: 'Full Width',
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
    },
  ],
}
