import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const config_hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'media',
      type: 'upload',
      label: 'Media',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'richText',
      label: 'Title',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'add_subtitle',
      type: 'checkbox',
      label: 'Add subtitle',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      required: false,
      admin: {
        condition: (_, { add_subtitle } = {}) => add_subtitle === true,
      },
    },
    {
      name: 'add_button',
      type: 'checkbox',
      label: 'Add button',
      required: true,
    },
    {
      name: 'button_link',
      type: 'group',
      label: 'Button link',
      required: true,
      admin: {
        condition: (_, { add_button } = {}) => add_button === true,
        description: 'test description',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'url',
        },
      ],
    },
  ],
}
