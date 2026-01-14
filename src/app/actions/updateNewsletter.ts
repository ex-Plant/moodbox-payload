'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { inputSchemaT } from '../../components/Footer/NewsletterForm'
export default async function updateNewsLetter(data: inputSchemaT) {
  try {
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

    if (emailExists.docs.length > 0) {
      return {
        error: true,
        message: 'Ten adres już znajduje się na liście !',
      }
    }

    await payload.create({
      collection: 'newsletter',
      data: data,
    })

    return {
      error: false,
      message: `✌️ Dzięki - email zapisany`,
    }
  } catch (e) {
    console.error(e)
    return {
      error: false,
      message: 'Coś poszło nie tak',
    }
  }
}
