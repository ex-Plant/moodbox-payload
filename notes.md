TODO

- contact from top nav makes no sense

```js
import { getPayload } from 'payload'

// In your API route or server-side function
const payload = await getPayload()

await payload.sendEmail({
  to: 'recipient@example.com',
  subject: 'Hello from Payload',
  text: 'This is a test email sent from Payload CMS using Nodemailer.',
  // You can also use HTML
  html: '<h1>Hello from Payload</h1><p>This is a test email sent from Payload CMS using Nodemailer.</p>',
})
```

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

aby dodać język do pola musimy mu dodać
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

- dodać main tag
- test dark mode ?

W dalszej kolejności:

- check sitemaps
- check static pages

ALLLOW ROBOTS
robots contents

# \*

User-agent: _
Disallow: /admin/_

# Host

Host: http://localhost:3000

# Sitemaps

Sitemap: http://localhost:3000/sitemap.xml
Sitemap: http://localhost:3000/pages-sitemap.xml
Sitemap: http://localhost:3000/posts-sitemap.xml

Disallow: /

BRAND NEW PAGE + CHECKLIST

- SITEMAP
- BLOCK ROBOTS
  -- access control - who can delete users and so on

INCLUDE IN STARTER

- NEXT IMG SETTINGS
- NEXT IMG PLACEHOLDER

Dodawanie webhooka shopify:

Start ngrok

```text
  ngrok http 3000
```

Replace ngrok address with real address

curl -X POST "https://moodboxpl.myshopify.com/admin/api/2024-10/webhooks.json" \
 -H "X-Shopify-Access-Token: <YOUR_ADMIN_API_ACCESS_TOKEN>" \
 -H "Content-Type: application/json" \
 -d '{
"webhook": {
"topic": "orders/create",
"address": "https://feldspathic-trichotomic-ty.ngrok-free.dev/api/webhooks",
"format": "json"
}
}'

Weryfikacja:
curl -X GET "https://moodboxpl.myshopify.com/admin/api/2024-10/webhooks.json" \
 -H "X-Shopify-Access-Token: <YOUR_ADMIN_API_ACCESS_TOKEN>"

Test:
curl -X POST \
 "https://moodboxpl.myshopify.com/admin/api/2025-01/webhooks/2093890077019/test.json" \
 -H "X-Shopify-Access-Token: <YOUR_ADMIN_API_ACCESS_TOKEN>"

curl -X DELETE \
 "https://moodboxpl.myshopify.com/admin/api/2024-10/webhooks/2093890077019.json" \
 -H "X-Shopify-Access-Token: <YOUR_ADMIN_API_ACCESS_TOKEN>"

test locally - ngrok http 3000

### Order fullfiled

curl -X POST "https://moodboxpl.myshopify.com/admin/api/2024-10/webhooks.json" \
 -H "X-Shopify-Access-Token: <YOUR_ADMIN_API_ACCESS_TOKEN>" \
 -H "Content-Type: application/json" \
 -d '{
"webhook": {
"topic": "orders/fulfilled",
"address": "https://feldspathic-trichotomic-ty.ngrok-free.dev/api/webhooks/order-fulfilled",
"format": "json"
}
}'
