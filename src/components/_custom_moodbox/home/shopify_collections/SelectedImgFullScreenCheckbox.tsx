import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { ProductVariantT } from '@/lib/shopify/types'
import useCart from '@/lib/hooks/useCart'
import { Tip } from '@/components/ui/Tip'
import { Checkbox } from '@/components/ui/checkbox'
import Tag from '@/components/_custom_moodbox/common/Tag'

type PropsT = {
  selectable: boolean
  checked: boolean
}

export default function SelectedVariantImgFullScreen({ selectable, checked }: PropsT) {
  const fullScreen = true

  return (
    <Tip
      disabled={selectable || checked}
      content={`Możesz wybrać po dwie próbki z każdej kategorii`}
      side="right"
    >
      <Checkbox
        className={cn(
          `h-full w-full`,
          fullScreen ? 'size-8 xl:size-10' : 'size-6',
          !selectable && !checked ? `cursor-not-allowed` : 'cursor-pointer',
        )}
        checked={checked}
      />
    </Tip>
  )
}
