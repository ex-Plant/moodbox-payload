import React from 'react'
import { ProductVariantT } from '@/lib/shopify/types'
import { cn } from '@/utilities/ui'

type PropsT = {
  fullScreen: boolean
  selected: ProductVariantT
  title: string
}

export default function SelectedVariantDetails({ fullScreen, selected, title }: PropsT) {
  return (
    <div>
      <p
        className={cn(
          `line-clamp-1 pt-1 text-[0.625rem] leading-tight font-bold text-[#9d9c9c]`,
          fullScreen ? 'text-[1.25rem]' : '',
        )}
      >
        {selected.product?.productType}
      </p>
      <p
        className={cn(
          `line-clamp-1 text-[0.875rem] leading-tight font-bold text-foreground`,
          fullScreen ? 'text-[1.75rem]' : '',
        )}
      >
        {selected.product?.description}
      </p>
      <h4
        className={cn(
          `text-mood-dark-gray line-clamp-1 text-[0.75rem] leading-tight`,
          fullScreen ? 'text-[1.5rem]' : '',
        )}
      >
        {title}
      </h4>
    </div>
  )
}
