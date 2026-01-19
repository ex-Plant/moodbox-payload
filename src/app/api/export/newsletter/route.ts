import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Newsletter } from '@/payload-types'
import { escapeCSVValue } from '@/utilities/escapeCSVValue'
import { checkAuth } from '@/utilities/checkAuth'

const NEWSLETTER_FIELD_LABELS: Record<string, string> = {
  createdAt: 'utworzono',
  email: 'email',
}

export async function GET() {
  // Authentication check
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    return new Response('Unauthorized - please log in to the admin panel', { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })

  const clients = await payload.find({
    collection: 'newsletter',
    limit: 1000, // Adjust as needed
  })

  function convertToCSV(data: Newsletter[]): string {
    if (!data.length) return ''

    console.log('route.ts:17 - data:', data)

    // Get headers from the first object
    const originalColNames = Object.keys(data[0]).filter((name) => name !== 'updatedAt')

    const colNames: string[] = originalColNames.map(
      (field) => NEWSLETTER_FIELD_LABELS[field] || field, // fallback to field name if no mapping
    )

    // Create CSV header row
    const csvRows = [colNames.join(',')]

    // Convert each object to CSV row
    for (const item of data) {
      const values = originalColNames.map((col) => {
        const value = item[col as keyof Newsletter]
        return escapeCSVValue(value)
      })
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }

  const csv = convertToCSV(clients.docs)

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="newsletter.csv"',
    },
  })
}
