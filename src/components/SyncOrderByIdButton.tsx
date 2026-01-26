'use client'

import React, { useState } from 'react'
import { Button, toast } from '@payloadcms/ui'
import { syncOrderByIdA } from '@/app/actions/syncOrderByIdA'

export default function SyncOrderByIdButton() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [orderId, setOrderId] = useState('')

  const handleSync = async () => {
    if (!orderId) {
      toast.error('Wprowadź ID zamówienia')
      return
    }

    if (isSyncing) return
    setIsSyncing(true)
    const t = toast.info('Synchronizacja zamówienia...')

    try {
      const result = await syncOrderByIdA(orderId)
      toast.dismiss(t)

      if (result.success) {
        toast.success(result.message)
        setOrderId('')
        // Refresh the page to show new data if on list view
        window.location.reload()
      } else {
        toast.error(`Błąd: ${result.message}`)
      }
    } catch (error) {
      toast.dismiss(t)
      toast.error('Wystąpił nieoczekiwany błąd.')
      console.error(error)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div
      className="sync-order-by-id"
      style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
    >
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Shopify Order ID (np. 1234567890)"
        style={{
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid var(--theme-elevation-200)',
          background: 'var(--theme-elevation-0)',
          color: 'var(--theme-elevation-800)',
          height: '40px',
        }}
      />
      <Button onClick={handleSync} disabled={isSyncing} buttonStyle="secondary">
        {isSyncing ? 'Sync...' : 'Pobierz po ID'}
      </Button>
    </div>
  )
}
