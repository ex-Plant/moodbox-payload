// import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type PostPurchasePagePropsT = {
  params: { token: string }
}

export const dynamic = 'force-dynamic'

export default async function PostPurchasePage({ params }: PostPurchasePagePropsT) {
  //   const token: string = params.token
  console.log(params.token)

  //   const payload = await getPayload({ config: configPromise })

  //   const scheduled = await payload.find({
  //     collection: 'scheduled-emails',
  //     limit: 1,
  //     where: {
  //       token: { equals: token },
  //     },
  //   })

  //   if (scheduled.totalDocs === 0) {
  //     notFound()
  //   }

  //   const doc = scheduled.docs[0] as {
  //     id: string
  //     adminGraphqlId: string
  //     status: string
  //     customerEmail: string
  //   }

  //   if (doc.status !== 'sent') {
  // Optionally disallow access if email not sent yet or already completed
  // For now just show 404
  // notFound()
  //   }

  // TODO: import your existing getOrderById helper
  // const order = await getOrderById(doc.adminGraphqlId)

  // TODO: build dynamic questions based on order line items
  // const questions = buildQuestionsFromOrder(order)

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-semibold">We&apos;d love your feedback</h1>
      <p className="mb-6 text-sm text-gray-500">{/* You can show summary from order here */}</p>
      {/* TODO: render a form with questions */}
      <p>Feedback form coming soon.</p>
    </main>
  )
}
