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
      name: 'fixedPriceLabel',
      type: 'text',
      label: {
        en: 'Fixed Price Label',
        pl: 'Stała cena',
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
        pl: 'Typy projektów',
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
            en: 'Apartment',
            pl: 'Mieszkanie',
          },
        },
        {
          label: {
            en: 'House',
            pl: 'Dom',
          },
        },
        {
          label: {
            en: 'Hotel',
            pl: 'Hotel',
          },
        },
        {
          label: {
            en: 'Restaurant',
            pl: 'Restauracja',
          },
        },
        {
          label: {
            en: 'Office',
            pl: 'Biuro',
          },
        },
      ],
    },

    {
      name: 'projectAreaPlaceholder',
      type: 'text',
      label: {
        en: 'Project Area Placeholder',
        pl: 'Powierzchnia projektu',
      },
      localized: true,
      required: true,
    },
    {
      name: 'projectAreaOptions',
      type: 'array',
      label: {
        en: 'Project Area Options',
        pl: 'Powierzchnie projektów',
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
            en: '0-100 m²',
            pl: '0-100 m²',
          },
        },
        {
          label: {
            en: '100-500 m²',
            pl: '100-500 m²',
          },
        },
        {
          label: {
            en: '500-2000 m²',
            pl: '500-2000 m²',
          },
        },
        {
          label: {
            en: '2000 m² and more',
            pl: '2000 m² i więcej',
          },
        },
      ],
    },
    {
      name: 'projectBudgetPlaceholder',
      type: 'text',
      label: {
        en: 'Project Budget Placeholder',
        pl: 'Budżet projektu',
      },
      localized: true,
      required: true,
    },
    {
      name: 'projectBudgetOptions',
      type: 'array',
      label: {
        en: 'Project Budget Options',
        pl: 'Budżety projektów',
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
            en: 'up to 100 thousand zł',
            pl: 'do 100 tys. zł',
          },
        },
        {
          label: {
            en: '100–300 thousand zł',
            pl: '100–300 tys. zł',
          },
        },
        {
          label: {
            en: '300–700 thousand zł',
            pl: '300–700 tys. zł',
          },
        },
        {
          label: {
            en: '700 thousand–1.5 million zł',
            pl: '700 tys.–1,5 mln zł',
          },
        },
        {
          label: {
            en: 'above 1.5 million zł',
            pl: 'powyżej 1,5 mln zł',
          },
        },
        {
          label: {
            en: 'not sure yet',
            pl: 'jeszcze nie wiem',
          },
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
        pl: 'Etapy projektów',
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
