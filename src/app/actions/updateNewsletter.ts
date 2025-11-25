'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { inputSchemaT } from '../../Footer/NewsletterForm'
export default async function updateNewsLetter(data: inputSchemaT) {
  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'clients',
    data: data,
  })
}
