import { useShopifyCollectionCtx } from '@/providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'

type PropsT = {
  title: string
  selectedWithinCatLen: number
  showItemsLimitInfo: boolean
}

export default function CollectionTitle({
  title,
  selectedWithinCatLen,
  showItemsLimitInfo,
}: PropsT) {
  const { limitTxt } = useShopifyCollectionCtx()

  return (
    <header
      className={`text-mood-dark-gray text-xl py-8 lg:text-[1.5rem] xl:pl-4 relative  leading-none  `}
    >
      <h3 className={`font-bold `}>
        <span>{title}</span>
        {selectedWithinCatLen > 1 && <span className={`mx-2`}>{selectedWithinCatLen} / 2</span>}
      </h3>
      {showItemsLimitInfo && <span className={`text-base `}>{limitTxt}</span>}
    </header>
  )
}
