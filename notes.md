
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
