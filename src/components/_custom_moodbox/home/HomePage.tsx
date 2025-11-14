import { getProductsByCollection } from '@/lib/shopify/api'
import { Suspense } from 'react'
import Delimiter from '@/components/Delimiter/Delimiter'
import Hero from '@/components/_custom_moodbox/home/Hero'
import DelimiterFullW from '@/components/_custom_moodbox/common/DelimiterFullW'
import Icons from '@/components/_custom_moodbox/home/iconsSection/Icons'
import Collections from '@/components/_custom_moodbox/home/collections/Collections'
import CartSection from '@/components/_custom_moodbox/home/cart/CartSection'

export default async function HomePage() {
  const productsByCollection = await getProductsByCollection()
  const allProducts = productsByCollection.flatMap((collection) => collection.products)

  return (
    <>
      <Hero />
      <Delimiter className={`flex justify-center`} />
      <DelimiterFullW title={`Od wyboru do dostawy - prościej się nie da`} />
      <Icons />
      <Collections productsByCollection={productsByCollection} />
      <Suspense fallback={null}>
        <CartSection allProducts={allProducts} />
      </Suspense>
    </>
  )
}
