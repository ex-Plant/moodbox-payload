'use client'

import handleFileDownload from '@/utilities/handleFileDownload'
import { useState } from 'react'
export default function DownloadClients() {
  const [error, setError] = useState(false)
  async function exportClients() {
    setError(false)
    try {
      handleFileDownload('/api/export/clients', 'Lista klientów')
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  return (
    <>
      <button onClick={exportClients}>Eksportuj listę klientów</button>
      {!error && <p style={{ color: '#dc2626' }}>Coś poszło nie tak - spróbuj ponownie </p>}
    </>
  )
}
