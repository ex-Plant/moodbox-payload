import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { ProductVariantT } from '@/lib/shopify/types'
import useCart from '@/lib/hooks/useCart'
import { Tip } from '@/components/ui/Tip'
import { Checkbox } from '@/components/ui/checkbox'
import Tag from '@/components/_custom_moodbox/common/Tag'
import SelectedVariantImgFullScreen from './SelectedImgFullScreenCheckbox'
import { C } from 'vitest/dist/chunks/reporters.d.DL9pg5DB.js'

type PropsT = {
  fullScreen: boolean
  variant: ProductVariantT
  selectable: boolean
  setImgHeight: (height: number) => void
  setShowItemsLimitInfo: (show: boolean) => void
}

export default function SelectedVariantImg({
  variant,
  fullScreen,
  selectable,
  setImgHeight,
  setShowItemsLimitInfo,
}: PropsT) {
  const { addCartItem, deleteCartItem, cartItems } = useCart()
  const checked = cartItems.includes(variant.id)
  const src = variant.image?.url

  function toggle(e: React.MouseEvent) {
    e.stopPropagation()
    if (!selectable && !checked) {
      setShowItemsLimitInfo(true)
      return
    }

    setShowItemsLimitInfo(false)
    if (checked) return deleteCartItem(variant.id)
    addCartItem(variant.id)
  }

  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    function getImgHeight() {
      if (!ref.current) return
      // console.log(ref.current.scrollHeight, '✅');
      setImgHeight(ref.current.scrollHeight)
    }

    getImgHeight()

    window.addEventListener('resize', getImgHeight)
    return () => {
      window.removeEventListener('resize', getImgHeight)
    }
  }, [setImgHeight])

  return (
    <div className={cn(`relative mx-auto aspect-square rounded`)}>
      {src && (
        <Image
          quality={100}
          ref={ref}
          fill={true}
          className={cn(
            `h-full w-full rounded`,
            // variant.availableForSale ? `` : `opacity-50`
          )}
          src={src}
          alt={''}
          sizes={
            fullScreen
              ? '(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 480px'
              : '(max-width: 768px) 100vw, (max-width: 1024px) 25vw, 16vw'
          }
        />
      )}
      {variant.availableForSale ? (
        <div
          role={`button`}
          onClick={(e) => toggle(e)}
          className={cn(
            `absolute top-0 right-0 z-10 p-2`,
            fullScreen && `p-4`,
            !selectable && !checked ? `cursor-not-allowed` : 'cursor-pointer',
          )}
        >
          {fullScreen ? (
            <SelectedVariantImgFullScreen checked={checked} selectable={selectable} />
          ) : (
            <Checkbox
              className={cn(
                `h-full w-full`,
                fullScreen ? 'size-8 xl:size-10' : 'size-6',
                !selectable && !checked ? `cursor-not-allowed` : 'cursor-pointer',
              )}
              checked={checked}
            />
          )}
        </div>
      ) : (
        <div className={cn(`absolute top-0 right-0 z-10`, fullScreen ? `p-4` : `p-2`)}>
          <Tag
            fullScreen={fullScreen}
            className={fullScreen ? `text-xs` : `text-[0.625rem]`}
            title={`Niedostępny`}
          />
        </div>
      )}
    </div>
  )
}
