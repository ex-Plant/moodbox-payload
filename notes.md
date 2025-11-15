revalidate by webhook ? 
two places where I am getting products


```js
import { getPayload } from 'payload';

// In your API route or server-side function
const payload = await getPayload();

await payload.sendEmail({
to: 'recipient@example.com',
subject: 'Hello from Payload',
text: 'This is a test email sent from Payload CMS using Nodemailer.',
// You can also use HTML
html: '<h1>Hello from Payload</h1><p>This is a test email sent from Payload CMS using Nodemailer.</p>'
});
```



- flex 
- grid
- DODAĆ DO TEMPLATE TAILWIND CLASS SORTING



języki
import { pl } from '@payloadcms/translations/languages/pl'
import { en } from '@payloadcms/translations/languages/en'



  localization: {
    locales: ['en', 'pl'], // required
    defaultLocale: 'pl', // required
  },
  i18n: {
    fallbackLanguage: 'pl',
    supportedLanguages: { pl, en },
    translations: {
      pl: {
        label: 'Polski',
      },
      en: {
        label: 'English',
      },
    },
  },


aby  dodać język do pola musimy mu dodać 
localized: true 

W taki sposób trłumaczymy nazwę pola:
  labels: {
    singular: {
      en: 'Delimiter',
      pl: 'Separator',
    },
    plural: {
      en: 'Delimiters',
      pl: 'Separatory',
    },
  },



  dodać main tag 