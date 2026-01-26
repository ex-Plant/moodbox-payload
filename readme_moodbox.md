# 🛒 Order Management & Email System

## 🏛️ System Architecture

Moodbox operates on a **hybrid e-commerce architecture** that leverages two specialized platforms:

### 🎯 Platform Responsibilities

#### Shopify (E-commerce Engine)

**Handles all customer-facing commerce operations:**

- Product catalog and inventory management
- Shopping cart and checkout process
- Payment processing and order fulfillment
- Customer account management
- Newsletter subscription capture during checkout
- Tax calculation and shipping
- Order status management

#### Payload CMS (Admin & Analytics Backend)

**Handles business intelligence and customer engagement:**

- Order data aggregation and reporting
- Customer survey collection and analysis
- Automated email campaigns and scheduling
- Discount code generation and management
- Newsletter subscriber management
- Admin dashboard and content management
- Survey response analytics

### 🔄 Integration Philosophy

**Shopify = Transaction Processing | Payload = Customer Lifecycle Management**

- **Shopify**: Optimized for high-volume e-commerce transactions
- **Payload**: Optimized for complex data relationships and automated workflows
- **Webhooks**: Real-time data synchronization between platforms
- **API Calls**: Programmatic discount creation and order enrichment

## 🎯 Complete Customer Journey

### 🔄 Data Flow Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Customer      │     │    Shopify      │     │    Payload      │
│   Frontend      │────▶│   Checkout      │────▶│   CMS Backend   │
│                 │     │   Processing    │     │   Processing    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
   Cart Form ───────────▶ Webhook ────────────▶ Survey Email
   (Next.js)            (orders/create)       (7 days later)

                                              ┌─────────────────┐
                                              │  Survey Response │
                                              │  + Discount Gen  │
                                              └─────────────────┘
