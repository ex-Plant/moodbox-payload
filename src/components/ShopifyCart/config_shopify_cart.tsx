import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const config_shopify_cart: Block = {
  slug: 'shopifyCartBlock',
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
  ],
}
