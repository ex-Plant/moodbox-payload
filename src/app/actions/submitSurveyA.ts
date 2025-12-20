'use server'

import { surveySchema, SurveySchemaT } from '@/lib/SurveySchema'

export async function submitSurveyA(data: SurveySchemaT) {
  try {
    // Validate the data on the server
    const validatedData = surveySchema.safeParse(data)

    if (!validatedData.success) {
      return {
        error: true,
        message: 'Nieprawidłowe dane formularza.',
        details: validatedData.error.flatten(),
      }
    }

    // TODO: Save to database or Shopify metafields
    console.log('Survey submitted successfully:', validatedData.data)

    // For now, we just return success
    return {
      error: false,
      message: 'Ankieta została wysłana pomyślnie.',
    }
  } catch (error) {
    console.error('Error submitting survey:', error)
    return {
      error: true,
      message: 'Wystąpił błąd podczas wysyłania ankiety.',
    }
  }
}
