'use client'

import handleFileDownload from '@/utilities/handleFileDownload'
import { useState } from 'react'
import { ErrorMessage } from './ErrorMessage'
import { Button } from '@payloadcms/ui'

export default function DownloadNewsletterUsers() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function exportClients() {
    setError(false)
    setLoading(true)
    try {
      await handleFileDownload('/api/export/newsletter', 'Lista newsletter')
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={exportClients}>Eksportuj</Button>
      {!error && <ErrorMessage />}
    </>
  )
}
