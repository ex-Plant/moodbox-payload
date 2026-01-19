'use client'

import React, { useState } from 'react'
import { Button, toast } from '@payloadcms/ui'
import { syncOrdersA } from '@/app/actions/syncOrdersA'

export default function SyncOrdersButton() {
  // This was for testing but I am also leaving it just in case we need to sync for some reason

  return null
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    if (isSyncing) return
    setIsSyncing(true)
    const t = toast.info('Synchronizacja zamówień z Shopify...')

    try {
      const result = await syncOrdersA()
      toast.dismiss(t)

      if (result.success) {
        toast.success(`Zsynchronizowano ${result.count} zamówień!`)
        // Refresh the page to show new data
        window.location.reload()
      } else {
        toast.error(`Błąd synchronizacji: ${result.error}`)
      }
    } catch (error) {
      toast.dismiss(t)
      toast.error('Wystąpił nieoczekiwany błąd podczas synchronizacji.')
      console.error(error)
    } finally {
      setIsSyncing(false)
    }
  }

  //todo hide this
  return (
    <div>
      <Button onClick={handleSync} disabled={isSyncing} buttonStyle="secondary">
        {isSyncing ? 'Synchronizowanie...' : 'Synchronizuj z Shopify'}
      </Button>
    </div>
  )
}
