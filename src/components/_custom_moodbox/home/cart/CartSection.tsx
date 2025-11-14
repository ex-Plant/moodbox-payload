'use client'

import { Delimiter } from '@/components/Delimiter/Delimiter'
import CartForm from './CartForm'
import CartItems from './CartItems'
import useCart from '@/lib/hooks/useCart'
import { ProductT } from '@/lib/shopify/types'

type PropsT = {
  allProducts: ProductT[]
}

export default function CartSection({ allProducts }: PropsT) {
  const { cartItems } = useCart()

  const allVariants = allProducts.flatMap((el) => {
    return el.variants.edges
  })
  const selected = allVariants.filter((el) => cartItems.includes(el.node.id))

  return (
    <section className={`pb-12 xl:pb-20 `}>
      <Delimiter title={'Formularz'} blockType={'delimiterBlock'} />
      <div className={`xPaddings mx-auto grid max-w-[1440px] xl:grid-cols-12`}>
        <aside className={`xl:col-span-3 xl:pl-4`}>
          <CartItems selected={selected} />
        </aside>
        <div className={`mt-4 xl:col-span-9 xl:col-start-5 xl:mt-0`}>{<CartForm />}</div>
      </div>
    </section>
  )
}
