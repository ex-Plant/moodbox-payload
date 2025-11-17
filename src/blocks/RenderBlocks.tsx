import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { Delimiter } from '@/components/Delimiter/Delimiter'
import { Partners } from '@/components/Partners/Partners'
import { ShopifyCartServer } from '@/components/ShopifyCart/ShopifyCartServer'
import ShopifyProductsServer from '@/components/ShopifyProducts/ShopifyProductsServer'
import { Steps } from '@/components/StepsSection/Steps'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  delimiterBlock: Delimiter,
  shopifyProductsBlock: ShopifyProductsServer,
  shopifyCartBlock: ShopifyCartServer,
  stepsBlock: Steps,
  partnersBlock: Partners,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          // console.log({ block })

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
