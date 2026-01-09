'use client'

import { useState } from 'react'
import { sendEmailsManually, sendScheduledEmail } from '@/lib/shopify/webhooks/sendScheduledEmail'
import { Button } from './ui/button'
import { ErrorMessage } from './ErrorMessage'
import { useSelection } from '@payloadcms/ui'

export default function TriggerSendingScheduledEmails() {
  const { selected } = useSelection()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const selectedIds = Array.from(selected.entries())
    .filter(([_, checked]) => checked)
    .map(([id]) => String(id))

  const selectedCount = selectedIds.length

  async function triggerSend() {
    console.log('TriggerSendingScheduledEmails.tsx:24 - triggerSend 🍆:')
    try {
      setError(null)
      setLoading(true)

      if (selectedCount === 0) throw new Error('Wybierz przynajmniej jedną wiadomość do wysłania')

      const results = await sendEmailsManually({ ids: selectedIds })

      console.log(`✅ ok`, {
        processed: results.length,
        details: results,
      })

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (e) {
      console.error(e)
      setError(e instanceof Error ? e.message : 'Wystąpił błąd podczas wysyłania wiadomości')
    } finally {
      setLoading(false)
    }
  }

  // console.log('TriggerSendingScheduledEmails.tsx:47 - selected:', selected)

  return (
    <div className="flex flex-col gap-4 my-4 p-4 border rounded">
      <div className="flex items-center gap-4">
        <Button isLoading={loading} onClick={triggerSend} disabled={selectedCount === 0}>
          {selectedCount > 0
            ? `Wyślij do wybranych (${selectedCount})`
            : 'Wybierz wiadomości do wysłania'}
        </Button>
        {success && <p className="text-green-600 font-medium">Wiadomości zostały wysłane</p>}
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        {selectedCount === 0 && (
          <p>
            ℹ️ Używaj tylko w przypadku problemów z wysyłką aby spróbować wysłać wiadomości do
            użytkowników gdzie zaplanowana data została przekroczona.
          </p>
        )}
        {selectedCount === 0 && (
          <p>Automatyczna wysyłka zaplanowana jest pomiędzy 16:00 a 17:00 każdego dnia.</p>
        )}
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  )
}
