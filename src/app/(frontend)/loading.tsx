'use client'

import LogoMoodboxSvg from '../../components/_custom_moodbox/common/LogoMoodboxSvg'

export default function Loading() {
  return (
    <div className={`pointer-events-none flex h-screen w-screen items-center justify-center`}>
      <LogoMoodboxSvg className={`animate-bounce `} />
    </div>
  )
}
