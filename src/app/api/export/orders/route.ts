import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ATTRIBUTE_KEY_PL } from '@/lib/CartSchema'
import { Order } from '../../../../payload-types'
import { escapeCSVValue } from '@/utilities/escapeCSVValue'

// Add this mapping object at the top of your route.ts
const CLIENT_FIELD_LABELS: Record<string, string> = {
  ...ATTRIBUTE_KEY_PL,
  createdAt: 'Data utworzenia',
}

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const clients = await payload.find({
    collection: 'orders',
    limit: 1000, // Adjust as needed
  })

  function convertToCSV(data: Order[]): string {
    if (!data.length) return ''

    // Get headers from the first object
    const originalColNames = Object.keys(data[0]).filter((name) => name !== 'updatedAt')

    const colNames: string[] = originalColNames.map(
      (field) => CLIENT_FIELD_LABELS[field] || field,
      // fallback to field name if no mapping
    )

    // Create CSV header row
    const csvRows = [colNames.join(',')]

    // Convert each object to CSV row
    for (const item of data) {
      const values = originalColNames.map((col) => {
        const value = item[col as keyof Order]
        return escapeCSVValue(value)
      })
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }

  const csv = convertToCSV(clients.docs)

  // return Response.json({})

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="zamówienia.csv"',
    },
  })
}
