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
CRON_SECRET=your-cron-secret
```

# Docker

start docker locall

```zsh
docker run --name moodbox-db \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_DB=local_moodbox \
 -p 5432:5432 \
 -d postgres:17
```

# Migrations

Dump db if you want to be extra careful - on Neon free tier we have only 6 hours window to restore changes

```zsh
pg_dump <connection_string> > <dump_file_name>.sql
```

# DEV

import dumped sql file
From the directory containing the dump file:

```zsh
cat <dumped file name> | docker exec -i moodbox-db psql -U postgres -d local_moodbox
```

# DEV: Docker Iteration (The Sandbox)

1. Run app: npm run dev
2. Modify Schema: Edit your Payload Collection files.
3. Create Migration:

```zsh
dotenv -e .env.local -- npx payload migrate:create schema_overhaul_v1
```

4. Audit the generated SQL in src/migrations
5. Apply Migration:

```zsh
npm run migrate:docker
```

6. Use TablePlus etc. (localhost:5432) to verify data integrity.
7. ❗️Restore/Reset (If things break):

```zsh
    # 1. Stop & Remove old container
    docker rm -f moodbox-db
    # 2. Start fresh
    docker run --name moodbox-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=local_moodbox -p 5432:5432 -d postgres:17
    # 3. Import Dump
    cat database_backup.sql | docker exec -i moodbox-db psql -U postgres -d local_moodbox
```

# STAGING: Cloud Verification (The Safety Net)

1. Test Migration:
2. Run the migration against Neon Staging from your local machine:

```zsh
npm run migrate:staging
```

3. Verification: Open your Vercel Preview URL (which points to this Staging DB) and ensure the app works.

# PRODUCTION: Deployment (The Release)

1. Commit your code (including the new src/migrations file).
2. Push to main.

- Vercel detects the push.
- It runs the `build` script which automatically runs `payload migrate` before building the app.
- Result: The schema migrates before the new code goes live. If the migration fails, the deployment cancels automatically.
