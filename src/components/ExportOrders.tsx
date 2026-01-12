'use client'

import handleFileDownload from '@/utilities/handleFileDownload'
import { useState } from 'react'
import { ErrorMessage } from './ErrorMessage'
import { Button } from '@payloadcms/ui'

export default function ExportOrders() {
  const [error, setError] = useState(false)

  async function exportOrders() {
    setError(false)
    try {
      await handleFileDownload('/api/export/orders', 'Zamówienia')
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  return (
    <>
      <Button onClick={exportOrders}>Eksportuj</Button>
      {error && <ErrorMessage />}
    </>
  )
}
