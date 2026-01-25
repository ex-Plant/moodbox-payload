import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_shopify_cart_block" DROP COLUMN "fixed_price_label";
  ALTER TABLE "_pages_v_blocks_shopify_cart_block" DROP COLUMN "fixed_price_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_shopify_cart_block" ADD COLUMN "fixed_price_label" varchar;
  ALTER TABLE "_pages_v_blocks_shopify_cart_block" ADD COLUMN "fixed_price_label" varchar;`)
}
