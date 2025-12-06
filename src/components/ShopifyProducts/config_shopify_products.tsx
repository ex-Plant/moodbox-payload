import type { Block } from 'payload'
import { pl } from 'zod/v4/locales'

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
  fields: [
    {
      name: 'Limit info',
      type: 'text',
      label: {
        pl: 'Wskazówka - przekroczony limit ',
        en: 'Tip - limit exceeded',
      },
    },
  ],
}
