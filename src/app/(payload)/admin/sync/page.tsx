import { checkAuth } from '@/utilities/checkAuth'
import SyncOrdersButton from '@/components/SyncOrdersButton'
import SyncOrderByIdButton from '@/components/SyncOrderByIdButton'
import AccessDenied from '@/components/ui/access-denied'

export const dynamic = 'force-dynamic'

export default async function SyncPage() {
  // Check authentication server-side
  const isAuthenticated = await checkAuth()

  // Show access denied if not authenticated
  if (!isAuthenticated) {
    return <AccessDenied />
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Synchronizacja Zamówień</h1>

      <div className="grid gap-8 md:grid-cols-1">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Masowa synchronizacja</h2>
          <p className="mb-4 text-gray-600">
            Pobierz ostatnie 50 zamówień z Shopify i zaktualizuj kolekcję zamówienia
          </p>
          <SyncOrdersButton />
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Synchronizacja po ID</h2>
          <p className="mb-4 text-gray-600">
            Pobierz konkretne zamówienie podając jego ID z Shopify (np. 58348234823) aby
            zsynchronizoawać kolekcję zamówień oraz zaplanowanych wiadomości
          </p>
          <SyncOrderByIdButton />
        </div>
      </div>
    </div>
  )
}
