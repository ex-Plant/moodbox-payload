import { getPayload } from 'payload'
import configPromise from '@payload-config'
export async function checkSurveyStatus(token: string) {
  const payload = await getPayload({ config: configPromise })

  const emailResult = await payload.find({
    collection: 'scheduled-emails',
    limit: 1,
    where: {
      token: { equals: token },
    },
  })

  if (emailResult.docs.length < 1) throw new Error('Nieprawidłowy lub wygasły token.')

  const doc = emailResult.docs[0]

  return {
    orderId: doc.orderId,
    docId: doc.id,
    isSurveyCompleted: doc.isSurveyCompleted,
  }
}
