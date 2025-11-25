import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Newsletter } from '../../../../payload-types'

// Add this mapping object for Polish field labels
const NEWSLETTER_FIELD_LABELS: Record<string, string> = {
  createdAt: 'utworzono',
  email: 'email',
}

export async function GET() {
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
        // Handle values that contain commas or quotes
        if (
          typeof value === 'string' &&
          (value.includes(',') || value.includes('"') || value.includes('\n'))
        ) {
          return `"${value.replace(/"/g, '""')}` // Escape quotes by doubling them
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
      'Content-Disposition': 'attachment; filename="newsletter.csv"',
    },
  })
}
