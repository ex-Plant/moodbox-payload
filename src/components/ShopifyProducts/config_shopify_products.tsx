import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const config_shopify_products: Block = {
  slug: 'shopifyProductsBlock',
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
  ],
}
