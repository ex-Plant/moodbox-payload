import { z } from 'zod'
import isValidUrl from './isValidUrl'

const envSchema = z.object({
  // Shopify
  SHOPIFY_ADMIN_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_ADMIN_API_URL: z.string().refine(isValidUrl, 'Invalid URL'),
  SHOPIFY_STOREFRONT_API_URL: z.string().refine(isValidUrl, 'Invalid URL'),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_API_SECRET: z.string().min(1),

  // Database
  POSTGRES_URL: z.string().min(1),

  // Public vars
  NEXT_PUBLIC_SERVER_URL: z.string().refine(isValidUrl, 'Invalid URL'),

  // Server secrets
  PAYLOAD_SECRET: z.string().min(1),
  CRON_SECRET: z.string().min(1),
  PREVIEW_SECRET: z.string().min(1),
  BLOB_READ_WRITE_TOKEN: z.string().min(1),

  // Email
  EMAIL_USER: z.string().min(1),
  EMAIL_PASS: z.string().min(1),
  EMAIL_HOST: z.string().min(1),
})

type EnvT = z.infer<typeof envSchema>

function validateEnv(): EnvT {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    process.exit(1)
  }
}

export const env = validateEnv()
