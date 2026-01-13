import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, expect, vi, afterAll } from 'vitest'
import { submitSurveyA } from '@/app/actions/submitSurveyA'

// Mock createDiscountA to avoid Shopify calls
vi.mock('@/app/actions/createDiscountA', () => ({
  createDiscountA: vi.fn().mockResolvedValue('TEST-DISCOUNT-CODE'),
}))

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    // Mock sendEmail to avoid actual email sending
    payload.sendEmail = vi.fn().mockResolvedValue({
      messageId: 'test-email-id',
      envelope: { from: 'test', to: ['test'] },
      accepted: ['test'],
      rejected: [],
      pending: [],
      response: 'ok',
    })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('completes the full survey flow: Order -> ScheduledEmail -> SurveyResponse', async () => {
    const orderId = `TEST-ORDER-${Date.now()}`
    const token = `TEST-TOKEN-${Date.now()}`
    const email = 'test@example.com'

    // 1. Create Order
    const order = await payload.create({
      collection: 'orders',
      data: {
        id: orderId,
        email: email,
        company_name: 'Test Company',
      },
    })
    expect(order.id).toBe(orderId)
    expect(order.hasSurvey).toBe(false)

    // 2. Create ScheduledEmail linked to Order
    const scheduledEmail = await payload.create({
      collection: 'scheduled-emails',
      data: {
        linkedOrder: order.id,
        customerEmail: email,
        token: token,
        scheduledAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 1000000).toISOString(),
        status: 'pending',
        emailType: 'post_purchase_questions',
      },
    })
    expect(scheduledEmail.id).toBeDefined()

    // 3. Submit Survey
    const surveyData = {
      considered_brands: ['Brand A'],
      brand_evaluations: {
        'Brand A': {
          rating: 5,
          reasons: ['quality', 'price'],
        },
      },
      contact_request: false,
    }

    const result = await submitSurveyA(surveyData, token)

    // 4. Verify Result
    expect(result.error).toBe(false)
    expect(result.generatedDiscount).toBe('TEST-DISCOUNT-CODE')

    // 5. Verify ScheduledEmail is completed
    const updatedEmail = await payload.findByID({
      collection: 'scheduled-emails',
      id: scheduledEmail.id,
    })
    expect(updatedEmail.isSurveyCompleted).toBe(true)

    // 6. Verify Order has hasSurvey: true
    const updatedOrder = await payload.findByID({
      collection: 'orders',
      id: order.id,
    })
    expect(updatedOrder.hasSurvey).toBe(true)

    // 7. Verify SurveyResponse exists
    const responses = await payload.find({
      collection: 'survey-responses',
      where: {
        order: { equals: order.id },
      },
    })
    expect(responses.totalDocs).toBe(1)
    const responseDoc = responses.docs[0]
    expect(responseDoc.customer_email).toBe(email)
    expect(responseDoc.considered_brands).toEqual(surveyData.considered_brands)
    expect(responseDoc.brand_evaluations).toEqual([
      {
        brand_name: 'Brand A',
        rating: 5,
      },
    ])
    expect(responseDoc.contact_request).toBe(false)
  })
})
