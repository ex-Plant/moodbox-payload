import Contact from '@/components/_custom_moodbox/Contact'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { ContactContent } from '@/payload-types'

const DEFAULT_CONTACT_CONTENT: Omit<ContactContent, 'id'> = {
  header: 'Skontaktuj się z nami',
  subjectPlaceholder: 'Temat',
  messagePlaceholder: 'Treść wiadomości',
  emailPlaceholder: 'Twój email',
  buttonText: 'Wyślij',
}

export default async function Kontakt() {
  const contactContent =
    ((await getCachedGlobal('contact-content')()) as ContactContent) ?? DEFAULT_CONTACT_CONTENT

  return (
    <Contact
      header={contactContent.header}
      subjectPlaceholder={contactContent.subjectPlaceholder}
      messagePlaceholder={contactContent.messagePlaceholder}
      emailPlaceholder={contactContent.emailPlaceholder}
      buttonText={contactContent.buttonText}
      richText={contactContent.richText}
    />
  )
}
