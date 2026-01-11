import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "orders" (
     "id" serial PRIMARY KEY NOT NULL,
     "order_id" varchar NOT NULL,
     "has_survey" boolean DEFAULT false,
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
     "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );
   
   CREATE TABLE "survey_responses" (
     "id" serial PRIMARY KEY NOT NULL,
     "order_id" integer NOT NULL,
     "responses" jsonb,
     "completed_at" timestamp(3) with time zone,
     "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   ALTER TABLE "scheduled_emails" ADD COLUMN "linked_order_id" integer;
   
   CREATE UNIQUE INDEX "orders_order_id_idx" ON "orders" USING btree ("order_id");
   CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
   CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
   
   CREATE UNIQUE INDEX "survey_responses_order_idx" ON "survey_responses" USING btree ("order_id");
   CREATE INDEX "survey_responses_updated_at_idx" ON "survey_responses" USING btree ("updated_at");
   CREATE INDEX "survey_responses_created_at_idx" ON "survey_responses" USING btree ("created_at");

   ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "scheduled_emails" ADD CONSTRAINT "scheduled_emails_linked_order_id_orders_id_fk" FOREIGN KEY ("linked_order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
   
   CREATE UNIQUE INDEX "scheduled_emails_linked_order_idx" ON "scheduled_emails" USING btree ("linked_order_id");
   
   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "orders_id" integer;
   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "survey_responses_id" integer;
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_survey_responses_fk" FOREIGN KEY ("survey_responses_id") REFERENCES "public"."survey_responses"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
   CREATE INDEX "payload_locked_documents_rels_survey_responses_id_idx" ON "payload_locked_documents_rels" USING btree ("survey_responses_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "orders" CASCADE;
   DROP TABLE "survey_responses" CASCADE;
   ALTER TABLE "scheduled_emails" DROP COLUMN "linked_order_id";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "orders_id";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "survey_responses_id";
  `)
}
