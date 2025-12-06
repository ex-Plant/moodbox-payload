import CollectionSlider from './CollectionSlider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog'
import { Dispatch, SetStateAction } from 'react'
import { ProductT } from '@/lib/shopify/types'

type SliderDialogT = {
  fullScreenDialogOpen: boolean
  setFullScreenDialogOpen: Dispatch<SetStateAction<boolean>>
  title: string
  slides: ProductT[]
  initSlide: number
}
export default function CollectionSliderDialog({
  setFullScreenDialogOpen,
  fullScreenDialogOpen,
  title,
  slides,
  initSlide,
}: SliderDialogT) {
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
