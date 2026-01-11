import * as migration_20260109_190321_initial_setup from './20260109_190321_initial_setup';
import * as migration_20260110_110904_local_test_migration from './20260110_110904_local_test_migration';
import * as migration_20260110_111500_fix_missing_test_column from './20260110_111500_fix_missing_test_column';
import * as migration_20260110_112644_remove_test_fields from './20260110_112644_remove_test_fields';
import * as migration_20260110_112741_add_required_field from './20260110_112741_add_required_field';

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
    name: '20260110_112741_add_required_field'
  },
];
