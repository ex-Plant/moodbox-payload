import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const config_shopify_cart: Block = {
  slug: 'shopifyCartBlock',
  interfaceName: 'ShopifyCartBlock',
  fields: [
    // ===== TEXT LABELS =====
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Formularz',
      required: true,
    },
    {
      name: 'emptyBasketLabel',
      type: 'text',
      label: 'Empty Basket Label',
      defaultValue: 'Koszyk jest pusty',
      required: true,
    },
    {
      name: 'selectedItemsLabel',
      type: 'text',
      label: 'Selected Items Label',
      defaultValue: 'Wybrane produkty',
      required: true,
    },
    {
      name: 'additionalInfoLabel',
      type: 'text',
      label: 'Additional Info Label',
      defaultValue: 'Dodatkowe informacje',
      required: true,
    },
    {
      name: 'companyDataLabel',
      type: 'text',
      label: 'Company Data Label',
      defaultValue: 'Dane firmowe',
      required: true,
    },
    {
      name: 'fixedPriceLabel',
      type: 'text',
      label: 'Fixed Price Label',
      defaultValue: '39 PLN',
      required: true,
    },
    {
      name: 'formTipText',
      type: 'textarea',
      label: 'Form Tip Text',
      defaultValue: `Dlaczego prosimy o wypełnienie formularza?
      Informacje o projekcie pozwa3lają nam przekazać producentom wartościowe dane i usprawnić proces dystrybucji próbek. Dzięki temu materiały są dobierane bardziej precyzyjnie, a cały proces zamawiania staje się szybszy i wygodniejszy. Twoje dane są chronione i wykorzystywane wyłącznie w celu obsługi zamówienia oraz poprawy jakości usługi.`,
      required: true,
    },
    {
      name: 'proceedToCheckoutLabel',
      type: 'text',
      label: 'Proceed to Checkout Label',
      defaultValue: 'Przejdź do płatności',
      required: true,
    },
    {
      name: 'deleteAllLabel',
      type: 'text',
      label: 'Delete All Label',
      defaultValue: 'Usuń wszystkie',
      required: true,
    },

    // ===== INDIVIDUAL INPUT FIELDS =====
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name Placeholder',
      defaultValue: 'Nazwa firmy',
    },

    {
      name: 'email',
      type: 'text',
      label: 'Email Placeholder',
      defaultValue: 'Adres email',
    },
    {
      name: 'nip',
      type: 'text',
      label: 'NIP Placeholder',
      defaultValue: 'NIP',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website Placeholder',
      defaultValue: 'Strona www',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City Placeholder',
      defaultValue: 'Miasto',
    },
    {
      name: 'completionDatePlaceholder',
      type: 'text',
      label: 'Completion Date Placeholder',
      defaultValue: 'Termin realizacji MM / RR',
    },
    {
      name: 'projectsPerYearPlaceholder',
      type: 'text',
      label: 'Projects Per Year',
      defaultValue: 'Liczba projektów rocznie',
    },

    // ===== INDIVIDUAL SELECT FIELDS =====
    {
      name: 'projectTypePlaceholder',
      type: 'text',
      label: 'Project Type Placeholder',
      defaultValue: 'Typ projektu',
    },
    {
      name: 'projectTypeOptions',
      type: 'array',
      label: 'Project Type Options',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'Mieszkanie' },
        { label: 'Dom' },
        { label: 'Hotel' },
        { label: 'Restauracja' },
        { label: 'Biuro' },
      ],
    },

    {
      name: 'projectAreaPlaceholder',
      type: 'text',
      label: 'Project Area Placeholder',
      defaultValue: 'Powierzchnia projektu',
    },
    {
      name: 'projectAreaOptions',
      type: 'array',
      label: 'Project Area Options',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      defaultValue: [
        { label: '0-100 m²' },
        { label: '100-500 m²' },
        { label: '500-2000 m²' },
        { label: '2000 m² i więcej' },
      ],
    },
    {
      name: 'projectBudgetPlaceholder',
      type: 'text',
      label: 'Project Budget Placeholder',
      defaultValue: 'Budżet projektu',
    },
    {
      name: 'projectBudgetOptions',
      type: 'array',
      label: 'Project Budget Options',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'do 100 tys. zł' },
        { label: '100–300 tys. zł' },
        { label: '300–700 tys. zł' },
        { label: '700 tys.–1,5 mln zł' },
        { label: 'powyżej 1,5 mln zł' },
        { label: 'jeszcze nie wiem' },
      ],
    },
    {
      name: 'projectStagePlaceholder',
      type: 'text',
      label: 'Project Stage Placeholder',
      defaultValue: 'Etap projektu',
    },
    {
      name: 'projectStageOptions',
      type: 'array',
      label: 'Project Stage Options',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'koncepcja' },
        { label: 'projekt wykonawczy' },
        { label: 'realizacja' },
      ],
    },
    // ===== CONSENT CHECKBOX =====
    {
      name: 'consentText',
      type: 'richText',
      label: 'Consent Text',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
    },
    {
      name: 'consentText2',
      type: 'richText',
      label: 'Consent Text 2',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
    },
  ],
}
