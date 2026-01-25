import { checkAuth } from '@/utilities/checkAuth'
import WebhookManager from '@/components/WebhookManager'

export default async function WebhooksPage() {
  // Check authentication server-side
  const isAuthenticated = await checkAuth()

  // Show access denied if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="border rounded-lg p-6 bg-red-50 border-red-200">
          <h1 className="text-2xl font-bold mb-4 text-red-800">Access Denied</h1>
          <p className="text-red-700 mb-4">
            You must be logged in to the admin panel to access webhooks
          </p>
        </div>
      </div>
    )
  }

  // Show authenticated content
  return <WebhookManager />
}
