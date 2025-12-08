'use client'

import React, { createContext, useContext } from 'react'

type ShopifyCollectionCtxType = {
  limitTxt: string
}

const ShopifyCollectionCtx = createContext<ShopifyCollectionCtxType>({
  limitTxt: '',
})

type PropsT = {
  children: React.ReactNode
  limitTxt: string
}

export default function ShopifyCollectionsProvider({ children, limitTxt }: PropsT) {
  return (
    <ShopifyCollectionCtx
      value={{
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
