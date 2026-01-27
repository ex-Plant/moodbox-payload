import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ path: '.env.local' })
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { DEFAULT_SURVEY_CONTENT } from '../src/components/_custom_moodbox/survey/survey-content-defaults'

async function seed() {
  console.log('🌱 Seeding survey-content global...')

  const payload = await getPayload({ config })

  // Remove id, createdAt, updatedAt from defaults as Payload will generate these
  const { id, createdAt, updatedAt, ...data } = DEFAULT_SURVEY_CONTENT

  const result = await payload.updateGlobal({
    slug: 'survey-content',
    data,
    context: {
      disableRevalidate: true,
    },
  })

  console.log('📦 Seeded data:', JSON.stringify(result, null, 2))
  console.log('✅ Survey content seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
