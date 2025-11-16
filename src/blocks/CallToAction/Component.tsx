import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links }) => {
  return (
    <div className="flex flex-col gap-8 my-8 items-center w-full mb-12">
      {(links || []).map(({ link }, i) => {
        return <CMSLink key={i} size="lg" {...link} />
      })}
    </div>
  )
}
