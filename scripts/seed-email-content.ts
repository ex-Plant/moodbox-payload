import { getPayload } from 'payload'
import config from '../src/payload.config'

const EMAIL_CONTENT_DEFAULTS = {
  surveyInvitation: {
    subject: 'Moodbox Polska — Twoja opinia jest dla nas ważna',
    title: 'Dziękujemy za skorzystanie z Moodbox Polska.',
    paragraph1:
      'Jesteśmy na etapie pilotażu i rozwijamy Moodbox w oparciu o realne doświadczenia projektantów.',
    paragraph2:
      'Twoja opinia pomaga nam lepiej zrozumieć potrzeby i kierunek dalszego rozwoju Moodboxa.',
    paragraph3: 'Wypełnienie ankiety zajmie tylko około 2–3 minut.',
    paragraph4: 'Po jej wypełnieniu otrzymasz kod rabatowy na kolejne zamówienie w Moodbox Polska.',
    buttonLabel: 'WYPEŁNIJ ANKIETĘ',
    footer: 'Zespół Moodbox Polska',
  },
  discountCode: {
    subject: 'Kod rabatowy od Moodbox Polska',
    greeting: 'Dzień dobry,',
    thankYou: 'Dziękujemy za wypełnienie ankiety.',
    codeIntro: 'Przesyłamy indywidualny kod rabatowy na kolejne zamówienie w Moodbox Polska:',
    codeActiveNote: 'Kod jest aktywny i gotowy do użycia przy składaniu zamówienia.',
    codeValidityNote: 'Ważny przez 30 dni od daty otrzymania tej wiadomości.',
    closingNote: 'Jeśli pojawią się pytania - jesteśmy do dyspozycji.',
    buttonLabel: 'ZAMÓW MOODBOX',
    footer: 'Zespół Moodbox Polska',
  },
}

async function seed() {
  console.log('🌱 Seeding email-content global...')

  const payload = await getPayload({ config })

  const result = await payload.updateGlobal({
    slug: 'email-content',
    data: EMAIL_CONTENT_DEFAULTS,
    context: {
      disableRevalidate: true,
    },
  })

  console.log('📦 Seeded data:', JSON.stringify(result, null, 2))
  console.log('✅ Email content seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
