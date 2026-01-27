import type { GlobalConfig } from 'payload'

import { revalidateSurveyContent } from './hooks/revalidateSurveyContent'

export const SurveyContent: GlobalConfig = {
  slug: 'survey-content',
  label: {
    pl: 'Treści ankiety',
    en: 'Survey Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Questions
    {
      name: 'questions',
      type: 'group',
      label: { pl: 'Pytania ankiety', en: 'Survey Questions' },
      fields: [
        {
          name: 'q1',
          type: 'group',
          label: 'Q1',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'q2',
          type: 'group',
          label: 'Q2',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'q3',
          type: 'group',
          label: 'Q3',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'q4',
          type: 'group',
          label: 'Q4',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'q5',
          type: 'group',
          label: 'Q5',
          admin: {
            description: 'Użyj {rejectedBrand} jako placeholder dla nazwy marki',
          },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'q6',
          type: 'group',
          label: 'Q6',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'q7',
          type: 'group',
          label: 'Q7',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'q8',
          type: 'group',
          label: 'Q8',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
          ],
        },
      ],
    },

    // Ratings (simplified - index+1 = rating value)
    {
      name: 'ratings',
      type: 'array',
      label: { pl: 'Skala ocen', en: 'Rating Scale' },
      minRows: 5,
      maxRows: 5,
      admin: {
        description: 'Kolejność = wartość oceny (pierwszy = 1, ostatni = 5)',
      },
      fields: [{ name: 'text', type: 'text', required: true }],
    },

    // Reasons
    {
      name: 'reasonsPositive',
      type: 'array',
      label: { pl: 'Powody pozytywne (Q4 rating >= 4)', en: 'Positive Reasons' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'reasonsNegative',
      type: 'array',
      label: { pl: 'Powody negatywne (Q4 rating < 4)', en: 'Negative Reasons' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'reasonsRejection',
      type: 'array',
      label: { pl: 'Powody odrzucenia (Q5)', en: 'Rejection Reasons' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },

    // UI Messages
    {
      name: 'uiMessages',
      type: 'group',
      label: { pl: 'Komunikaty UI', en: 'UI Messages' },
      fields: [
        // Toast messages
        {
          name: 'toasts',
          type: 'group',
          label: { pl: 'Powiadomienia', en: 'Toasts' },
          fields: [
            { name: 'maxBrandsSelected', type: 'text', required: true },
            { name: 'maxReasonsSelected', type: 'text', required: true },
            { name: 'selectAtLeastOneBrand', type: 'text', required: true },
          ],
        },

        // Form labels
        {
          name: 'formLabels',
          type: 'group',
          label: { pl: 'Etykiety formularza', en: 'Form Labels' },
          fields: [
            { name: 'selectBrandOptional', type: 'text', required: true },
            { name: 'noSuchBrandOption', type: 'text', required: true },
            { name: 'yourAnswerPlaceholder', type: 'text', required: true },
            { name: 'whichBrands', type: 'text', required: true },
            { name: 'specifyExactly', type: 'text', required: true },
          ],
        },

        // Question texts
        {
          name: 'questionTexts',
          type: 'group',
          label: { pl: 'Teksty pytań', en: 'Question Texts' },
          fields: [
            { name: 'positiveBrandQuestion', type: 'text', required: true },
            { name: 'negativeBrandQuestion', type: 'text', required: true },
            { name: 'selectMax2', type: 'text', required: true },
          ],
        },

        // Buttons
        {
          name: 'buttons',
          type: 'group',
          label: { pl: 'Przyciski', en: 'Buttons' },
          fields: [
            { name: 'yes', type: 'text', required: true },
            { name: 'no', type: 'text', required: true },
            { name: 'nextStep', type: 'text', required: true },
            { name: 'sendSurvey', type: 'text', required: true },
          ],
        },

        // Discount related
        {
          name: 'discount',
          type: 'group',
          label: { pl: 'Rabaty', en: 'Discount' },
          fields: [
            { name: 'welcomeDiscountTitle', type: 'text', required: true },
            { name: 'discountSuccessMessage', type: 'text', required: true },
            { name: 'discountFailureMessage', type: 'text', required: true },
          ],
        },

        // Dialog messages
        {
          name: 'dialog',
          type: 'group',
          label: { pl: 'Dialog końcowy', en: 'Completion Dialog' },
          fields: [
            { name: 'thankYouSurvey', type: 'text', required: true },
            { name: 'yourCodeIs', type: 'text', required: true },
            { name: 'sameCodeInEmail', type: 'text', required: true },
            { name: 'goToMoodbox', type: 'text', required: true },
          ],
        },

        // Terms
        {
          name: 'terms',
          type: 'group',
          label: { pl: 'Regulamin', en: 'Terms' },
          fields: [{ name: 'termsAcceptanceText', type: 'textarea', required: true }],
        },

        // Errors
        {
          name: 'errors',
          type: 'group',
          label: { pl: 'Błędy', en: 'Errors' },
          fields: [{ name: 'fixErrorsBeforeSending', type: 'text', required: true }],
        },

        // Header
        {
          name: 'header',
          type: 'group',
          label: { pl: 'Nagłówek', en: 'Header' },
          fields: [
            { name: 'welcomeMessage', type: 'text', required: true },
            { name: 'surveyTitle', type: 'text', required: true },
            { name: 'surveyDescription', type: 'textarea', required: true },
            { name: 'stepLabel', type: 'text', required: true },
            { name: 'stepSeparator', type: 'text', required: true },
            { name: 'totalSteps', type: 'text', required: true },
          ],
        },

        // Survey completed page
        {
          name: 'completed',
          type: 'group',
          label: { pl: 'Ankieta wypełniona', en: 'Survey Completed' },
          fields: [
            { name: 'surveyAlreadyCompletedTitle', type: 'text', required: true },
            { name: 'surveyAlreadyCompletedThankYou', type: 'text', required: true },
            { name: 'surveyAlreadyCompletedInstructions', type: 'textarea', required: true },
            { name: 'contactEmail', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSurveyContent],
  },
}
