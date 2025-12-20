import { notFound } from 'next/navigation'
import configPromise from '@payload-config'

import { getOrderById } from '@/lib/shopify/adminApi'
import SurveyForm from '@/components/_custom_moodbox/survey/SurveyForm'
import { getPayload } from 'payload'
import { wait } from 'payload/shared'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type PropsT = {
  params: Promise<{ token: string }>
}

export default async function Ankieta({ params }: PropsT) {
  const { token } = await params
  const payload = await getPayload({ config: configPromise })

  let orderId: string
  let order = null

  try {
    const res = await payload.find({
      collection: 'scheduled-emails',
      limit: 1,
      where: { token: { equals: token } },
    })

    if (res.docs.length < 1) {
      console.log('page.tsx:28 - res:', res)
      console.error('Email not found')
      notFound()
    }

    const doc = res.docs[0]

    //todo add survey completed page
    // if (doc.isSurveyCompleted) {
    //   return (
    //     <main className="mx-auto max-w-[800px] py-32 px-4 xPaddings text-center">
    //       <h1 className="text-2xl font-bold mb-4">
    //         Wygląda na to, że Twoja ankieta została już wypełniona!
    //       </h1>
    //       <p>Dziękujemy za Twój czas!</p>
    //       <div className={`pt-2 text-balance space-y-2`}>
    //         <p>
    //           Jeśli nie wypełniałeś/aś jeszcze ankiety lub nie masz kodu rabatowego, napisz do nas.
    //         </p>
    //         <p>
    //           <Link href="mailto:hello@moodbox.pl">hello@moodbox.pl</Link>
    //         </p>
    //       </div>
    //     </main>
    //   )
    // }

    orderId = doc.orderId

    order = await getOrderById(orderId)
    if (!order) {
      console.error('Order not found:', orderId)
      notFound()
    }
  } catch (error) {
    console.error('Failed to decode token:', error)
    notFound()
  }

  // Extract unique brands from line items
  const brands = Array.from(
    new Set(
      order.lineItems.edges
        .map((edge) => edge.node.product?.metafield?.value)
        .filter((brand): brand is string => !!brand),
    ),
  )

  return (
    <main className="mx-auto max-w-[800px] py-32 px-4 xPaddings ">
      <SurveyForm
        availableBrands={brands}
        customerName={order?.customer?.firstName}
        token={token}
      />
    </main>
  )
}
