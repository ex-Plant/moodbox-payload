import React, { useRef } from 'react'
import { DebugToolsCheckbox } from './DebugToolsCheckbox'
import { useDebugTools } from './useDebugTools'

export const DebugToolsTriggers = ({}) => {
  const gridInputRef = useRef<HTMLInputElement | null>(null)
  const layersInputRef = useRef<HTMLInputElement | null>(null)
  const outlinesInputRef = useRef<HTMLInputElement | null>(null)

  const { layersVisible, outlinesVisible, gridVisible, toggleGrid, toggleOutlines, toggleLayers } =
    useDebugTools()

  return (
    <div className={`absolute bottom-4 right-4 flex flex-col gap-2 md:flex-row lg:mt-auto`}>
      <DebugToolsCheckbox
        toggleFunc={toggleGrid}
        currentVal={gridVisible}
        label={`grid`}
        ref={gridInputRef}
      />
      <DebugToolsCheckbox
        toggleFunc={toggleOutlines}
        currentVal={outlinesVisible}
        label={`outlines`}
        ref={outlinesInputRef}
      />
      <DebugToolsCheckbox
        toggleFunc={toggleLayers}
        currentVal={layersVisible}
        label={`layers`}
        ref={layersInputRef}
      />
    </div>
  )
}
