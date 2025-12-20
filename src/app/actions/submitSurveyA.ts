'use server'

import { surveySchema, SurveySchemaT } from '@/lib/SurveySchema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

    const payload = await getPayload({ config: configPromise })

    // 1. Find the scheduled email by token
    const emailResult = await payload.find({
      collection: 'scheduled-emails',
      limit: 1,
      where: {
        token: { equals: token },
      },
    })

    if (emailResult.docs.length < 1) {
      return {
        error: true,
        message: 'Nieprawidłowy lub wygasły token.',
      }
    }

    const doc = emailResult.docs[0]

    if (doc.isSurveyCompleted) {
      return {
        error: true,
        message: 'Ta ankieta została już wypełniona.',
      }
    }

    // 2. Update the document to mark it as completed
    await payload.update({
      collection: 'scheduled-emails',
      id: doc.id,
      data: {
        isSurveyCompleted: true,
      },
    })

    // TODO: Save survey results to a separate collection if needed
    console.log('Survey submitted successfully for token:', token, validatedData.data)

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
