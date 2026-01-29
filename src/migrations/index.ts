import * as migration_20260109_190321_initial_setup from './20260109_190321_initial_setup';
import * as migration_20260110_110904_local_test_migration from './20260110_110904_local_test_migration';
import * as migration_20260110_111500_fix_missing_test_column from './20260110_111500_fix_missing_test_column';
import * as migration_20260110_112644_remove_test_fields from './20260110_112644_remove_test_fields';
import * as migration_20260110_112741_add_required_field from './20260110_112741_add_required_field';
import * as migration_20260111_121506_create_orders from './20260111_121506_create_orders';
import * as migration_20260111_121541_remove_clients from './20260111_121541_remove_clients';
import * as migration_20260112_124240_survey_responses from './20260112_124240_survey_responses';
import * as migration_20260112_161045_survey_adjustments from './20260112_161045_survey_adjustments';
import * as migration_20260113_102117_shopify_order_id_as_primary_key from './20260113_102117_shopify_order_id_as_primary_key';
import * as migration_20260113_170000_add_linked_internal_order from './20260113_170000_add_linked_internal_order';
import * as migration_20260122_201205_add_user_role from './20260122_201205_add_user_role';
import * as migration_20260125_191732_remove_fixed_price_label from './20260125_191732_remove_fixed_price_label';
import * as migration_20260126_140530_add_poster_to_video_ from './20260126_140530_add_poster_to_video_';
import * as migration_20260127_152042_add_survey_content_global from './20260127_152042_add_survey_content_global';
import * as migration_20260127_155319_add_discount_percentage from './20260127_155319_add_discount_percentage';
import * as migration_20260129_095104_add_contact_content from './20260129_095104_add_contact_content';

export const migrations = [
  {
    up: migration_20260109_190321_initial_setup.up,
    down: migration_20260109_190321_initial_setup.down,
    name: '20260109_190321_initial_setup',
  },
  {
    up: migration_20260110_110904_local_test_migration.up,
    down: migration_20260110_110904_local_test_migration.down,
    name: '20260110_110904_local_test_migration',
  },
  {
    up: migration_20260110_111500_fix_missing_test_column.up,
    down: migration_20260110_111500_fix_missing_test_column.down,
    name: '20260110_111500_fix_missing_test_column',
  },
  {
    up: migration_20260110_112644_remove_test_fields.up,
    down: migration_20260110_112644_remove_test_fields.down,
    name: '20260110_112644_remove_test_fields',
  },
  {
    up: migration_20260110_112741_add_required_field.up,
    down: migration_20260110_112741_add_required_field.down,
    name: '20260110_112741_add_required_field',
  },
  {
    up: migration_20260111_121506_create_orders.up,
    down: migration_20260111_121506_create_orders.down,
    name: '20260111_121506_create_orders',
  },
  {
    up: migration_20260111_121541_remove_clients.up,
    down: migration_20260111_121541_remove_clients.down,
    name: '20260111_121541_remove_clients',
  },
  {
    up: migration_20260112_124240_survey_responses.up,
    down: migration_20260112_124240_survey_responses.down,
    name: '20260112_124240_survey_responses',
  },
  {
    up: migration_20260112_161045_survey_adjustments.up,
    down: migration_20260112_161045_survey_adjustments.down,
    name: '20260112_161045_survey_adjustments',
  },
  {
    up: migration_20260113_102117_shopify_order_id_as_primary_key.up,
    down: migration_20260113_102117_shopify_order_id_as_primary_key.down,
    name: '20260113_102117_shopify_order_id_as_primary_key',
  },
  {
    up: migration_20260113_170000_add_linked_internal_order.up,
    down: migration_20260113_170000_add_linked_internal_order.down,
    name: '20260113_170000_add_linked_internal_order',
  },
  {
    up: migration_20260122_201205_add_user_role.up,
    down: migration_20260122_201205_add_user_role.down,
    name: '20260122_201205_add_user_role',
  },
  {
    up: migration_20260125_191732_remove_fixed_price_label.up,
    down: migration_20260125_191732_remove_fixed_price_label.down,
    name: '20260125_191732_remove_fixed_price_label',
  },
  {
    up: migration_20260126_140530_add_poster_to_video_.up,
    down: migration_20260126_140530_add_poster_to_video_.down,
    name: '20260126_140530_add_poster_to_video_',
  },
  {
    up: migration_20260127_152042_add_survey_content_global.up,
    down: migration_20260127_152042_add_survey_content_global.down,
    name: '20260127_152042_add_survey_content_global',
  },
  {
    up: migration_20260127_155319_add_discount_percentage.up,
    down: migration_20260127_155319_add_discount_percentage.down,
    name: '20260127_155319_add_discount_percentage',
  },
  {
    up: migration_20260129_095104_add_contact_content.up,
    down: migration_20260129_095104_add_contact_content.down,
    name: '20260129_095104_add_contact_content'
  },
];
