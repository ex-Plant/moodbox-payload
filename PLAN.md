# Plan: Refactor Survey Constants to Payload Global

## Overview

Move hardcoded survey strings from `survey_constants.ts` to a Payload CMS Global, making them editable from admin panel. Simplify data structures (e.g., ratings use index instead of explicit value).

## Files to Create

| File                                                               | Purpose                                     |
| ------------------------------------------------------------------ | ------------------------------------------- |
| `src/globals/SurveyContent/config.ts`                              | Payload Global configuration                |
| `src/globals/SurveyContent/hooks/revalidateSurveyContent.ts`       | Cache invalidation hook                     |
| `src/components/_custom_moodbox/survey/SurveyContentProvider.tsx`  | React Context for client components         |
| `src/components/_custom_moodbox/survey/survey-content-defaults.ts` | Fallback values (current hardcoded strings) |

## Files to Modify

| File                                                             | Change                           |
| ---------------------------------------------------------------- | -------------------------------- |
| `src/payload.config.ts`                                          | Register SurveyContent global    |
| `src/app/(frontend)/ankieta/[token]/page.tsx`                    | Fetch global, pass to SurveyForm |
| `src/components/_custom_moodbox/survey/SurveyForm.tsx`           | Wrap with SurveyContentProvider  |
| `src/components/_custom_moodbox/survey/SurveyQ1-Q8.tsx`          | Use `useSurveyContent()` hook    |
| `src/components/_custom_moodbox/survey/SurveyHeader.tsx`         | Use `useSurveyContent()` hook    |
| `src/components/_custom_moodbox/survey/SurveyFooter.tsx`         | Use `useSurveyContent()` hook    |
| `src/components/_custom_moodbox/survey/SurveyDialog.tsx`         | Use `useSurveyContent()` hook    |
| `src/components/_custom_moodbox/survey/helpers/toggleReasons.ts` | Accept message as parameter      |
| `src/components/_custom_moodbox/nav/SurveyCompletedPage.tsx`     | Receive content via props        |
| `src/app/actions/createDiscountA.ts`                             | Import from defaults file        |

## Files to Delete

- `src/components/_custom_moodbox/survey/survey_constants.ts`

---

## Implementation Steps

### 1. Create Global Config

**`src/globals/SurveyContent/config.ts`**

```typescript
import type { GlobalConfig } from 'payload'
import { revalidateSurveyContent } from './hooks/revalidateSurveyContent'

export const SurveyContent: GlobalConfig = {
  slug: 'survey-content',
  label: { pl: 'Treści ankiety', en: 'Survey Content' },
  access: { read: () => true },
  fields: [
    // Questions group - 8 question objects
    {
      name: 'questions',
      type: 'group',
      label: { pl: 'Pytania', en: 'Questions' },
      fields: [
        { name: 'q1Title', type: 'text', required: true },
        { name: 'q1Subtitle', type: 'text' },
        // ... q2-q8
      ],
    },
    // Ratings - simplified array (index+1 = rating value)
    {
      name: 'ratings',
      type: 'array',
      label: { pl: 'Skala ocen', en: 'Ratings' },
      minRows: 5,
      maxRows: 5,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    // Reasons groups
    {
      name: 'reasonsPositive',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'reasonsNegative',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'reasonsRejection',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    // UI Messages - flat text fields
    {
      name: 'uiMessages',
      type: 'group',
      label: { pl: 'Komunikaty UI', en: 'UI Messages' },
      fields: [
        { name: 'maxBrandsSelected', type: 'text', required: true },
        { name: 'maxReasonsSelected', type: 'text', required: true },
        // ... all other UI_MESSAGES keys
      ],
    },
  ],
  hooks: { afterChange: [revalidateSurveyContent] },
}
```

### 2. Create Revalidation Hook

**`src/globals/SurveyContent/hooks/revalidateSurveyContent.ts`**

```typescript
import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateSurveyContent: GlobalAfterChangeHook = () => {
  revalidateTag('global_survey-content')
}
```

### 3. Register Global

**`src/payload.config.ts`** - add import and register:

```typescript
import { SurveyContent } from './globals/SurveyContent/config'

globals: [Header, Footer, SurveyContent],
```

### 4. Create Defaults File

**`src/components/_custom_moodbox/survey/survey-content-defaults.ts`**

Copy current values from `survey_constants.ts` into a typed default object matching the Global schema.

### 5. Create React Context

**`src/components/_custom_moodbox/survey/SurveyContentProvider.tsx`**

```typescript
'use client'
import { createContext, useContext, ReactNode } from 'react'
import type { SurveyContent } from '@/payload-types'
import { DEFAULT_SURVEY_CONTENT } from './survey-content-defaults'

const SurveyContentContext = createContext<SurveyContent>(DEFAULT_SURVEY_CONTENT)

export function SurveyContentProvider({
  children,
  content
}: {
  children: ReactNode
  content: SurveyContent | null
}) {
  return (
    <SurveyContentContext.Provider value={content ?? DEFAULT_SURVEY_CONTENT}>
      {children}
    </SurveyContentContext.Provider>
  )
}

export const useSurveyContent = () => useContext(SurveyContentContext)
```

### 6. Update Data Flow

**`src/app/(frontend)/ankieta/[token]/page.tsx`**

```typescript
import { getCachedGlobal } from '@/utilities/getGlobals'

// Inside component:
const surveyContent = await getCachedGlobal('survey-content', 0)()

// Pass to SurveyForm:
<SurveyForm surveyContent={surveyContent} ... />
```

**`src/components/_custom_moodbox/survey/SurveyForm.tsx`**

```typescript
import { SurveyContentProvider } from './SurveyContentProvider'

// Wrap form with provider:
<SurveyContentProvider content={surveyContent}>
  <formContext.Provider value={form}>
    ...
  </formContext.Provider>
</SurveyContentProvider>
```

### 7. Update Components

Replace imports in all survey components:

```typescript
// Before
import { surveyQuestions, UI_MESSAGES } from './survey_constants'

// After
import { useSurveyContent } from './SurveyContentProvider'
const { questions, uiMessages } = useSurveyContent()
```

### 8. Generate Types & Migrate

```bash
pnpm generate:types
pnpm run migrate:create add-survey-content-global
pnpm run migrate:docker
```

---

## Verification

1. **Build check**: `pnpm build` completes without errors
2. **Type check**: `pnpm typecheck` passes
3. **Admin panel**: Navigate to `/admin/globals/survey-content`, verify all fields render
4. **Survey page**: Visit `/ankieta/[token]`, verify survey displays correctly
5. **Edit test**: Change a string in admin, verify it reflects on frontend after refresh
