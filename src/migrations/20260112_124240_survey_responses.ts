import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "survey_responses" ALTER COLUMN "completed_at" SET NOT NULL;
  ALTER TABLE "survey_responses" ADD COLUMN "customer_email" varchar NOT NULL;
  ALTER TABLE "survey_responses" ADD COLUMN "rejected_brand" varchar;
  ALTER TABLE "survey_responses" ADD COLUMN "rejection_other" varchar;
  ALTER TABLE "survey_responses" ADD COLUMN "contact_request" boolean DEFAULT false;
  ALTER TABLE "survey_responses" ADD COLUMN "missing_brands" varchar;
  ALTER TABLE "survey_responses" ADD COLUMN "improvement_suggestion" varchar;
  ALTER TABLE "survey_responses_brand_evaluations" ADD CONSTRAINT "survey_responses_brand_evaluations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."survey_responses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "survey_responses_texts" ADD CONSTRAINT "survey_responses_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."survey_responses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "survey_responses_brand_evaluations_order_idx" ON "survey_responses_brand_evaluations" USING btree ("_order");
  CREATE INDEX "survey_responses_brand_evaluations_parent_id_idx" ON "survey_responses_brand_evaluations" USING btree ("_parent_id");
  CREATE INDEX "survey_responses_texts_order_parent" ON "survey_responses_texts" USING btree ("order","parent_id");
  ALTER TABLE "survey_responses" DROP COLUMN "responses";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "survey_responses_brand_evaluations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "survey_responses_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "survey_responses_brand_evaluations" CASCADE;
  DROP TABLE "survey_responses_texts" CASCADE;
  ALTER TABLE "survey_responses" ALTER COLUMN "completed_at" DROP NOT NULL;
  ALTER TABLE "survey_responses" ADD COLUMN "responses" jsonb;
  ALTER TABLE "survey_responses" DROP COLUMN "customer_email";
  ALTER TABLE "survey_responses" DROP COLUMN "rejected_brand";
  ALTER TABLE "survey_responses" DROP COLUMN "rejection_other";
  ALTER TABLE "survey_responses" DROP COLUMN "contact_request";
  ALTER TABLE "survey_responses" DROP COLUMN "missing_brands";
  ALTER TABLE "survey_responses" DROP COLUMN "improvement_suggestion";`)
}
