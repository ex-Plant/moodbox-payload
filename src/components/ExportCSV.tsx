'use client'

import handleFileDownload from '@/utilities/handleFileDownload'
import { useState } from 'react'
import { Button, toast } from '@payloadcms/ui'

type PropsT = {
  route: string
  fileTitle: string
}
export default function ExportCSV({ route, fileTitle }: PropsT) {
  const [isSyncing, setIsSyncing] = useState(false)

  async function exportOrders() {
    if (isSyncing) return
    setIsSyncing(true)
    const t = toast.info('Eksportuje...')

    try {
      await handleFileDownload(route, fileTitle)
      toast.success(`Wyeksportowano!`)
    } catch (e) {
      toast.dismiss(t)
      toast.error('Wystąpił nieoczekiwany błąd.')
      console.error(e)
    } finally {
      setIsSyncing(false)
    }
  }

  return <Button onClick={exportOrders}>Eksportuj</Button>
}
