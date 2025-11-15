import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const config_shopify_products: Block = {
  slug: 'shopifyProductsBlock',
  interfaceName: 'ShopifyProductsBlock',
  labels: {
    singular: {
      en: 'Shopify Products Block',
      pl: 'Blok produktów Shopify',
    },
    plural: {
      en: 'Shopify Products Blocks',
      pl: 'Bloki produktów Shopify',
    },
  },
  fields: [],
}