```

### 📊 System Integration Points

#### Real-time Webhooks

- **orders/create**: Order data + newsletter signup → Payload
- **orders/fulfilled**: Trigger survey email scheduling

#### Programmatic API Calls

- **Discount Creation**: Payload → Shopify Admin API
- **Order Sync**: Payload → Shopify Admin API (manual/bulk)

#### Data Synchronization

- **Source of Truth**: Shopify owns order transactions
- **Analytics Hub**: Payload owns customer insights
- **Newsletter**: Dual-managed (Shopify capture → Payload storage)

## 📦 Order Creation Process

1. **Cart Form** (`CartForm.tsx`):
   - Customer fills out form with personal details and consents
   - Form validates using `cartSchema` (Zod validation)
   - Calls `checkoutA()` action

2. **Checkout Action** (`checkoutA.ts`):
   - Validates form data against schema
   - Maps form fields to Shopify attributes using `ATTRIBUTE_KEY_PL`
   - Creates Shopify cart with:
     - Selected products from cart
     - Fixed fee product ("box-stala-cena")
     - Customer attributes (Polish field names)
   - Redirects to Shopify checkout URL

3. **Shopify Checkout**:
   - Customer completes payment on Shopify
   - Newsletter checkbox: "Chcę być na bieżąco z nowościami Moodbox"
   - Order created in Shopify

### 🔗 Webhook Processing

4. **Order Created Webhook** (`/api/webhooks/order-created`):
   - Receives `orders/create` webhook from Shopify
   - Extracts `buyer_accepts_marketing` boolean from newsletter checkbox
   - Creates/updates order record in Payload CMS
   - **Newsletter Signup**: If checkbox checked, adds email to newsletter collection
   - Maps custom attributes back to English field names

5. **Order Fulfilled Webhook** (`/api/webhooks/order-fulfilled`):
   - Triggers when order status changes to "fulfilled"
   - Creates scheduled email record with secure token
   - Links to original order for survey data
   - Schedules feedback email 7 days later (expires 14 days)

### 📧 Email & Survey System

6. **Automated Email Sending** (`/api/cron/send-feedback-emails`):
   - Cron job processes due emails (status: pending, scheduledAt <= now)
   - Generates secure survey link with HMAC token
   - Sends post-purchase feedback email

7. **Survey Response** (`submitSurveyA.ts`):
   - Customer clicks survey link → validates token
   - Submits detailed brand feedback survey
   - **Discount Code Creation**: Generates 10% off discount via `createDiscountA()`
   - Sends discount code email to customer
   - Updates order record with survey completion flag

### 💰 Discount Code System

#### Creation Flow

- **Trigger**: Survey submission (`submitSurveyA.ts`)
- **Generation**: `createDiscountA()` creates unique 6-character code (MOODBOX prefix)
- **Shopify API**: Uses `discountCodeBasicCreate` mutation
- **Configuration**:
  - 10% off entire order
  - Single use per customer
  - 30-day expiration
  - Available on all products

#### Technical Details

- **GraphQL Mutation**: `CREATE_DISCOUNT_CODE_MUTATION` in `adminQueries.ts`
- **API Function**: `createDiscountCode()` in `adminApi.ts`
- **Token Generation**: `generateHexToken(6, 'MOODBOX')`

## 🔗 Webhook Management System

### 📋 Overview

The webhook management system provides a secure, user-friendly interface for managing Shopify webhooks without manual curl commands.

### 🎯 Features

#### Webhook Operations

- **List Webhooks**: View all configured webhooks with details (ID, topic, address, format, creation date)
- **Create Webhooks**: Add new webhooks with custom topics and addresses
- **Delete Webhooks**: Remove unwanted webhooks by ID

#### Security & Access

- **Admin Authentication**: Requires login to Payload CMS admin panel
- **Server-side API Calls**: All Shopify API interactions happen securely on the server
- **HMAC Verification**: Webhook payloads are cryptographically verified

### 🚀 Usage

#### Accessing Webhook Manager

Navigate to `/api/webhooks` in your browser while logged into the admin panel.

#### Common Webhook Topics

```
orders/create           - New order placed
orders/fulfilled        - Order marked as fulfilled
products/update         - Product information changed
products/create         - New product added
products/delete         - Product removed
inventory_levels/update - Product quantity/inventory changed
```

#### Product Data Synchronization

When products or inventory are modified in Shopify, the system ensures real-time data consistency:

1. **Webhook Trigger**: Product changes (`products/update`, `products/create`, `products/delete`) or inventory changes (`inventory_levels/update`) fire webhooks
2. **Cache Invalidation**: `/api/webhooks/products-updated` endpoint receives the webhook
3. **HMAC Verification**: Webhook authenticity is cryptographically verified
4. **Cache Revalidation**: Next.js cache tags for `collections` and `products` are invalidated
5. **Fresh Data**: Subsequent page loads fetch updated product information and current inventory levels from Shopify
6. **Frontend Update**: Product listings, collections, and availability indicators display current data

**Benefits:**

- **Real-time Updates**: Product changes appear immediately without manual cache clearing
- **Performance**: Efficient cache invalidation prevents stale data issues
- **Reliability**: HMAC verification ensures webhook authenticity
- **Scalability**: Cache revalidation works across multiple server instances

### 🔧 Configuration

#### Environment Variables

```env
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_token_here
SHOPIFY_ADMIN_API_URL=https://your-store.myshopify.com/admin/api/2024-10
```

#### Webhook Endpoints

- `/api/webhooks` - Management interface
- `/api/webhooks/list` - List all webhooks
- `/api/webhooks/create` - Create new webhook
- `/api/webhooks/delete/[id]` - Delete webhook by ID
- `/api/webhooks/products-updated` - Product and inventory change handler
- `/api/webhooks/order-fulfilled` - Order fulfillment handler
- `/api/webhooks/order-created` - New order handler

## 📊 Data Synchronization

### Manual Sync (`SyncOrdersButton.tsx`)

- **Purpose**: One-time bulk import of existing Shopify orders
- **Process**: `syncOrdersA()` fetches all orders via Admin API
- **Status**: Currently disabled (`return null`)
- **Use Case**: Initial data migration or emergency sync

### Webhook vs Manual Sync

- **Webhook**: Real-time, handles new orders automatically
- **Manual**: Bulk operations, historical data import
- **Data Mapping**: Both use same attribute mapping (`ATTRIBUTE_KEY_PL`)

## 🏗️ Architecture Components

### Core Collections (Payload CMS)

- `orders` - Order records with customer data (mirrored from Shopify)
- `scheduled-emails` - Pending/processed email queue with HMAC tokens
- `survey-responses` - Detailed customer feedback and brand evaluations
- `newsletter` - Email marketing subscribers (captured at checkout)

### Shopify API Layers

- **Storefront API**: Product browsing, cart creation, checkout
- **Admin API**: Order management, discount codes, customer data
- **Webhooks**: Real-time order status updates and events

## 💡 Why This Architecture?

### 🎯 Strategic Benefits

#### Shopify Advantages

- **Battle-tested**: Handles millions of transactions daily
- **Compliance**: Built-in tax, shipping, and payment compliance
- **Scalability**: Automatic scaling for traffic spikes
- **Features**: Rich e-commerce features (abandoned cart, etc.)
- **Reliability**: 99.9% uptime SLA

#### Payload CMS Advantages

- **Flexibility**: Custom data models for complex relationships
- **Automation**: Advanced workflow and email scheduling
- **Analytics**: Rich querying and reporting capabilities
- **Integration**: Easy API integrations with external services
- **Developer Experience**: Modern React-based admin interface

### 🔒 Risk Mitigation

#### Separation of Concerns

- **Shopify Outage**: Orders still process, data syncs when service restored
- **Payload Issues**: E-commerce continues, webhooks queue automatically
- **Independent Scaling**: Each system scales based on its workload
- **Technology Evolution**: Can upgrade either platform independently

#### Data Redundancy

- **Shopify**: Primary order/transaction data
- **Payload**: Analytical copy with additional metadata
- **Newsletter**: Dual capture (Shopify + Payload forms)
- **Surveys**: Rich feedback data not available in Shopify

### Key Files

```
src/
├── app/actions/
│   ├── checkoutA.ts          # Cart → Shopify checkout
│   ├── createDiscountA.ts    # Generate discount codes
│   ├── submitSurveyA.ts      # Process survey responses
│   └── syncOrdersA.ts        # Bulk order import
├── app/api/webhooks/
│   ├── order-created/        # Order + newsletter processing
│   └── order-fulfilled/      # Schedule feedback emails
├── lib/shopify/
│   ├── queries.ts            # Storefront GraphQL queries
│   ├── adminQueries.ts       # Admin API queries
│   └── adminApi.ts           # Admin API functions
└── components/
    ├── SyncOrdersButton.tsx  # Manual sync UI
    └── _custom_moodbox/home/cart/CartForm.tsx  # Order form
