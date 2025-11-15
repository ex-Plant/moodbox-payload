import { DelimiterBlock } from '@/payload-types'
import React from 'react'

export const Delimiter: React.FC<DelimiterBlock> = ({ title, fullWidth, bottomPageDelimiter }) => {
  if (bottomPageDelimiter) {
    return (
      <div className={`xPaddings mx-auto my-4 max-w-[1440px] xl:my-6 bg-`}>
        <div className={` relative flex min-h-16 items-center py-4 xl:min-h-20 `}>
          <h2
            className={`  xl:pl-4 xl:text-[2.25rem] text-mood-dark-gray border-mood-dark-brown border-b pt-8 pb-8 text-center text-[1.5rem]`}
          >
            {title}
          </h2>
        </div>
      </div>
    )
  }

  if (fullWidth) {
    return (
      <div className={`bg-mood-dark-brown flex py-6 text-white`}>
        <p
          className={`xPaddings mx-auto text-center text-[1rem] md:text-[1.5rem] xl:text-[1.625rem]`}
        >
          {title}
        </p>
      </div>
    )
  }

  return (
    <div className={`xPaddings mx-auto my-4 max-w-[1440px] xl:my-6`}>
      <div
        className={`border-mood-brown relative flex min-h-16 items-center border border-r-0 border-l-0 py-4 xl:min-h-20`}
      >
        <h2 className={`text-mood-dark-gray text-[1.5rem] xl:pl-4 xl:text-[2.25rem]`}>{title}</h2>
      </div>
    </div>
  )
}
