'use server'

import { getPayload } from 'payload'
import payloadConfig from '../../payload.config'
import { contactSchema, contactSchemaT } from '../../schemas/contactFormSchema'
import { env } from '@/lib/env'

export async function sendContactEmail(data: contactSchemaT) {
  const payload = await getPayload({ config: payloadConfig })

  let message = 'Nie udało się wysłać wiadomości - spróbuj jeszcze raz.'

  try {
    const validatedData = contactSchema.safeParse(data)

    if (!validatedData.success) {
      console.error({ errors: validatedData.error.issues })
      message = 'Nieprawidłowe dane formularza.'
      throw new Error(message)
    }

    await payload.sendEmail({
      to: env.EMAIL_CONTACT_USER,
      replyTo: data.email,
      subject: `Moodbox kontakt: ${data.subject}`,
      text: `Od: ${data.email}\n\n${data.message}`,
    })

    return {
      error: false,
      message: 'Dziękujemy za wiadomość!',
    }
  } catch (e) {
    message = e instanceof Error ? e.message : message
    return {
      error: true,
      message,
    }
  }
}
