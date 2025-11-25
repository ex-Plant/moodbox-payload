'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { inputSchemaT } from '../../Footer/NewsletterForm'
export default async function updateNewsLetter(data: inputSchemaT) {
  const payload = await getPayload({ config: configPromise })

  const emails = await payload.find({
    collection: 'newsletter',
    limit: 1000,
  })

  const isInvalid = emails.docs.find((email) => data.email === email.email)
  if (isInvalid) throw new Error('Ten adres już znajduje się na liście !')

  await payload.create({
    collection: 'newsletter',
    data: data,
  })
}
