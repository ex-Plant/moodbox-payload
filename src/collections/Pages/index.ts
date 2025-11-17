import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { config_hero } from '@/components/Hero/config_hero'
import { config_delimiter } from '@/components/Delimiter/config_delimiter'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { config_shopify_products } from '@/components/ShopifyProducts/config_shopify_products'
import { config_shopify_cart } from '@/components/ShopifyCart/config_shopify_cart'
import { config_steps } from '@/components/StepsSection/steps_config'
import { config_partners } from '@/components/Partners/config_partners'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        pl: 'Tytuł',
      },
    },
    {
      name: 'textPage',
      type: 'checkbox',
      required: false,
      label: {
        en: 'Text page',
        pl: 'Strona tekstowa',
      },
      admin: {
        description: {
          en: 'If checked, the page will be displayed as a text page',
          pl: 'Strona ma być wyświetlana jako strona informacyjna',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [config_hero],
          label: {
            en: 'Hero',
            pl: 'Baner główny',
          },
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                config_delimiter,
                config_shopify_products,
                config_shopify_cart,
                config_steps,
                config_partners,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: {
            en: 'Content',
            pl: 'Treść',
          },
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: {
                  en: 'Title',
                  pl: 'Tytuł'
                }
              }
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                label: {
                  en: 'Image',
                  pl: 'Meta Obraz'
                }
              }
            }),

            MetaDescriptionField({
              overrides: {
                label: {
                  en: 'Description',
                  pl: 'Meta Opis'
                }
              }
            }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
