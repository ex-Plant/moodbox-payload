'use client'

import React, { createContext, useContext, useState } from 'react'

type ShopifyCollectionCtxType = {
  limitTxt: string
  fullScreenDialogOpen: boolean
  setFullScreenDialogOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  imgHeight: number
  setImgHeight: (height: number) => void
}

const ShopifyCollectionCtx = createContext<ShopifyCollectionCtxType>({
  limitTxt: '',
  fullScreenDialogOpen: false,
  setFullScreenDialogOpen: () => {},
  imgHeight: 0,
  setImgHeight: () => {},
})

type PropsT = {
  children: React.ReactNode
  limitTxt: string
}

export default function ShopifyCollectionsProvider({ children, limitTxt }: PropsT) {
  const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false)
  const [imgHeight, setImgHeight] = useState(0)
  return (
    <ShopifyCollectionCtx
      value={{
        limitTxt: limitTxt,
        fullScreenDialogOpen: fullScreenDialogOpen,
        setFullScreenDialogOpen: setFullScreenDialogOpen,
        imgHeight: imgHeight,
        setImgHeight: setImgHeight,
      }}
    >
      {children}
    </ShopifyCollectionCtx>
  )
}

export function useShopifyCollectionCtx() {
  const ctx = useContext(ShopifyCollectionCtx)
  if (!ctx) throw new Error(`❌ Missing ctx`)
  return ctx
}
