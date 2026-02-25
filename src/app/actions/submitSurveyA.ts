'use server'

import { surveySchema, SurveySchemaT } from '@/lib/SurveySchema'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildDiscountCodeEmail } from '../../utilities/email_templates/buildDiscountCodeEmail'
import { createDiscountA } from './createDiscountA'
import { checkSurveyStatus } from './checkSurveyStatus'
import { Order } from '../../payload-types'

type DiscountConfigT = {
  title: string
  percentage: number
}

export async function submitSurveyA(
  data: SurveySchemaT,
  token: string,
  discountConfig: DiscountConfigT,
) {
  try {
    const payload = await getPayload({ config: configPromise })

    const validatedData = validateSurveyData(data)
    const { docId, customerEmail, linkedOrderDocId, isSurveyCompleted } =
      await checkSurveyStatus(token)

    if (isSurveyCompleted) throw new Error('Ta ankieta została już wypełniona')
    if (!linkedOrderDocId) throw new Error('Błąd powiązania zamówienia')

    // Execute all DB writes in a transaction
    const transactionId = await payload.db.beginTransaction()
    if (!transactionId) throw new Error('Missing transaction Id')

    const req = { transactionID: transactionId }
    try {
      await payload.update({
        collection: 'scheduled-emails',
        id: docId,
        data: { isSurveyCompleted: true },
        req,
      })

      await payload.create({
        collection: 'survey-responses',
        data: buildSurveyResponseData(linkedOrderDocId, customerEmail, validatedData),
        req,
      })

      // Update Order to have survey flag
      await payload.update({
        collection: 'orders',
        id: linkedOrderDocId as string,
        data: { hasSurvey: true },
        req,
      })

      await payload.db.commitTransaction(transactionId)
    } catch (dbError: unknown) {
      await payload.db.rollbackTransaction(transactionId)
      throw dbError
    }

    // Generate discount AFTER successful commit
    const generatedDiscount = await createDiscountA(discountConfig)
    const emailContent = await payload.findGlobal({ slug: 'email-content' })
    const { subject, html } = buildDiscountCodeEmail(generatedDiscount, emailContent.discountCode)

    try {
      await payload.sendEmail({
        to: customerEmail,
        subject,
        html,
      })
    } catch (emailError) {
      console.error('Email delivery failed:', {
        error: emailError,
        customerEmail,
        discount: generatedDiscount,
      })
      // TODO: Add to retry queue
    }

    return {
      error: false,
      message: 'Ankieta została wysłana pomyślnie.',
      generatedDiscount,
    }
  } catch (error) {
    console.error('Error submitting survey:', error)
    console.dir(data, { depth: 10 })
    return {
      error: true,
      message:
        'Wystąpił błąd podczas wysyłania ankiety - spróbuj ponownie lub skontaktuj się z nami',
    }
  }
}

function buildSurveyResponseData(
  linkedOrderDocId: string | Order,
  customerEmail: string,
  validatedData: ReturnType<typeof validateSurveyData>,
) {
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

  return submitData
  // console.log('submitSurveyA.ts:107 - ######:')
  // console.dir(submitData, { depth: 4 })
}

function validateSurveyData(data: SurveySchemaT) {
  const validatedData = surveySchema.safeParse(data)
  if (!validatedData.success) {
    console.error({ errors: validatedData.error.issues })
    throw new Error('Nieprawidłowe dane formularza.')
  }
  return validatedData
}
