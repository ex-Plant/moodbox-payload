import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // 1. Add column as nullable first
  await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "test_required" varchar;`)

  // 2. Populate existing rows
  await db.execute(
    sql`UPDATE "users" SET "test_required" = 'initial_value' WHERE "test_required" IS NULL;`,
  )

  // 3. Now enforce NOT NULL
  await db.execute(sql`ALTER TABLE "users" ALTER COLUMN "test_required" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "users" DROP COLUMN IF EXISTS "test_required";`)
}
