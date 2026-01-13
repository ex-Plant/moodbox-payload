import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- 1. Drop existing tables related to orders and surveys
  DROP TABLE IF EXISTS "orders" CASCADE;
  DROP TABLE IF EXISTS "survey_responses" CASCADE;
  DROP TABLE IF EXISTS "survey_responses_brand_evaluations" CASCADE;
  DROP TABLE IF EXISTS "survey_responses_texts" CASCADE;
  DROP TABLE IF EXISTS "scheduled_emails" CASCADE;

  -- 2. Recreate "orders" with id as varchar (Shopify numeric ID)
  CREATE TABLE "orders" (
    "id" varchar PRIMARY KEY NOT NULL,
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

  -- 3. Recreate "survey_responses" linked to orders via varchar ID
  CREATE TABLE "survey_responses" (
    "id" serial PRIMARY KEY NOT NULL,
    "order_id" varchar NOT NULL,
    "customer_email" varchar NOT NULL,
    "rejected_brand" varchar,
    "rejection_other" varchar,
    "contact_request" boolean DEFAULT false,
    "missing_brands" varchar,
    "improvement_suggestion" varchar,
    "completed_at" timestamp(3) with time zone NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  -- 4. Recreate survey sub-tables
  CREATE TABLE "survey_responses_brand_evaluations" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "brand_name" varchar NOT NULL,
    "rating" numeric NOT NULL,
    "other_reason" varchar
  );

  CREATE TABLE "survey_responses_texts" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "text" varchar
  );

  -- 5. Recreate "scheduled_emails" linked to orders via varchar ID
  CREATE TABLE "scheduled_emails" (
    "id" serial PRIMARY KEY NOT NULL,
    "linked_order_id" varchar,
    "customer_email" varchar NOT NULL,
    "scheduled_at" timestamp(3) with time zone NOT NULL,
    "expires_at" timestamp(3) with time zone NOT NULL,
    "status" "enum_scheduled_emails_status" DEFAULT 'pending' NOT NULL,
    "email_type" "enum_scheduled_emails_email_type" DEFAULT 'post_purchase_questions' NOT NULL,
    "token" varchar NOT NULL,
    "is_survey_completed" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  -- 6. Add Constraints and Indexes
  ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "survey_responses_brand_evaluations" ADD CONSTRAINT "survey_responses_brand_evaluations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."survey_responses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "survey_responses_texts" ADD CONSTRAINT "survey_responses_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."survey_responses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scheduled_emails" ADD CONSTRAINT "scheduled_emails_linked_order_id_orders_id_fk" FOREIGN KEY ("linked_order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;

  CREATE UNIQUE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE UNIQUE INDEX "survey_responses_order_idx" ON "survey_responses" USING btree ("order_id");
  CREATE INDEX "survey_responses_updated_at_idx" ON "survey_responses" USING btree ("updated_at");
  CREATE INDEX "survey_responses_created_at_idx" ON "survey_responses" USING btree ("created_at");
  CREATE INDEX "survey_responses_brand_evaluations_order_idx" ON "survey_responses_brand_evaluations" USING btree ("_order");
  CREATE INDEX "survey_responses_brand_evaluations_parent_id_idx" ON "survey_responses_brand_evaluations" USING btree ("_parent_id");
  CREATE INDEX "survey_responses_texts_order_parent" ON "survey_responses_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "scheduled_emails_linked_order_idx" ON "scheduled_emails" USING btree ("linked_order_id");
  CREATE UNIQUE INDEX "scheduled_emails_token_idx" ON "scheduled_emails" USING btree ("token");
  CREATE INDEX "scheduled_emails_updated_at_idx" ON "scheduled_emails" USING btree ("updated_at");
  CREATE INDEX "scheduled_emails_created_at_idx" ON "scheduled_emails" USING btree ("created_at");

  -- Update payload_locked_documents_rels
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "orders_id" TYPE varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Logic to revert if necessary, but since we are nuking data,
  // recovery would require manual restoration or a full DB reset.
}
