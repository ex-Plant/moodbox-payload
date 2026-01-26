'use client'
import CartItem from './CartItem'
import { ProductVariantT } from '@/lib/shopify/types'
import useCart from '@/lib/hooks/useCart'
import { Button } from '@/components/ui/button'
import { ShopifyCartBlock } from '@/payload-types'

type PropsT = {
  selected: { node: ProductVariantT }[]
} & ShopifyCartBlock

export default function CartItems({ selected, ...props }: PropsT) {
  const { removeAllItems, cartItems } = useCart()

  return (
    <div className={`h-full rounded bg-white p-4 shadow-sm`}>
      <div className={`flex h-full flex-col`}>
        <h3 className={`text-mood-dark-gray text-[18px]`}>{props.selectedItemsLabel}</h3>
        <ul className={`grid gap-4 pt-4 pb-12`}>
          {selected.map((item) => (
            <CartItem selected={item.node} key={item.node.id} />
          ))}
        </ul>
        {cartItems.length > 0 && (
          <Button onClick={removeAllItems} variant={`mood`} className={`mt-auto self-end`}>
            {props.deleteAllLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
