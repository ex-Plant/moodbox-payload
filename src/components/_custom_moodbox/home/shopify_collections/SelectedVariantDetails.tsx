import React from 'react'
import { ProductVariantT, ProductT } from '@/lib/shopify/types'
import { cn } from '@/utilities/ui'

type PropsT = {
  fullScreen: boolean
  selected: ProductVariantT
  title: string
  brand: ProductT['brand']
}

export default function SelectedVariantDetails({ fullScreen, selected, title, brand }: PropsT) {
  return (
    <div>
      <p
        className={cn(
          `pt-1 text-[0.625rem] leading-tight font-bold text-[#9d9c9c]`,
          fullScreen ? 'text-[1.25rem]' : 'line-clamp-1 ',
        )}
      >
        {selected.product?.productType}
      </p>
      <p
        className={cn(
          `text-[0.875rem] leading-tight font-bold text-foreground`,
          fullScreen ? 'text-[1.75rem]' : 'line-clamp-1 ',
        )}
      >
        {brand?.value ?? ''}
      </p>
      <h4
        className={cn(
          `text-mood-dark-gray  text-[0.75rem] leading-tight`,
          fullScreen ? 'text-[1.5rem]' : 'line-clamp-1',
        )}
      >
        {title}
      </h4>
    </div>
  )
}
