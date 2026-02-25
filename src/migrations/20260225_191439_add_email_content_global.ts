import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "email_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"survey_invitation_subject" varchar DEFAULT 'Moodbox Polska — Twoja opinia jest dla nas ważna' NOT NULL,
  	"survey_invitation_title" varchar DEFAULT 'Dziękujemy za skorzystanie z Moodbox Polska.' NOT NULL,
  	"survey_invitation_paragraph1" varchar DEFAULT 'Jesteśmy na etapie pilotażu i rozwijamy Moodbox w oparciu o realne doświadczenia projektantów.' NOT NULL,
  	"survey_invitation_paragraph2" varchar DEFAULT 'Twoja opinia pomaga nam lepiej zrozumieć potrzeby i kierunek dalszego rozwoju Moodboxa.' NOT NULL,
  	"survey_invitation_paragraph3" varchar DEFAULT 'Wypełnienie ankiety zajmie tylko około 2–3 minut.' NOT NULL,
  	"survey_invitation_paragraph4" varchar DEFAULT 'Po jej wypełnieniu otrzymasz kod rabatowy na kolejne zamówienie w Moodbox Polska.' NOT NULL,
  	"survey_invitation_button_label" varchar DEFAULT 'WYPEŁNIJ ANKIETĘ' NOT NULL,
  	"survey_invitation_footer" varchar DEFAULT 'Zespół Moodbox Polska' NOT NULL,
  	"discount_code_subject" varchar DEFAULT 'Kod rabatowy od Moodbox Polska' NOT NULL,
  	"discount_code_greeting" varchar DEFAULT 'Dzień dobry,' NOT NULL,
  	"discount_code_thank_you" varchar DEFAULT 'Dziękujemy za wypełnienie ankiety.' NOT NULL,
  	"discount_code_code_intro" varchar DEFAULT 'Przesyłamy indywidualny kod rabatowy na kolejne zamówienie w Moodbox Polska:' NOT NULL,
  	"discount_code_code_active_note" varchar DEFAULT 'Kod jest aktywny i gotowy do użycia przy składaniu zamówienia.' NOT NULL,
  	"discount_code_code_validity_note" varchar DEFAULT 'Ważny przez 30 dni od daty otrzymania tej wiadomości.' NOT NULL,
  	"discount_code_closing_note" varchar DEFAULT 'Jeśli pojawią się pytania - jesteśmy do dyspozycji.' NOT NULL,
  	"discount_code_button_label" varchar DEFAULT 'ZAMÓW MOODBOX' NOT NULL,
  	"discount_code_footer" varchar DEFAULT 'Zespół Moodbox Polska' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "email_content" CASCADE;`)
}
