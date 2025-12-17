import { z } from 'zod'

export const cartSchema = z.object({
  company_name: z.string().min(1),
  // email: z.string().min(3, { message: 'Podaj prawidłowy adres email' }),
  projects_per_year: z.union([z.string().min(1), z.number().min(0)]),
  nip: z.string().length(10, { message: 'Nieprawidłowy numer NIP' }),
  // .regex(/^[0-9]+$/, { message: 'Tylko cyfry są dozwolone' }),
  website: z.string().optional(),
  city: z.string().min(1),
  project_type: z.string().min(1),
  completion_date: z.string().min(1),
  project_stage: z.string().min(1),
  project_area: z.string().min(1),
  project_budget: z.string().min(1),
  // consents: z.object({
  // 	consent1: z.boolean(),
  // 	consent2: z.boolean(),
  // }),

  // consents must be true
  consents: z.object({
    consent1: z.boolean().refine((val) => val === true),
    consent2: z.boolean().refine((val) => val === true),
  }),
})

export type CartSchemaT = z.infer<typeof cartSchema>

export const ATTRIBUTE_KEY_PL: Record<keyof CartSchemaT, string> = {
  company_name: 'Nazwa firmy / pracowni',
  nip: 'NIP',
  // email: 'E-mail',
  website: 'Strona WWW',
  projects_per_year: 'Liczba projektów rocznie',
  city: 'Miejscowość',
  project_type: 'Typ projektu',
  completion_date: 'Termin realizacji (MM/RR)',
  project_stage: 'Etap projektu',
  project_area: 'Metraż',
  project_budget: 'Budżet',
  consents: 'Zgody',
}

// Unified action state type used with useActionState
export type FormStateT = {
  data: CartSchemaT
  error?: boolean
}
