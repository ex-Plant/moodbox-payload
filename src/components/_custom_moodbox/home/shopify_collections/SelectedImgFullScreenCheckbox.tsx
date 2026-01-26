import { Tip } from '@/components/ui/Tip'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/utilities/ui'
import { useShopifyCollectionCtx } from '@/providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'

type PropsT = {
  selectable: boolean
  checked: boolean
}

export default function SelectedVariantImgFullScreen({ selectable, checked }: PropsT) {
  const { limitTxt } = useShopifyCollectionCtx()
  const fullScreen = true

  return (
    <Tip disabled={selectable || checked} content={limitTxt} side="right">
      <Checkbox
        className={cn(
          `h-full w-full`,
          fullScreen ? 'size-8 xl:size-10' : 'size-6',
          !selectable && !checked ? `cursor-not-allowed` : 'cursor-pointer',
        )}
        checked={checked}
        aria-label={checked ? 'Usuń z koszyka' : 'Dodaj do koszyka'}
      />
    </Tip>
  )
}
