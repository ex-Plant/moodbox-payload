import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "clients" CASCADE;
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "clients_id";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"company_name" varchar,
  	"projects_per_year" varchar,
  	"city" varchar,
  	"project_type" varchar,
  	"completion_date" varchar,
  	"project_stage" varchar,
  	"project_area" varchar,
  	"project_budget" varchar,
  	"nip" varchar,
  	"website" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "clients_id" integer;
  CREATE UNIQUE INDEX "clients_email_idx" ON "clients" USING btree ("email");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");`)
}
