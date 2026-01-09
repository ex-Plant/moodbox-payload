'use client'

import { useState } from 'react'
import { sendScheduledEmail } from '@/lib/shopify/webhooks/sendScheduledEmail'
import { Button } from './ui/button'
import { ErrorMessage } from './ErrorMessage'
export default function TriggerSendingScheduledEmails() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  async function triggerSend() {
    try {
      setLoading(true)
      const results = await sendScheduledEmail(100)
      console.log(`✅ ok`, {
        processed: results.length,
        details: results,
      })
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    }
  }

  return (
    <>
      <Button isLoading={loading} onClick={triggerSend}>
        Wyślij ręcznie
      </Button>
      {success && <p style={{ color: '#16a34a' }}>Wiadomości zostały wysłane</p>}

      <div>
        <p>
          ℹ️ Używaj tylko w przypadku problemów z wysyłką aby spróbować wysłać wiadomosci do
          użytkowników gdzie zaplanowana data zostala przekroczona. Wiado
        </p>
        <p>Automatyczna wysylka zaplanowana jest na 16:00 każdego dnia.</p>
      </div>

      {error && <ErrorMessage />}
    </>
  )
}
