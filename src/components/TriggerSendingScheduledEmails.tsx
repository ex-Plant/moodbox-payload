'use client'

import { useState } from 'react'
import { sendEmailsManually } from '@/lib/shopify/webhooks/sendScheduledEmail'
import { ErrorMessage } from './ErrorMessage'
import { Button, useSelection } from '@payloadcms/ui'

export default function TriggerSendingScheduledEmails() {
  const { selected } = useSelection()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const selectedIds = Array.from(selected.entries())
    .filter(([_, checked]) => checked)
    .map(([id]) => String(id))

  const selectedCount = selectedIds.length

  async function triggerSend() {
    console.log('TriggerSendingScheduledEmails.tsx:24 - triggerSend 🍆:')
    try {
      setError(null)

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
    }
  }

  // console.log('TriggerSendingScheduledEmails.tsx:47 - selected:', selected)

  return (
    <div>
      <Button onClick={triggerSend} disabled={selectedCount === 0}>
        {selectedCount > 0
          ? `Wyślij do wybranych (${selectedCount})`
          : 'Wybierz wiadomości do wysłania'}
      </Button>

      {error && <ErrorMessage message={error} />}

      {success && (
        <p
          style={{
            color: '#16a34a',
            fontWeight: '500',
            marginBottom: '8px',
          }}
        >
          Wiadomości zostały wysłane
        </p>
      )}

      <div>
        {selectedCount === 0 && (
          <p
            style={{
              marginBottom: '4px',
            }}
          >
            ℹ️ Używaj tylko w przypadku problemów z wysyłką aby spróbować wysłać wiadomości do
            użytkowników gdzie zaplanowana data została przekroczona.
          </p>
        )}
        {selectedCount === 0 && (
          <p>Automatyczna wysyłka zaplanowana jest pomiędzy 16:00 a 17:00 każdego dnia.</p>
        )}
      </div>
    </div>
  )
}