```

## 🔧 Operational Procedures

### 📊 Monitoring & Maintenance

#### Daily Checks

- **Shopify Orders**: Verify webhook delivery in Shopify admin
- **Payload Dashboard**: Check scheduled emails queue
- **Email Delivery**: Monitor bounce rates and delivery status
- **Survey Completion**: Track survey response rates

#### Weekly Maintenance

- **Data Sync**: Spot-check order data consistency
- **Discount Codes**: Review generated codes in Shopify
- **Newsletter Growth**: Analyze subscriber acquisition
- **Survey Analytics**: Review customer feedback trends

### 🚨 Troubleshooting Guide

#### Webhook Failures

```
Problem: Orders not appearing in Payload
Solution:
1. Check Shopify webhook delivery status
2. Verify webhook URLs in Shopify admin
3. Review Payload logs for webhook processing errors
4. Use manual sync as fallback: SyncOrdersButton
```

#### Email Delivery Issues

```
Problem: Survey emails not sending
Solution:
1. Check cron job execution in hosting provider
2. Verify CRON_SECRET environment variable
3. Review scheduled-emails collection for stuck records
4. Check email service provider status
```

#### Discount Code Problems

```
Problem: Codes not working in Shopify
Solution:
1. Verify discount creation in Shopify admin
2. Check API permissions for discount creation
3. Review createDiscountA() logs for errors
4. Test code manually in Shopify checkout
```

#### Data Inconsistencies

```
Problem: Order data mismatch between systems
Solution:
1. Use SyncOrdersButton for bulk reconciliation
2. Check webhook payload parsing logic
3. Verify ATTRIBUTE_KEY_PL mapping consistency
4. Manual data correction in Payload admin
```

### 📈 Performance Optimization

#### Shopify Optimization

- Minimize custom attributes (affects checkout performance)
- Use efficient GraphQL queries
- Implement proper error handling for API calls

#### Payload Optimization

- Use database indexes on frequently queried fields
- Implement proper caching for survey forms
- Monitor cron job execution times
- Optimize email template rendering

## 🔧 Environment Variables

```env
# Email Configuration
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
CRON_SECRET=your-cron-secret

