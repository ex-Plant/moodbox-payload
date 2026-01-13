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

    console.log(token, docId, linkedOrderDocId, isSurveyCompleted)

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

    const updateResult = await payload.update({
      collection: 'scheduled-emails',
      id: docId,
      data: { isSurveyCompleted: true },
    })

    if (!updateResult) {
      message = 'Ta ankieta została już wypełniona lub jest nieprawidłowa.'
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

    const submitData = {
      order: linkedOrderDocId,
      customer_email: customerEmail,
      completedAt: new Date().toISOString(),
      considered_brands: validatedData.data.considered_brands,
      rejected_brand: validatedData.data.rejected_brand,
      brand_evaluations: Object.entries(validatedData.data.brand_evaluations).map(
        ([brand_name, evaluation]) => ({
          brand_name,
          ...evaluation,
        }),
      ),
      rejection_reasons: validatedData.data.rejection_reasons,
      rejection_other: validatedData.data.rejection_other,
      contact_request: validatedData.data.contact_request,
      contact_brands: validatedData.data.contact_brands,
      missing_brands: validatedData.data.missing_brands,
      improvement_suggestion: validatedData.data.improvement_suggestion,
    }

    // console.log('submitSurveyA.ts:107 - ######:')
    // console.dir(submitData, { depth: 4 })

    await payload.create({
      collection: 'survey-responses',
      data: submitData,
    })

    // Update Order to have survey flag
    await payload.update({
      collection: 'orders',
      id: linkedOrderDocId as string | number,
      data: { hasSurvey: true },
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
      console.dir(data, { depth: 10 })
    }
    console.error('Error submitting survey:', error)

    // Rollback survey status if it was updated but something failed later
    if (docIdToRollback) {
      try {
        const payload = await getPayload({ config: configPromise })
        await payload.update({
          collection: 'scheduled-emails',
          id: docIdToRollback,
          data: { isSurveyCompleted: false },
        })
        console.log('isSurveyCompleted set back to false ')
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
