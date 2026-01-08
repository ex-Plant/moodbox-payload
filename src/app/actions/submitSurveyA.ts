'use server'

import { surveySchema, SurveySchemaT } from '@/lib/SurveySchema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildDiscountCodeEmail } from '../../utilities/email_templates/buildDiscountCodeEmail'
import { createDiscountA } from './createDiscountA'
import { checkSurveyStatus } from './checkSurveyStatus'

export async function submitSurveyA(data: SurveySchemaT, token: string) {
  try {
    // Validate the data on the server
    const validatedData = surveySchema.safeParse(data)

    if (!validatedData.success) {
      console.error('Survey validation failed for token:', token, {
        errors: validatedData.error.issues,
      })
      return {
        error: true,
        message: 'Nieprawidłowe dane formularza.',
      }
    }

    const { docId, customerEmail } = await checkSurveyStatus(token)
    const payload = await getPayload({ config: configPromise })

    console.log('Survey submitted successfully for token:', token, validatedData.data)

    // Gerenate code first if the rest of logic fails after 30 days it will expire anyway
    const generatedDiscount = await createDiscountA()

    if (!generatedDiscount) {
      return {
        error: true,
        message: 'Wystąpił błąd podczas generowania kodu.',
      }
    }

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

    const { subject, html } = buildDiscountCodeEmail(generatedDiscount)

    // Send email code to the user
    await payload.sendEmail({
      to: customerEmail,
      subject,
      // text: '',
      html,
    })

    return {
      error: false,
      message: 'Ankieta została wysłana pomyślnie.',
      generatedDiscount,
    }
  } catch (error) {
    console.error('Error submitting survey:', error)
    return {
      error: true,
      message: 'Wystąpił błąd podczas wysyłania ankiety - spróbuj ponownie.',
    }
  }
}
