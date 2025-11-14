'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import LogoSvg from '@/components/_custom_moodbox/common/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

export const Hero: React.FC<Page['hero']> = ({
  media,
  title,
  add_button,
  add_subtitle,
  subtitle,
  button_link,
}) => {
  return (
    <section className={`relative min-h-[600px]`}>
      {/* logo in the center of the screen when the video is loading */}
      <div className={`pointer-events-none absolute inset-0 flex items-center justify-center`}>
        <LogoSvg asButon={false} className={`animate-bounce `} />
      </div>
      <Media
        resource={media}
        className={`relative h-screen min-h-[600px] w-full object-cover xl:w-screen bg-`}
      />
      {/* mask over the video to make it more readable */}
      <div className={`bg-mood-dark-brown absolute inset-0 opacity-20 opacity-`}></div>

      <div
        className={`xPaddings absolute inset-0 mx-auto flex max-w-[1440px] grid-cols-12 flex-col pt-[180px] xl:grid`}
      >
        <div className={`col-span-11 flex flex-col items-end`}>
          <RichText
            data={title}
            enableGutter={false}
            enableProse={false}
            className={`text-[2.5rem] text-[#EEEBE3] xl:text-[3.75rem]  leading-tight `}
          />
          {add_subtitle && (
            <h2 className={`block pt-4 text-[1.5rem] text-[#f6f4f0]`}>{subtitle}</h2>
          )}

          {add_button && (
            <div className={`pt-12 xl:pt-28`}>
              <Button variant={`mood`} size={`sm`} className="py-2">
                <Link
                  href={button_link?.url || '#'}
                  className={cn(`cursor-pointer leading-normal`)}
                >
                  {button_link?.label}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
