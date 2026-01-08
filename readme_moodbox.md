# 📧 Email Templates

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
