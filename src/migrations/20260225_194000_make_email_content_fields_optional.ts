import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph1" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph2" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph3" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph4" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_button_label" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_footer" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_greeting" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_thank_you" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_code_intro" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_code_active_note" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_code_validity_note" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_closing_note" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_button_label" DROP NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_footer" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph1" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph2" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph3" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_paragraph4" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_button_label" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "survey_invitation_footer" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_greeting" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_thank_you" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_code_intro" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_code_active_note" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_code_validity_note" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_closing_note" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_button_label" SET NOT NULL;
  ALTER TABLE "email_content" ALTER COLUMN "discount_code_footer" SET NOT NULL;`)
}
