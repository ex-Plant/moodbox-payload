'use client'

import { PartnersBlock } from '@/payload-types'
import { ImageMedia } from '../Media/ImageMedia'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
export const Partners: React.FC<PartnersBlock> = ({ partners }) => {
  const [swiperIsReady, setSwiperIsReady] = useState(false)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  const config = {
    modules: [Pagination, Mousewheel, Keyboard],
    spaceBetween: 0,
    slidesPerView: 5,
    draggable: true,
    centeredSlides: false,
    loop: true,
    speed: 250,
    mousewheel: { forceToAxis: true, releaseOnEdges: true, sensitivity: 3.5 },
    keyboard: { enabled: true, onlyInViewport: true },

    onSwiper: (swiperInstance: SwiperType) => {
      setSwiper(swiperInstance)
      setSwiperIsReady(true)
    },
  }

  if (!partners || partners.length === 0) return <></>

  return (
    <section className={`xPaddings mx-auto max-w-[1440px] xPaddings min-h-20  text-white`}>
      <Swiper {...config} className="flex px-4  gap-8 md:grid-cols-3  bg-mood-dark-brown py-8 ">
        {partners?.map((partner) => {
          return (
            <SwiperSlide key={partner.id}>
              <div
                key={partner.id}
                className="w-full h-[150px] relative flex items-center justify-center "
              >
                <ImageMedia
                  resource={partner.partner}
                  size="(max-witdth: 767px) 40vw, 20vw"
                  fill={true}
                  imgClassName="object-contain"
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}
