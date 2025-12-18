import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Hero } from '@/components/Hero/Hero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { cn } from '@/utilities/ui'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'
import PageClient from './page.client'
import { createDiscountCode, getOrderById } from '../../../lib/shopify/adminApi'
// import { getOrderById } from '../../../lib/shopify/adminApi'
// import { getAllShopifyCustomersWithOrders } from '../../../lib/shopify/adminApi'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  // const url = '/' + decodedSlug
  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
  })

  // console.log({ slug, decodedSlug, url, page })

  // // Example usage
  // const result = await createDiscountCode({
  //   title: 'Welcome Discount',
  //   code: 'WELCOME10',
  //   usageLimit: 1,
  //   appliesOncePerCustomer: true,
  //   // minimumRequirement: {
  //   //   subtotal: {
  //   //     greaterThanOrEqualToSubtotal: '50.00',
  //   //   },
  //   // },
  //   customerGets: {
  //     value: {
  //       percentage: 0.1,
  //     },
  //     items: {
  //       all: true,
  //     },
  //   },
  // })

  // console.log(result)

  // if (result.success) {
  //   console.log('Discount created successfully:', result.discountId)
  // } else {
  //   console.log('Failed to create discount:', result.errors)
  // }

  // try {
  //   const order = await getOrderById('gid://shopify/Order/7377856430427')
  //   console.dir(order, { colors: true, depth: null })
  // } catch (e) {
  //   console.log(e)
  // }

  if (!page) return notFound()

  return (
    <main className={cn(page.textPage && 'mt-32')}>
      <PageClient />

      {draft && <LivePreviewListener />}

      {!page.textPage && <Hero {...page.hero} />}

      <RenderBlocks blocks={page.layout} textPage={!!page.textPage} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
