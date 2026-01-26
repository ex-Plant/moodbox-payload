'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, poster } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  const posterUrl =
    typeof poster === 'object' && poster?.url
      ? getMediaUrl(poster.url)
      : typeof poster === 'string'
        ? poster
        : undefined

  if (resource && typeof resource === 'object') {
    return (
      <video
        autoPlay
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        poster={posterUrl}
        preload="auto"
        ref={videoRef}
      >
        <source src={getMediaUrl(resource.url)} />
      </video>
    )
  }

  console.log(`no video`)

  return null
}
