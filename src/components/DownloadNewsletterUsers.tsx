'use client'

import handleFileDownload from '@/utilities/handleFileDownload'
import { useState } from 'react'
export default function DownloadNewsletterUsers() {
  const [error, setError] = useState(false)
  async function exportClients() {
    setError(false)
    try {
      handleFileDownload('/api/export/newsletter', 'Lista klientów')
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  return (
    <>
      <button onClick={exportClients}>Eksportuj</button>
      {error && <p style={{ color: '#dc2626' }}>Coś poszło nie tak - spróbuj ponownie </p>}
    </>
  )
}
