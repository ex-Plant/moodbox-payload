import CollectionSlider from './CollectionSlider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog'
import { ProductT } from '@/lib/shopify/types'

type SliderDialogT = {
  title: string
  slides: ProductT[]
  initSlide: number
  fullScreenDialogOpen: boolean
  setFullScreenDialogOpen: (open: boolean) => void
}
export default function CollectionSliderDialog({
  title,
  slides,
  initSlide,
  fullScreenDialogOpen,
  setFullScreenDialogOpen,
}: SliderDialogT) {
  return (
    <Dialog open={fullScreenDialogOpen} onOpenChange={setFullScreenDialogOpen}>
      <DialogContent className={`hidden md:block `}>
        <DialogHeader className={`hidden`}>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CollectionSlider
          slides={slides}
          title={title}
          isFullScreen
          initSlide={initSlide}
          collectionIndex={-1}
        />
      </DialogContent>
    </Dialog>
  )
}
