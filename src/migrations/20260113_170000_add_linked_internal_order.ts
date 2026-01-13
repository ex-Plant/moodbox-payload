import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "scheduled_emails" ADD COLUMN IF NOT EXISTS "linked_internal_order" varchar;
    ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "linked_internal_order" varchar;
    ALTER TABLE "survey_responses" ADD COLUMN IF NOT EXISTS "linked_internal_order" varchar;

    CREATE UNIQUE INDEX IF NOT EXISTS "scheduled_emails_linked_internal_order_idx" 
      ON "scheduled_emails" USING btree ("linked_internal_order");
    CREATE UNIQUE INDEX IF NOT EXISTS "orders_linked_internal_order_idx" 
      ON "orders" USING btree ("linked_internal_order");
    CREATE UNIQUE INDEX IF NOT EXISTS "survey_responses_linked_internal_order_idx" 
      ON "survey_responses" USING btree ("linked_internal_order");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "scheduled_emails_linked_internal_order_idx";
    DROP INDEX IF EXISTS "orders_linked_internal_order_idx";
    DROP INDEX IF EXISTS "survey_responses_linked_internal_order_idx";
    ALTER TABLE "scheduled_emails" DROP COLUMN IF EXISTS "linked_internal_order";
    ALTER TABLE "orders" DROP COLUMN IF EXISTS "linked_internal_order";
    ALTER TABLE "survey_responses" DROP COLUMN IF EXISTS "linked_internal_order";
  `)
}
