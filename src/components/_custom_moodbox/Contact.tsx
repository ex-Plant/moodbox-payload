'use client'

import { useAppForm } from '@/lib/hooks/tenStackFormHooks'
import FixedLoader from './FixedLoader'
import { useStore } from '@tanstack/react-form'
import { Button } from '../ui/button'
import { sendContactEmail } from '@/app/actions/sendContactEmail'
import { toastMessage, ToastPosition, ToastType } from '@/lib/toasts/toasts'
import { Delimiter } from '../Delimiter/Delimiter'
import { contactSchema, contactSchemaT } from '@/schemas/contactFormSchema'
import RichText from '@/components/RichText'
import type { ContactContent } from '@/payload-types'

export default function Contact({
  header,
  subjectPlaceholder,
  messagePlaceholder,
  emailPlaceholder,
  buttonText,
  richText,
}: Omit<ContactContent, 'id'>) {
  const form = useAppForm({
    defaultValues: {
      message: '',
      subject: '',
      email: '',
    },
    validators: {
      onSubmit: contactSchema,
    },

    onSubmit: async (data) => {
      const { error, message } = await sendContactEmail(data.value as contactSchemaT)

      console.log('Contact.tsx:32 - res:', message)
      if (!error) form.reset()

      toastMessage(
        message,
        error ? ToastType.Error : ToastType.Success,
        ToastPosition.BottomCenter,
        10000,
      )
    },
  })

  const isSubmitting = useStore(form.store, (s) => s.isSubmitting)

  return (
    <main className="mx-auto max-w-[1440px]  py-32  ">
      <Delimiter blockType={'delimiterBlock'} title={header} />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-6 w-[min(80vw,800px)] xPaddings pt-4 "
      >
        <form.AppField name="subject">
          {(field) => (
            <field.Input
              showError={true}
              placeholder={subjectPlaceholder}
              className={`border-none placeholder:text-muted-foreground`}
            />
          )}
        </form.AppField>
        <form.AppField name="message">
          {(field) => (
            <field.Textarea
              showError={true}
              className={`placeholder:text-muted-foreground min-h-[200px] px-4`}
              placeholder={messagePlaceholder}
            />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.Input
              showError={true}
              placeholder={emailPlaceholder}
              className={`border-none placeholder:text-muted-foreground`}
            />
          )}
        </form.AppField>
        <Button disabled={isSubmitting} className={`mt-8`} type="submit" variant="mood">
          {buttonText}
        </Button>
      </form>

      {richText && (
        <div className="w-[min(80vw,800px)] xPaddings pt-8">
          <RichText data={richText} enableGutter={false} />
        </div>
      )}

      <FixedLoader active={isSubmitting} />
    </main>
  )
}
