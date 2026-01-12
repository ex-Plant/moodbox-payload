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

    const { docId, customerEmail, linkedOrderDocId } = await checkSurveyStatus(token)
    const payload = await getPayload({ config: configPromise })

    if (!linkedOrderDocId) {
      console.error('Scheduled email has no linked Order for token:', token)
      return {
        error: true,
        message: 'Błąd powiązania zamówienia.',
      }
    }

    console.log('Survey submitted successfully for token:', token, validatedData.data)

    const {
      considered_brands,
      rejected_brand,
      brand_evaluations,
      rejection_reasons,
      rejection_other,
      contact_request,
      contact_brands,
      missing_brands,
      improvement_suggestion,
    } = validatedData.data

    // Gerenate code first if the rest of logic fails after 30 days it will expire anyway
    const generatedDiscount = await createDiscountA()

    if (!generatedDiscount) {
      return {
        error: true,
        message: 'Wystąpił błąd podczas generowania kodu.',
      }
    }

    // Update the document to mark it as completed
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

    // Create Survey Response
    await payload.create({
      collection: 'survey-responses',
      data: {
        order: linkedOrderDocId,
        customer_email: customerEmail,
        completedAt: new Date().toISOString(),
        considered_brands,
        rejected_brand,
        brand_evaluations: Object.entries(brand_evaluations).map(([brand_name, evaluation]) => ({
          brand_name,
          ...evaluation,
        })),
        rejection_reasons,
        rejection_other,
        contact_request,
        contact_brands,
        missing_brands,
        improvement_suggestion,
      },
    })

    // Update Order to have survey flag
    await payload.update({
      collection: 'orders',
      id: linkedOrderDocId as string | number,
      data: {
        hasSurvey: true,
      },
    })

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
