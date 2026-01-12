'use server'

import { surveySchema, SurveySchemaT } from '@/lib/SurveySchema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildDiscountCodeEmail } from '../../utilities/email_templates/buildDiscountCodeEmail'
import { createDiscountA } from './createDiscountA'
import { checkSurveyStatus } from './checkSurveyStatus'

export async function submitSurveyA(data: SurveySchemaT, token: string) {
  let message = 'Wystąpił błąd podczas wysyłania ankiety - spróbuj ponownie.'
  let docIdToRollback: string | number | undefined

  try {
    // Validate the data on the server
    const validatedData = surveySchema.safeParse(data)

    if (!validatedData.success) {
      console.error({ errors: validatedData.error.issues })
      message = 'Nieprawidłowe dane formularza.'
      throw new Error(message)
    }

    const { docId, customerEmail, linkedOrderDocId, isSurveyCompleted } =
      await checkSurveyStatus(token)

    console.log('submitSurveyA.ts:11 - token:', token, 'docId:', docId)

    docIdToRollback = docId

    if (isSurveyCompleted) {
      message = 'Ta ankieta została już wypełniona'
      return {
        error: true,
        message,
      }
    }

    const payload = await getPayload({ config: configPromise })

    if (!linkedOrderDocId) {
      return {
        error: true,
        message: 'Błąd powiązania zamówienia',
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

    // If the array is empty, the document was either not found or already completed.
    if (updateResult.docs.length === 0) {
      message = 'Ta ankieta została już wypełniona.'
      return {
        message,
        error: true,
      }
    }

    const generatedDiscount = await createDiscountA()

    if (!generatedDiscount) {
      message = 'Wystąpił błąd podczas generowania kodu.'
      throw new Error(message)
    }

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

    const submitData = {
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
    }

    // console.log('submit data:', JSON.stringify(submitData, null, 2))
    // console.log('submitSurveyA.ts:107 - ######:')
    console.dir(submitData, {
      depth: 4,
    })

    // Create Survey Response
    await payload.create({
      collection: 'survey-responses',
      data: submitData,
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
      html,
    })

    message = 'Ankieta została wysłana pomyślnie.'

    return {
      error: false,
      message,
      generatedDiscount,
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'data' in error) {
      console.dir(data)
    }
    console.error('Error submitting survey:', error)

    // Rollback survey status if it was updated but something failed later
    if (docIdToRollback) {
      try {
        const payload = await getPayload({ config: configPromise })
        await payload.update({
          collection: 'scheduled-emails',
          id: docIdToRollback,
          data: {
            isSurveyCompleted: false,
          },
        })
      } catch (rollbackError) {
        console.error('Failed to rollback survey status:', rollbackError)
      }
    }

    return {
      error: true,
      message,
    }
  } finally {
    console.log(message)
  }
}
