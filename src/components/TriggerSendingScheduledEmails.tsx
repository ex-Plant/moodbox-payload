'use client'

import { useState } from 'react'
import { sendScheduledEmail } from '@/lib/shopify/webhooks/sendScheduledEmail'
export default function TriggerSendingScheduledEmails() {
  const [error, setError] = useState(false)
  async function triggerSend() {
    try {
      const results = await sendScheduledEmail(1)

      console.log(`✅ ok`, {
        processed: results.length,
        details: results,
      })
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  return (
    <>
      <button onClick={triggerSend}>Wyślij ręcznie</button>

      <div>
        <p>
          ℹ️ Użyj aby wyslac wiadomosci do użytkowników gdzie zaplanowana data zostala przekroczona.
        </p>
        <p>Automatyczna wysylka zaplanowana jest na 16:00 każdego dnia.</p>
      </div>
      {error && <p style={{ color: '#dc2626' }}>Coś poszło nie tak - spróbuj ponownie </p>}
    </>
  )
}
