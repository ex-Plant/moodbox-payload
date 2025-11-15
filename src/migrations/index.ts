import * as migration_20251115_151233_add_project_budget_and_stage_options from './20251115_151233_add_project_budget_and_stage_options';

export const migrations = [
  {
    up: migration_20251115_151233_add_project_budget_and_stage_options.up,
    down: migration_20251115_151233_add_project_budget_and_stage_options.down,
    name: '20251115_151233_add_project_budget_and_stage_options'
  },
];
