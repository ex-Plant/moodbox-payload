import { checkAuth } from '@/utilities/checkAuth'
import WebhookManager from '@/components/WebhookManager'
import AccessDenied from '@/components/ui/access-denied'

export const dynamic = 'force-dynamic'

export default async function WebhooksPage() {
  // Check authentication server-side
  const isAuthenticated = await checkAuth()

  // Show access denied if not authenticated
  if (!isAuthenticated) {
    return <AccessDenied message="You must be logged in to the admin panel to access webhooks" />
  }

  // Show authenticated content
  return <WebhookManager />
}
