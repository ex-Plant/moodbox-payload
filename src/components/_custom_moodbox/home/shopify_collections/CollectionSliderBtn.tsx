import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useShopifyCollectionCtx } from '../../../../providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'
type PropsT = {
  disabled: boolean
  onClick?: () => void
  isFullScreen: boolean
  direction: 'left' | 'right'
  className?: string
}

export default function CollectionSliderBtn({
  disabled,
  onClick,
  isFullScreen,
  direction,
  className,
}: PropsT) {
  const iconClass = cn(
    `stroke-mood-brown w-auto stroke-[1.5px]`,
    isFullScreen ? `h-12 xl:h-20 ` : `h-10 xl:h-14 xl:translate-y-[-28px] translate-y-[-20px]`,
  )

  const { imgHeight } = useShopifyCollectionCtx()

  return (
    <button
      style={{
        paddingTop: !isFullScreen ? `${imgHeight / 2}px` : ``,
      }}
      disabled={disabled}
      className={cn(
        `disabled:opacity-20`,
        isFullScreen ? `hidden lg:block` : '',
        isFullScreen && disabled && 'disabled:opacity-0',
        direction === 'right' ? 'pl-8' : 'pr-8',
        className,
      )}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <ChevronLeft className={iconClass} />
      ) : (
        <ChevronRight className={iconClass} />
      )}
    </button>
  )
}
