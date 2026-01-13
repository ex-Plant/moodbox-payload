import z from 'zod'

export const contactSchema = z.object({
  subject: z.string().min(3, { message: 'Temat musi mieć minimum 3 znaki' }),
  email: z
    .string()
    .min(3, { message: 'Podaj prawidłowy adres email abyśmy mogli odpowiedzieć na wiadomość' }),
  message: z.string().min(5, { message: 'Wiadomość musi mieć minimum 5 znaków' }),
})

export type contactSchemaT = z.infer<typeof contactSchema>
