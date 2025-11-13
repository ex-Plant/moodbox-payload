'use client'

import { Button } from '@/components/ui/button'
import { tr } from '@/lib/translations/pl'
import Link from 'next/link'
import LogoSvg from '../common/Logo'
import { cn } from '@/utilities/ui'

export default function Hero() {
  return (
    <>
      <div className={`relative min-h-[600px]`}>
        <div className={`pointer-events-none absolute inset-0 flex items-center justify-center`}>
          <LogoSvg asButon={false} className={`animate-bounce `} />
        </div>
        <>
          <video
            playsInline={true}
            muted={true}
            autoPlay={true}
            className={`relative h-screen min-h-[600px] w-full object-cover xl:w-screen bg-`}
            src="/moodbox_intro.mp4"
            loop={true}
          />
          <div className={`bg-mood-dark-brown absolute inset-0 opacity-10 opacity-`}></div>

          <div
            className={`xPaddings absolute inset-0 mx-auto flex max-w-[1440px] grid-cols-12 flex-col pt-[180px] xl:grid`}
          >
            <div className={`col-span-11 flex flex-col items-end text-white`}>
              <div className={`lead ing-tight text-[2.5rem] text-[#EEEBE3] xl:text-[3.75rem]`}>
                <h1>
                  <span className={`block`}>{'Twoje materiały w '}</span>
                  <span className={`block text-[2.5rem] text-[#EEEBE3] xl:text-[3.75rem]`}>
                    <span className={`pr-3 font-bold`}>jednym</span>
                    <span>boxie</span>
                  </span>
                  <span className={`block pt-4 text-[1.5rem] text-[#f6f4f0]`}>
                    {tr.heroSubtitle}
                  </span>
                </h1>
              </div>

              <div className={`pt-12 xl:pt-28`}>
                <Button variant={`mood`} size={`sm`} className="py-2">
                  <Link href="#collections" className={cn(`cursor-pointer leading-normal 💥`)}>
                    {tr.heroButton}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  )
}
