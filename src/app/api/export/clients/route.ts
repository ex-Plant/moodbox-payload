import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Client } from '@/payload-types'
import { ATTRIBUTE_KEY_PL } from '@/lib/CartSchema'

// Add this mapping object at the top of your route.ts
const CLIENT_FIELD_LABELS: Record<string, string> = {
  ...ATTRIBUTE_KEY_PL,
  createdAt: 'Data utworzenia',
}

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const clients = await payload.find({
    collection: 'clients',
    limit: 1000, // Adjust as needed
  })

  function convertToCSV(data: Client[]): string {
    if (!data.length) return ''

    // Get headers from the first object
    const originalColNames = Object.keys(data[0]).filter(
      (name) => name !== 'consents' && name !== 'updatedAt',
    )

    const colNames: string[] = originalColNames.map(
      (field) => CLIENT_FIELD_LABELS[field] || field, // fallback to field name if no mapping
    )

    // Create CSV header row
    const csvRows = [colNames.join(',')]

    // Convert each object to CSV row
    for (const item of data) {
      const values = originalColNames.map((col) => {
        const value = item[col as keyof Client]
        // Handle values that contain commas or quotes
        if (
          typeof value === 'string' &&
          (value.includes(',') || value.includes('"') || value.includes('\n'))
        ) {
          return `"${value.replace(/"/g, '""')}"` // Escape quotes by doubling them
        }
        return value || '' // Convert null/undefined to empty string
      })
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }

  const csv = convertToCSV(clients.docs)

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="clients.csv"',
    },
  })
}
