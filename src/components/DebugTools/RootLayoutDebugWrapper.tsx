'use client'

import { useDebugTools } from './useDebugTools'
import { GridVisualHelper } from './GridVisualHelper'
import { DebugToolsTriggers } from './DebugToolsTriggers'
import { cn } from '../../utilities/ui'

type RootLayoutDebugWrapperPropsT = {
  children: React.ReactNode
}

//todo remove on prod!!

export const RootLayoutDebugWrapper = ({ children }: RootLayoutDebugWrapperPropsT) => {
  const { layersVisible, outlinesVisible, gridVisible } = useDebugTools()

  const isDev = process.env.NODE_ENV == 'development'

  return (
    <>
      {isDev && gridVisible && <GridVisualHelper />}
      <div
        className={cn(
          outlinesVisible && `[&_*]:outline [&_*]:outline-lime-300`,
          layersVisible && `[&_*]:bg-[hsl(0_100%_50%_/_0.1)]`,
        )}
      >
        {children}
        {isDev && <DebugToolsTriggers />}
      </div>
    </>
  )
}
