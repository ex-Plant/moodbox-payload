'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { inputSchemaT } from '../../Footer/NewsletterForm'
export default async function updateNewsLetter(data: inputSchemaT) {
  const payload = await getPayload({ config: configPromise })

  const emailExists = await payload.find({
    collection: 'newsletter',
    limit: 1,
    where: {
      email: {
        equals: data.email,
      },
    },
  })

  if (emailExists.docs.length > 0) throw new Error('Ten adres już znajduje się na liście !')

  await payload.create({
    collection: 'newsletter',
    data: data,
  })
}
