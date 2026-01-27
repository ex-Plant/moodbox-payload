'use client'

import { useState } from 'react'

type Webhook = {
  id: number
  address: string
  topic: string
  format: string
  created_at: string
  updated_at: string
}

export default function WebhookManager() {
  const [deleteResult, setDeleteResult] = useState<string>('')
  const [createResult, setCreateResult] = useState<string>('')
  const [webhooksList, setWebhooksList] = useState<Webhook[]>([])
  const [isLoading, setIsLoading] = useState({
    test: false,
    delete: false,
    create: false,
    list: false,
  })

  async function deleteWebhook(formData: FormData) {
    const webhookId = formData.get('webhookId') as string
    // alert(webhookId)
    if (!webhookId) return

    setIsLoading((prev) => ({ ...prev, delete: true }))
    setDeleteResult('')

    try {
      const response = await fetch(`/api/webhooks/delete/${webhookId}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      setDeleteResult(JSON.stringify(result, null, 2))
    } catch (error) {
      setDeleteResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }))
    }
  }

  async function createWebhook(formData: FormData) {
    const topic = formData.get('topic') as string
    const address = formData.get('address') as string
    if (!topic || !address) return

    setIsLoading((prev) => ({ ...prev, create: true }))
    setCreateResult('')

    try {
      const response = await fetch('/api/webhooks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          address,
          format: 'json',
        }),
      })

      const result = await response.json()
      setCreateResult(JSON.stringify(result, null, 2))
    } catch (error) {
      setCreateResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading((prev) => ({ ...prev, create: false }))
    }
  }

  async function loadWebhooks() {
    setIsLoading((prev) => ({ ...prev, list: true }))

    try {
      const response = await fetch('/api/webhooks/list')
      const result = await response.json()

      if (result.webhooks) {
        setWebhooksList(result.webhooks)
      } else {
        setWebhooksList([])
      }
    } catch (error) {
      console.error('Error loading webhooks:', error)
      setWebhooksList([])
    } finally {
      setIsLoading((prev) => ({ ...prev, list: false }))
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shopify Webhook Management</h1>

      {/* List Webhooks */}
      <div className="border rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Webhook List</h2>
          <button
            onClick={loadWebhooks}
            disabled={isLoading.list}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading.list ? 'Loading...' : 'Load Webhooks'}
          </button>
        </div>

        {webhooksList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Topic</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                </tr>
              </thead>
              <tbody>
                {webhooksList.map((webhook) => (
                  <tr key={webhook.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{webhook.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{webhook.topic}</td>
                    <td className="border border-gray-300 px-4 py-2 break-all">
                      {webhook.address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{webhook.format}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(webhook.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No webhooks loaded. Click "Load Webhooks" to fetch the list.
          </p>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-1">
        {/* Delete Webhook */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Delete Webhook</h2>
          <form action={deleteWebhook} className="space-y-4">
            <div>
              <label htmlFor="delete-webhook-id" className="block text-sm font-medium mb-2">
                Webhook ID
              </label>
              <input
                id="delete-webhook-id"
                name="webhookId"
                type="text"
                placeholder="e.g., 2093890077019"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading.delete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading.delete ? 'Deleting...' : 'Delete Webhook'}
            </button>
          </form>
          {deleteResult && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{deleteResult}</pre>
            </div>
          )}
        </div>

        {/* Create Webhook */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create Webhook</h2>
          <form action={createWebhook} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium mb-2">
                Topic
              </label>
              <input
                id="topic"
                name="topic"
                type="text"
                placeholder="e.g., orders/create, products/update, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Address (URL)
              </label>
              <input
                id="address"
                name="address"
                type="url"
                placeholder="https://www.your-domain.com/api/webhooks/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading.create}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading.create ? 'Creating...' : 'Create Webhook'}
            </button>
          </form>
          {createResult && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{createResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
