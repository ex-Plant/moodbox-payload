# 📧 Email System

## 📧 Email Templates

Modular system for brand-consistent emails.

### 📍 Key Locations

- **Logic**: `src/utilities/email_templates`
- **Preview**: `/email-previews`
- **Constants**: `email_templates_constants.ts` (Colors, Logo & Types)

### ➕ Add New Template

1. Create `src/utilities/email_templates/templates/name.ts`:

```typescript
import { EmailItemT } from '../email_templates_constants'
import { renderEmailTemplate } from '../render_email_template'

export function generateNameEmailHTML(data: any) {
  return renderEmailTemplate({
    title: 'Title',
    items: [
      { type: 'text', content: 'Body', marginBottom: '10px' },
      { type: 'button', label: 'CTA', url: '...' },
    ],
  })
}
```

2. Register in `src/app/(frontend)/email-previews/page.tsx`.

### 🛠️ Item Types

- `text`: `{ content, bold?, marginBottom? }`
- `button`: `{ label, url }`
- `raw`: `{ html }` (For manual tweaks)

## 📅 Scheduled Emails

Automated post-purchase customer feedback system.

### 🔄 Workflow

1. **Order Fulfillment** (`handleOrderFulfilled.ts`):
   - Shopify webhook triggers when order is fulfilled
   - Creates scheduled email record with secure token
   - Scheduled immediately, expires in 7 days

2. **Manual Sending** (`TriggerSendingScheduledEmails.tsx`):
   - Admin selects emails in `/admin/collections/scheduled-emails`
   - Click "Wyślij do wybranych (X)" button
   - Requires at least one selection

3. **Automated Sending** (`sendScheduledEmail.ts`):
   - Cron job at `/api/cron/send-feedback-emails`
   - Sends due emails + cleans up expired ones

### 🎯 Key Features

- **Dual Modes**: Manual selective + automated cron
- **Security**: HMAC tokens with 14-day expiration
- **Status Tracking**: pending → sent/failed
- **Error Recovery**: Failed emails can be manually retried
- **Idempotency**: Prevents duplicate emails per order

### 📊 Admin Monitoring

- View all scheduled emails in collection
- Status indicators (pending/sent/failed/cancelled)
- Manual retry for failed emails
- Real-time feedback on send operations

### 🔧 Technical Details

#### Core Functions

- `handleOrderFulfilled()` - Creates scheduled emails
- `sendEmailsManually(ids[])` - Manual selective sending
- `sendScheduledEmail()` - Automated cron processing
- `sendAndUpdateCollection()` - Shared sending logic

#### Environment Variables

```env
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
TOKEN_SECRET=your-secure-random-secret
CRON_SECRET=your-cron-secret
```
