import { useAppForm } from '@/lib/hooks/tenStackFormHooks'
import z from 'zod'
import { toastMessage, ToastPosition, ToastType } from '../lib/toasts/toasts'
import updateNewsLetter from '../app/actions/updateNewsletter'
import { useStore } from '@tanstack/react-form'
import { useState } from 'react'
import { wait } from 'payload/shared'

const inputSchema = z.object({
  email: z.string().min(1),
})

export type inputSchemaT = z.infer<typeof inputSchema>

export default function NewsletterForm() {
  const [submissionBlocked, setSubmissionBlocked] = useState(false)

  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: inputSchema,
    },
    onSubmit: async (data) => {
      setSubmissionBlocked(true)
      const { error, message } = await updateNewsLetter(data.value)

      toastMessage(
        message,
        error ? ToastType.Success : ToastType.Error,
        ToastPosition.BottomCenter,
        5000,
      )

      // Rate limiting check
      await wait(5000)
      setSubmissionBlocked(false)
    },
  })

  const isSubmitting = useStore(form.store, (s) => s.isSubmitting) || submissionBlocked

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={`flex items-center border-b border-mood-brown w-fit xl:w-full  🍆`}
    >
      <form.AppField name="email">
        {(field) => {
          return (
            <>
              <field.Input
                className={`bg-transparent border-none text-mood-dark-brown  placeholder:text-mood-dark-brown placeholder:text-base text-base w-[200px] xl:w-full focus-visible:border-none shadow-none focus-visible:ring-0 selection:bg-mood-brown pl-0 xl:pl-2 `}
                type={`email`}
                placeholder={'Adres email'}
              />
            </>
          )
        }}
      </form.AppField>
      <button
        disabled={isSubmitting}
        type="submit"
        className="whitespace-nowrap border-l px-4 border-mood-brown "
      >
        {isSubmitting ? 'Zapisuje' : 'Zapisz się'}
      </button>
    </form>
  )
}
