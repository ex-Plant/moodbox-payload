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

Dump db if you want to be extra carefule - on Neon free tier we have only 6 hours window to restore changes

```zsh
pg_dump <connection_string> > <dump_file_name>.sql
```

# DEV import dumped sql file

From the dir tha dumped file is

```zsh
cat <dumped file name> | docker exec -i moodbox-db psql -U postgres -d local_moodbox
```

0. PREREQUISITES (One-time Setup)

A. File Structure:

✅ Create these files in your root (and .gitignore them):

- .env.local -> POSTGRES_URL="postgres://postgres:postgres@localhost:5432/local_moodbox"
- .env.staging -> POSTGRES_URL="[NEON_STAGING_BRANCH_URL]"
- .env.production -> POSTGRES_URL="[NEON_MAIN_URL]" (Optional, for manual emergencies)

B. Package Scripts:

Update package.json:

    "scripts": {
      "dev:docker": "dotenv -e .env.local -- payload dev",
      "migrate:docker": "dotenv -e .env.local -- payload migrate",
      "migrate:staging": "dotenv -e .env.staging -- payload migrate",
      "build": "payload migrate && next build"
    }

---

1. DEV: Docker Iteration (The Sandbox)

A. Restore/Reset (If things break):

    # 1. Stop & Remove old container
    docker rm -f moodbox-db

    # 2. Start fresh
    docker run --name moodbox-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=local_moodbox -p 5432:5432 -d postgres:17

    # 3. Import Dump
    cat database_backup.sql | docker exec -i moodbox-db psql -U postgres -d local_moodbox

B. Develop:

1. Run app: npm run dev:docker

2. Modify Schema: Edit your Payload Collection files.

C. Create Migration:

    # Explicitly use local env to generate based on Docker state
    dotenv -e .env.local -- npx payload migrate:create schema_overhaul_v1

D. Audit SQL:

- Open src/migrations/xxxx_schema_overhaul_v1.ts.

- Check: Look for DROP COLUMN. Did you rename something? Change it to RENAME COLUMN.

E. Apply & Verify:

    npm run migrate:docker

- Use TablePlus (localhost:5432) to verify data integrity.

---

2. STAGING: Cloud Verification (The Safety Net)

A. Prepare Cloud:

1. Go to Neon Console -> Branches.

2. Ensure a staging branch exists (reset/create from main if it's stale).

3. Ensure .env.staging has the correct URL for this branch.

B. Test Migration:

Run the migration against Neon Staging from your local machine:

    npm run migrate:staging

- Verification: Open your Vercel Preview URL (which points to this Staging DB) and ensure the app works.

---

3. PRODUCTION: Deployment (The Release)

A. Vercel Configuration (One-time):

Ensure Vercel Environment Variables are set:

- Production Column: POSTGRES_URL = [Neon Main URL]

- Preview Column: POSTGRES_URL = [Neon Staging URL]

B. Deploy:

1. Commit your code (including the new src/migrations file).

2. Push to main.

C. Automation:

- Vercel detects the push.

- It runs your updated build script: "payload migrate && next build".

- Result: The schema migrates before the new code goes live. If the migration fails, the deployment cancels automatically.
