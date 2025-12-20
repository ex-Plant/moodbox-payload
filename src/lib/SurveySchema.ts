import { z } from 'zod'

export const brandEvaluationSchema = z.object({
  rating: z.number().min(1).max(5),
  reasons: z.array(z.string()).max(2).optional(),
  other_reason: z.string().optional(),
})

export const surveySchema = z.object({
  // Step 1: Wybór producentów
  considered_brands: z
    .array(z.string())
    .min(1, 'Wybierz co najmniej jednego producenta')
    .max(3, 'Możesz wybrać maksymalnie 3 producentów'),
  rejected_brand: z.string().optional(),

  // Step 2: Ocena jakościowa
  brand_evaluations: z.record(z.string(), brandEvaluationSchema),

  // Reasons for rejection (P5)
  rejection_reasons: z.array(z.string()).max(2).optional(),
  rejection_other: z.string().optional(),

  // Contact (P6)
  contact_request: z.boolean(),
  contact_brands: z.array(z.string()).optional(),

  // Step 3: Informacje dodatkowe
  missing_brands: z.string().optional(),
  improvement_suggestion: z.string().optional(),
})

export type SurveySchemaT = z.infer<typeof surveySchema>
export type BrandEvaluationT = z.infer<typeof brandEvaluationSchema>
