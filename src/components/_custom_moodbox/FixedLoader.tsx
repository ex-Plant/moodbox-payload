import { createPortal } from 'react-dom'
import LogoMoodboxSvg from './common/LogoMoodboxSvg'

type PropsT = {
  active: boolean
}

export default function FixedLoader({ active }: PropsT) {
  if (!active || typeof document === 'undefined') return

  return createPortal(
    <div className={`pointer-events-none fixed inset-0 flex items-center justify-center`}>
      <LogoMoodboxSvg className={`animate-bounce `} />
    </div>,
    document.body,
  )
}
