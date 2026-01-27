'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { SurveyContent } from '@/payload-types'
import { DEFAULT_SURVEY_CONTENT } from './survey-content-defaults'

const SurveyContentContext = createContext<SurveyContent>(DEFAULT_SURVEY_CONTENT)

type SurveyContentProviderPropsT = {
  children: ReactNode
  content: SurveyContent | null
}

export function SurveyContentProvider({ children, content }: SurveyContentProviderPropsT) {
  return (
    <SurveyContentContext.Provider value={content ?? DEFAULT_SURVEY_CONTENT}>
      {children}
    </SurveyContentContext.Provider>
  )
}

export const useSurveyContent = () => useContext(SurveyContentContext)