# Shopify API
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=storefront-api-token
SHOPIFY_ADMIN_API_ACCESS_TOKEN=admin-api-token
SHOPIFY_WEBHOOK_SECRET=webhook-secret
```

## ⚙️ Shopify Configuration

### Required Webhooks

Set up in Shopify Admin → Settings → Notifications → Webhooks:

**Product & Inventory Webhooks:**

- `products/update` → `https://your-domain.com/api/webhooks/products-updated`
- `products/create` → `https://your-domain.com/api/webhooks/products-updated`
- `products/delete` → `https://your-domain.com/api/webhooks/products-updated`
- `inventory_levels/update` → `https://your-domain.com/api/webhooks/products-updated`

**Order Webhooks:**

- `orders/create` → `https://your-domain.com/api/webhooks/order-created`
- `orders/fulfilled` → `https://your-domain.com/api/webhooks/order-fulfilled`

```
Event: Order creation
URL: https://yourdomain.com/api/webhooks/order-created
Format: JSON
Secret: [SHOPIFY_WEBHOOK_SECRET]
```

```
Event: Order fulfillment
URL: https://yourdomain.com/api/webhooks/order-fulfilled
Format: JSON
Secret: [SHOPIFY_WEBHOOK_SECRET]
```

### Checkout Settings

**Online Store → Themes → Customize → Checkout:**

1. **Email Marketing Section**:
   - Enable email marketing checkbox
   - Set text to: `Chcę być na bieżąco z nowościami Moodbox`
   - Position: After customer information (recommended)

2. **Additional Scripts** (if needed):
   - Add custom tracking or validation scripts

### API Permissions

**Apps → [Your App] → API Permissions:**

Required Admin API scopes:

- `read_orders` - Access order data
- `write_discounts` - Create discount codes
- `read_inventory` - Access inventory levels (for inventory webhooks)
- `read_customers` - Customer data access
- `write_content` - Metafield management (if used)

Required Storefront API scopes:

- `unauthenticated_read_product_listings` - Product browsing
- `unauthenticated_read_product_inventory` - Stock levels
- `unauthenticated_write_checkouts` - Cart/checkout creation

### Homepage Redirect to Custom Frontend

To seamlessly redirect customers from the default Shopify storefront to your custom Next.js/Payload CMS frontend, modify the Shopify theme template:

**Access Theme Editor:**

