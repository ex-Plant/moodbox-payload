import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "survey_content_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "survey_content_reasons_positive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "survey_content_reasons_negative" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "survey_content_reasons_rejection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "survey_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"questions_q1_title" varchar NOT NULL,
  	"questions_q1_subtitle" varchar,
  	"questions_q2_title" varchar NOT NULL,
  	"questions_q2_subtitle" varchar,
  	"questions_q3_title" varchar NOT NULL,
  	"questions_q3_subtitle" varchar,
  	"questions_q4_title" varchar NOT NULL,
  	"questions_q4_subtitle" varchar,
  	"questions_q5_title" varchar NOT NULL,
  	"questions_q5_subtitle" varchar,
  	"questions_q6_title" varchar NOT NULL,
  	"questions_q6_subtitle" varchar,
  	"questions_q7_title" varchar NOT NULL,
  	"questions_q7_subtitle" varchar,
  	"questions_q8_title" varchar NOT NULL,
  	"questions_q8_subtitle" varchar,
  	"ui_messages_toasts_max_brands_selected" varchar NOT NULL,
  	"ui_messages_toasts_max_reasons_selected" varchar NOT NULL,
  	"ui_messages_toasts_select_at_least_one_brand" varchar NOT NULL,
  	"ui_messages_form_labels_select_brand_optional" varchar NOT NULL,
  	"ui_messages_form_labels_no_such_brand_option" varchar NOT NULL,
  	"ui_messages_form_labels_your_answer_placeholder" varchar NOT NULL,
  	"ui_messages_form_labels_which_brands" varchar NOT NULL,
  	"ui_messages_form_labels_specify_exactly" varchar NOT NULL,
  	"ui_messages_question_texts_positive_brand_question" varchar NOT NULL,
  	"ui_messages_question_texts_negative_brand_question" varchar NOT NULL,
  	"ui_messages_question_texts_select_max2" varchar NOT NULL,
  	"ui_messages_buttons_yes" varchar NOT NULL,
  	"ui_messages_buttons_no" varchar NOT NULL,
  	"ui_messages_buttons_next_step" varchar NOT NULL,
  	"ui_messages_buttons_send_survey" varchar NOT NULL,
  	"ui_messages_discount_welcome_discount_title" varchar NOT NULL,
  	"ui_messages_discount_discount_success_message" varchar NOT NULL,
  	"ui_messages_discount_discount_failure_message" varchar NOT NULL,
  	"ui_messages_dialog_thank_you_survey" varchar NOT NULL,
  	"ui_messages_dialog_your_code_is" varchar NOT NULL,
  	"ui_messages_dialog_same_code_in_email" varchar NOT NULL,
  	"ui_messages_dialog_go_to_moodbox" varchar NOT NULL,
  	"ui_messages_terms_terms_acceptance_text" varchar NOT NULL,
  	"ui_messages_errors_fix_errors_before_sending" varchar NOT NULL,
  	"ui_messages_header_welcome_message" varchar NOT NULL,
  	"ui_messages_header_survey_title" varchar NOT NULL,
  	"ui_messages_header_survey_description" varchar NOT NULL,
  	"ui_messages_header_step_label" varchar NOT NULL,
  	"ui_messages_header_step_separator" varchar NOT NULL,
  	"ui_messages_header_total_steps" varchar NOT NULL,
  	"ui_messages_completed_survey_already_completed_title" varchar NOT NULL,
  	"ui_messages_completed_survey_already_completed_thank_you" varchar NOT NULL,
  	"ui_messages_completed_survey_already_completed_instructions" varchar NOT NULL,
  	"ui_messages_completed_contact_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "survey_content_ratings" ADD CONSTRAINT "survey_content_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."survey_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "survey_content_reasons_positive" ADD CONSTRAINT "survey_content_reasons_positive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."survey_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "survey_content_reasons_negative" ADD CONSTRAINT "survey_content_reasons_negative_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."survey_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "survey_content_reasons_rejection" ADD CONSTRAINT "survey_content_reasons_rejection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."survey_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "survey_content_ratings_order_idx" ON "survey_content_ratings" USING btree ("_order");
  CREATE INDEX "survey_content_ratings_parent_id_idx" ON "survey_content_ratings" USING btree ("_parent_id");
  CREATE INDEX "survey_content_reasons_positive_order_idx" ON "survey_content_reasons_positive" USING btree ("_order");
  CREATE INDEX "survey_content_reasons_positive_parent_id_idx" ON "survey_content_reasons_positive" USING btree ("_parent_id");
  CREATE INDEX "survey_content_reasons_negative_order_idx" ON "survey_content_reasons_negative" USING btree ("_order");
  CREATE INDEX "survey_content_reasons_negative_parent_id_idx" ON "survey_content_reasons_negative" USING btree ("_parent_id");
  CREATE INDEX "survey_content_reasons_rejection_order_idx" ON "survey_content_reasons_rejection" USING btree ("_order");
  CREATE INDEX "survey_content_reasons_rejection_parent_id_idx" ON "survey_content_reasons_rejection" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "survey_content_ratings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "survey_content_reasons_positive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "survey_content_reasons_negative" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "survey_content_reasons_rejection" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "survey_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "survey_content_ratings" CASCADE;
  DROP TABLE "survey_content_reasons_positive" CASCADE;
  DROP TABLE "survey_content_reasons_negative" CASCADE;
  DROP TABLE "survey_content_reasons_rejection" CASCADE;
  DROP TABLE "survey_content" CASCADE;`)
}
