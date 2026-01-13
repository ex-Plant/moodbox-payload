'use client'

import { useState } from 'react'
import { sendEmailsManually } from '@/lib/shopify/webhooks/sendScheduledEmail'
import { Button, useSelection, toast } from '@payloadcms/ui'

export default function TriggerSendingScheduledEmails() {
  const { selected } = useSelection()
  const [isSyncing, setIsSyncing] = useState(false)

  const selectedIds = Array.from(selected.entries())
    .filter(([_, checked]) => checked)
    .map(([id]) => String(id))

  const selectedCount = selectedIds.length

  async function triggerSend() {
    if (isSyncing) return
    setIsSyncing(true)

    const t = toast.info('Wysyłanie...')
    try {
      if (selectedCount === 0) throw new Error('Wybierz przynajmniej jedną wiadomość do wysłania')
      const results = await sendEmailsManually({ ids: selectedIds })

      console.log(`✅ ok`, {
        processed: results.length,
        details: results,
      })
      toast.success(`Wysłano`)
      window.location.reload()
    } catch (e) {
      console.error(e)
      toast.dismiss(t)
      const message = e instanceof Error ? e.message : 'Wystąpił błąd podczas wysyłania wiadomości'
      toast.error(message)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div>
      <Button onClick={triggerSend} disabled={selectedCount === 0}>
        {selectedCount > 0
          ? `Wyślij do wybranych (${selectedCount})`
          : 'Wybierz wiadomości do wysłania'}
      </Button>

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
