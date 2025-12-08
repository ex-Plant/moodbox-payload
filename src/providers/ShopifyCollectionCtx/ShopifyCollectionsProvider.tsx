'use client'

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type ShopifyCollectionCtxType = {
  limitTxt: string
  imgHeight: number
  setImgHeight: Dispatch<SetStateAction<number>>
}

const ShopifyCollectionCtx = createContext<ShopifyCollectionCtxType>({
  limitTxt: '',
  imgHeight: 0,
  setImgHeight: () => {},
})

type PropsT = {
  children: React.ReactNode
  limitTxt: string
}

export default function ShopifyCollectionsProvider({ children, limitTxt }: PropsT) {
  const [imgHeight, setImgHeight] = useState(0)
  return (
    <ShopifyCollectionCtx
      value={{
        imgHeight,
        setImgHeight,
        limitTxt: limitTxt,
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