- Navigate to [Shopify Admin → Online Store → Themes](https://admin.shopify.com/store/moodboxpl/themes/188348531035)
- Click "Edit code" on your live theme
- Open `layout/theme.liquid`

**Add Redirect Code:**
Insert this code block at the beginning of the `<head>` section:

```liquid
{% if template == 'index' %}
  <meta http-equiv="refresh" content="0; url=https://moodbox.pl">
  <style>body{opacity:0;}</style>
  <script>
    window.location.replace('https://moodbox.pl');
  </script>
{% endif %}
```

**How it works:**

- **Template Check**: Only redirects when viewing the homepage (`template == 'index'`)
- **Multiple Methods**: Uses meta refresh, CSS opacity, and JavaScript redirect for maximum compatibility
- **Seamless UX**: Customers visiting your Shopify domain are instantly redirected to the custom frontend
- **Preserves Other Pages**: Product pages, collections, and checkout remain on Shopify

### Products Setup

- **Fixed Fee Product**: Create "box-stala-cena" product for shipping/tax handling
- **Product Metafields**: Configure `brand` metafield for survey analytics
- **Inventory**: Ensure products are available for purchase

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

# Docker

```zsh
# start docker with config from docker-compose.yml = start db
docker compose up -d

# Container stops, but db_data volume remains with your database
docker compose down

# Container stops AND volume deletes - use only when you want clean slate = data loss
docker compose down -v

# Check container status
docker ps

# view logs
docker compose logs postgres

# connect to db directly
docker exec -it moodbox-db psql -U postgres -d local_moodbox


```

# Migrations

Dump db if you want to be extra careful - on Neon free tier we have only 6 hours window to restore changes

```zsh

```

```zsh
# create dump
docker run --rm  <CONNECTION_STRING> > cloud_prod.dump

# remove old tables
docker exec -it moodbox-db psql -U postgres -d local_moodbox -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# add dumped data
docker exec -i moodbox-db pg_restore -U postgres -d local_moodbox --no-owner --no-privileges < cloud_prod.dump

```

--rm: Deletes this "worker" container as soon as the dump is finished.
--clean: CRITICAL. This drops existing tables in your local DB before recreating them, ensuring you don't get "already exists" errors.
--no-owner: Skip setting original cloud users as owners (since your local user is just postgres)
--no-privileges (or -x): Skips the GRANT/REVOKE and ALTER DEFAULT PRIVILEGES commands. Since you are the only developer on your local machine using the postgres user, you don't need the production permission logic.
--no-owner: You already have this, which prevents errors about the cloud_admin user not owning the tables.

# DEV

import dumped sql file
From the directory containing the dump file:

# see

```zsh

cat <dumped file name> | docker exec -i moodbox-db psql -U postgres -d local_moodbox
```

# DEV: Docker Iteration (The Sandbox)

1. Run app: npm run dev
2. Modify Schema: Edit your Payload Collection files.#U
3. Create Migration:

```zsh
pnpm run migrate:create <migration name>
```

# get migration status

Change env to see status for a particular environment

```zsh
pnpm exec dotenv -e .env.local -- payload migrate:status
```

4. Audit the generated SQL in src/migrations
5. Apply Migration:

```zsh
npm run migrate:docker
```

6. Use TablePlus etc. (localhost:5432) to verify data integrity.

7. ❗️Restore/Reset (If things break):

```zsh
# This command deletes all the data!
docker compose down -v && docker compose up -d
cat [your_dump_file].sql | docker exec -i moodbox-db psql -U postgres -d local_moodbox
```

# STAGING: Cloud Verification (The Safety Net)

1. Push files to staging, it will trigger migration on staging neon db.

2. Verification: Open your Vercel Preview URL (which points to this Staging DB) and ensure the app works.

# PRODUCTION: Deployment (The Release)

1. Commit your code (including the new src/migrations file).
2. Push to main.

- Vercel detects the push.
- It runs the `build` script which automatically runs `payload migrate` before building the app.
- Result: The schema migrates before the new code goes live. If the migration fails, the deployment cancels automatically.
