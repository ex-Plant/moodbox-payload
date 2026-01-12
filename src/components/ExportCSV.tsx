'use client'

import handleFileDownload from '@/utilities/handleFileDownload'
import { useState } from 'react'
import { ErrorMessage } from './ErrorMessage'
import { Button } from '@payloadcms/ui'

type PropsT = {
  route: string
  fileTitle: string
}
export default function ExportCSV({ route, fileTitle }: PropsT) {
  const [error, setError] = useState(false)

  async function exportOrders() {
    setError(false)
    try {
      await handleFileDownload(route, fileTitle)
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
