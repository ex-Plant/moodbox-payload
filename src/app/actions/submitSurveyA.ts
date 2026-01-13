'use server'

import { surveySchema, SurveySchemaT } from '@/lib/SurveySchema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildDiscountCodeEmail } from '../../utilities/email_templates/buildDiscountCodeEmail'
import { createDiscountA } from './createDiscountA'
import { checkSurveyStatus } from './checkSurveyStatus'

export async function submitSurveyA(data: SurveySchemaT, token: string) {
  console.log('>>> submitSurveyA called with token:', token)
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

    console.log(
      'submitSurveyA.ts:11 - token:',
      token,
      'docId:',
      docId,
      'linkedOrderDocId:',
      linkedOrderDocId,
      'isCompleted:',
      isSurveyCompleted,
    )

    docIdToRollback = docId

    if (isSurveyCompleted) {
      console.log(`isSurveyCompleted ❗️`)
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

    const allScheduledEmails = await payload.find({
      collection: 'scheduled-emails',
      limit: 0,
    })
    console.dir(allScheduledEmails, { depth: 10 })

    // Atomic update using updateByID
    // We must re-supply the linkedOrder to ensure validation passes if the existing data is considered "invalid" by Payload's strict check
    const updateResult = await payload.update({
      collection: 'scheduled-emails',
      id: docId,
      data: {
        isSurveyCompleted: true,
        // Explicitly cast to string to satisfy the text-based ID of Orders
        // linkedOrder: String(linkedOrderDocId),
      },
      // overrideAccess: true,
    })

    // Let's use the explicit 'update' with ID which returns the doc directly in Local API
    if (!updateResult) {
      console.error('Update failed: Document not found or update returned null.')
      message = 'Ta ankieta została już wypełniona lub jest nieprawidłowa.'
      return {
        message,
        error: true,
      }
    }

    // If we used payload.update({ where: ... }), it returns { docs: [] }
    // If we use payload.update({ id: ... }), it returns the doc.
    // Let's adjust the check.
    console.log('Update result ID:', updateResult.id)

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
      draft: false,
      // overrideAccess: true,
    })

    // Update Order to have survey flag
    await payload.update({
      collection: 'orders',
      id: linkedOrderDocId as string | number,
      data: {
        hasSurvey: true,
      },
      // overrideAccess: true,
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
    // if (docIdToRollback) {
    //   try {
    //     const payload = await getPayload({ config: configPromise })
    //     await payload.update({
    //       collection: 'scheduled-emails',
    //       id: docIdToRollback,
    //       data: {
    //         isSurveyCompleted: false,
    //       },
    //       overrideAccess: true,
    //     })
    //   } catch (rollbackError) {
    //     console.error('Failed to rollback survey status:', rollbackError)
    //   }
    // }

    return {
      error: true,
      message,
    }
  } finally {
    console.log(message)
  }
}
