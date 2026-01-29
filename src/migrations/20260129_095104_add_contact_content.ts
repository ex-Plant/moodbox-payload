import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contact_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header" varchar DEFAULT 'Skontaktuj się z nami' NOT NULL,
  	"subject_placeholder" varchar DEFAULT 'Temat' NOT NULL,
  	"message_placeholder" varchar DEFAULT 'Treść wiadomości' NOT NULL,
  	"email_placeholder" varchar DEFAULT 'Twój email' NOT NULL,
  	"button_text" varchar DEFAULT 'Wyślij' NOT NULL,
  	"rich_text" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contact_content" CASCADE;`)
}
