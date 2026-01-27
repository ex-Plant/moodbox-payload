'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { SurveyContent } from '@/payload-types'

const SurveyContentContext = createContext<SurveyContent | null>(null)

type SurveyContentProviderPropsT = {
  children: ReactNode
  content: SurveyContent
}

export function SurveyContentProvider({ children, content }: SurveyContentProviderPropsT) {
  return <SurveyContentContext.Provider value={content}>{children}</SurveyContentContext.Provider>
}

export function useSurveyContent(): SurveyContent {
  const context = useContext(SurveyContentContext)
  if (!context) {
    throw new Error('useSurveyContent must be used within SurveyContentProvider')
  }
  return context
}
