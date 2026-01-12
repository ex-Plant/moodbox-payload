import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SurveyResponse, Order } from '../../../../payload-types'

const COLUMNS = [
  {
    header: 'Email klienta',
    key: 'customer_email',
    format: (val: string) => val,
  },
  {
    header: 'ID Zamówienia',
    key: 'order',
    format: (val: number | Order) => (typeof val === 'object' ? val.orderId : val),
  },
  {
    header: 'Data ukończenia',
    key: 'completedAt',
    format: (val: string) => (val ? new Date(val).toLocaleString('pl-PL') : ''),
  },
  {
    header: 'Rozważane marki',
    key: 'considered_brands',
    format: (val: string[]) => val?.join('; ') || '',
  },
  {
    header: 'Odrzucona marka',
    key: 'rejected_brand',
    format: (val: string) => val || '',
  },
  {
    header: 'Powody odrzucenia',
    key: 'rejection_reasons',
    format: (val: string[]) => val?.join('; ') || '',
  },
  {
    header: 'Oceny marek',
    key: 'brand_evaluations',
    format: (val: SurveyResponse['brand_evaluations']) =>
      val
        ?.map(
          (b) =>
            `${b.brand_name}: ${b.rating}/5${
              b.reasons?.length ? ` (${b.reasons.join(', ')})` : ''
            }`,
        )
        .join(' | ') || '',
  },
  {
    header: 'Prośba o kontakt',
    key: 'contact_request',
    format: (val: boolean) => (val ? 'Tak' : 'Nie'),
  },
  {
    header: 'Sugestie',
    key: 'improvement_suggestion',
    format: (val: string) => val || '',
  },
]

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'survey-responses',
    limit: 1000,
    depth: 1,
  })

  function convertToCSV(data: SurveyResponse[]): string {
    if (!data.length) return ''

    const headers = COLUMNS.map((col) => col.header).join(',')

    const rows = data.map((item) => {
      return COLUMNS.map((col) => {
        const rawValue = item[col.key as keyof SurveyResponse]
        // @ts-expect-error - dynamic formatting
        const formattedValue = col.format(rawValue)

        const stringValue = String(formattedValue ?? '')
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      }).join(',')
    })

    return [headers, ...rows].join('\n')
  }

  const csv = convertToCSV(docs)

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="odpowiedzi_ankiety.csv"',
    },
  })
}
