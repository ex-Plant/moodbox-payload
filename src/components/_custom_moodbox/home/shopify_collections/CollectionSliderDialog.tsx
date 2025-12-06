import CollectionSlider from './CollectionSlider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog'
import { ProductT } from '@/lib/shopify/types'
import { useShopifyCollectionCtx } from '../../../../providers/ShopifyCollectionCtx/ShopifyCollectionsProvider'

type SliderDialogT = {
  title: string
  slides: ProductT[]
  initSlide: number
}
export default function CollectionSliderDialog({ title, slides, initSlide }: SliderDialogT) {
  const { fullScreenDialogOpen, setFullScreenDialogOpen } = useShopifyCollectionCtx()
  return (
    <Dialog open={fullScreenDialogOpen} onOpenChange={setFullScreenDialogOpen}>
      <DialogContent className={`hidden md:block `}>
        <DialogHeader className={`hidden`}>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CollectionSlider slides={slides} title={title} isFullScreen initSlide={initSlide} />
      </DialogContent>
    </Dialog>
  )
}
