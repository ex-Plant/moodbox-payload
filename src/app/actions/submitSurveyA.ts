'use server'

import { surveySchema, SurveySchemaT } from '@/lib/SurveySchema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { checkSurveyStatus } from './checkSurveyStatus'

export async function submitSurveyA(data: SurveySchemaT, token: string) {
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

    const { docId } = await checkSurveyStatus(token)
    const payload = await getPayload({ config: configPromise })

    console.log('Survey submitted successfully for token:', token, validatedData.data)

    // 2. Update the document to mark it as completed

    const updateResult = await payload.update({
      collection: 'scheduled-emails',
      where: {
        id: { equals: docId },
        isSurveyCompleted: { not_equals: true },
      },
      data: {
        isSurveyCompleted: true,
      },
    })

    // When using 'where', update returns an object with a 'docs' array.
    // If the array is empty, the document was either not found or already completed.
    if (updateResult.docs.length === 0) {
      return {
        error: true,
        message: 'Ta ankieta została już wypełniona.',
      }
    }

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
