import { Tip } from './Tip'
import { SIDE_OPTIONS } from '@radix-ui/react-popper'
import { ReactNode } from 'react'
import { cn } from '@/utilities/ui'

type PropsT = {
  children?: ReactNode
  tipContent?: string
  btnIsActive: boolean
  tipClassName?: string
  tipContentClassName?: string
  side?: (typeof SIDE_OPTIONS)[number]
  delay?: number
}

export default function TipWrapper({
  btnIsActive,
  tipContent,
  tipClassName,
  tipContentClassName,
  children,
  side,
  delay,
}: PropsT) {
  const content = <span> ℹ️ {tipContent}</span>

  if (btnIsActive) return children
  return (
    <Tip
      className={cn(`w-full cursor-not-allowed`, tipClassName)}
      contentClassName={tipContentClassName}
      side={side ?? 'bottom'}
      defaultContent={!tipContent}
      content={content}
      delay={delay}
    >
      {children}
    </Tip>
  )
}
