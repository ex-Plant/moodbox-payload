import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const config_shopify_cart: Block = {
  slug: 'shopifyCartBlock',
  interfaceName: 'ShopifyCartBlock',
  labels: {
    singular: {
      en: 'Shopify Cart Block',
      pl: 'Koszyk Shopify',
    },
    plural: {
      en: 'Shopify Cart Blocks',
      pl: 'Koszyki Shopify',
    },
  },
  fields: [
    // ===== TEXT LABELS =====
    {
      name: 'emptyBasketLabel',
      type: 'text',
      label: {
        en: 'Empty Cart Tip',
        pl: 'Wskazówka - pusty koszyk',
      },
      required: true,
      localized: true,
    },
    {
      name: 'selectedItemsLabel',
      type: 'text',
      label: {
        en: 'Selected Items Label',
        pl: 'Etykieta wybranych próbek',
      },
      required: true,
      localized: true,
    },
    {
      name: 'additionalInfoLabel',
      type: 'text',
      label: {
        en: 'Additional Info Label',
        pl: 'Etykieta dodatkowych informacji',
      },
      required: true,
      localized: true,
    },
    {
      name: 'companyDataLabel',
      type: 'text',
      label: {
        en: 'Company Data Label',
        pl: 'Etykieta danych firmowych',
      },
      required: true,
      localized: true,
    },
    {
      name: 'formTipText',
      type: 'textarea',
      label: {
        en: 'Form Tip Text',
        pl: 'Tekst wskazówki formularza',
      },
      required: true,
      localized: true,
    },
    {
      name: 'proceedToCheckoutLabel',
      type: 'text',
      label: {
        en: 'Proceed to Checkout Label',
        pl: 'Button - przejdź do płatności',
      },
      required: true,
      localized: true,
    },
    {
      name: 'deleteAllLabel',
      type: 'text',
      label: {
        en: 'Delete All Label',
        pl: 'Button - usuń wszystkie',
      },
      required: true,
      localized: true,
    },

    // ===== INDIVIDUAL INPUT FIELDS =====
    {
      name: 'companyName',
      type: 'text',
      label: {
        en: 'Company Name Placeholder',
        pl: 'Nazwa firmy',
      },
      localized: true,
      required: true,
    },

    {
      name: 'email',
      type: 'text',
      label: {
        en: 'Email ',
        pl: 'Email',
      },
      localized: true,
      required: true,
    },
    {
      name: 'nip',
      type: 'text',
      label: {
        en: 'NIP Placeholder',
        pl: 'NIP',
      },
      localized: true,
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      label: {
        en: 'Website Placeholder',
        pl: 'Strona www',
      },
      localized: true,
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      label: {
        en: 'City Placeholder',
        pl: 'Miejscowość',
      },
      localized: true,
      required: true,
    },
    {
      name: 'completionDatePlaceholder',
      type: 'text',
      label: {
        en: 'Completion Date Placeholder',
        pl: 'Termin realizacji (MM/RR)',
      },
      localized: true,
      required: true,
    },
    {
      name: 'projectsPerYearPlaceholder',
      type: 'text',
      label: {
        en: 'Projects Per Year Placeholder',
        pl: 'Liczba projektów rocznie',
      },
      localized: true,
      required: true,
    },

    // ===== INDIVIDUAL SELECT FIELDS =====
    {
      name: 'projectBudget',
      type: 'text',
      label: {
        en: 'Project Budget ',
        pl: 'Budżet projektu',
      },
      localized: true,
      required: true,
    },
    {
      name: 'projectBudgetValues',
      type: 'array',
      label: {
        en: 'Project Budget options',
        pl: 'Opcje',
      },
      minRows: 1,
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Label',
            pl: 'Etykieta',
          },
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'projectTypePlaceholder',
      type: 'text',
      label: {
        en: 'Project Type Placeholder',
        pl: 'Typ projektu',
      },
      localized: true,
      required: true,
    },
    {
      name: 'projectTypeOptions',
      type: 'array',
      label: {
        en: 'Project Type Options',
        pl: 'Opcje',
      },
      minRows: 1,
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Label',
            pl: 'Etykieta',
          },
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'projectAreaPlaceholder',
      type: 'text',
      label: {
        en: 'Project Area ',
        pl: 'Metraż projektu',
      },
      localized: true,
      required: true,
    },
    {
      name: 'projectAreaValues',
      type: 'array',
      label: {
        en: 'Project Area options',
        pl: 'Opcje',
      },
      minRows: 1,
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Label',
            pl: 'Nazwa metrażu',
          },
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'projectStagePlaceholder',
      type: 'text',
      label: {
        en: 'Project Stage Placeholder',
        pl: 'Etap projektu',
      },
      localized: true,
      required: true,
    },
    {
      name: 'projectStageOptions',
      type: 'array',
      label: {
        en: 'Project Stage Options',
        pl: 'Etapy projektu',
      },
      minRows: 1,
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Label',
            pl: 'Etykieta',
          },
          required: true,
          localized: true,
        },
      ],
      defaultValue: [
        {
          label: {
            en: 'concept',
            pl: 'koncepcja',
          },
        },
        {
          label: {
            en: 'executive project',
            pl: 'projekt wykonawczy',
          },
        },
        {
          label: {
            en: 'realization',
            pl: 'realizacja',
          },
        },
      ],
    },
    // ===== CONSENT CHECKBOX =====
    {
      name: 'consentText',
      type: 'richText',
      label: {
        en: 'Consent Text',
        pl: 'Tekst zgody',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
      localized: true,
    },
    {
      name: 'consentText2',
      type: 'richText',
      label: {
        en: 'Consent Text 2',
        pl: 'Tekst zgody 2',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
      localized: true,
    },
  ],
}
