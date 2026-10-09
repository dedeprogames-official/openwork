import { Effect } from "effect"
import type { DatabaseMigration } from "../migration"

export default {
  id: "20261008204355_work",
  up(tx) {
    return Effect.gen(function* () {
      yield* tx.run(`
        CREATE TABLE \`work_agenda\` (
          \`id\` text PRIMARY KEY,
          \`title\` text NOT NULL,
          \`starts_at\` integer NOT NULL,
          \`ends_at\` integer,
          \`space_id\` text,
          \`note\` text,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL,
          CONSTRAINT \`fk_work_agenda_space_id_work_space_id_fk\` FOREIGN KEY (\`space_id\`) REFERENCES \`work_space\`(\`id\`) ON DELETE SET NULL
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_deployment\` (
          \`id\` text PRIMARY KEY,
          \`space_id\` text,
          \`title\` text NOT NULL,
          \`task\` text NOT NULL,
          \`directory\` text NOT NULL,
          \`agent\` text NOT NULL,
          \`model\` text,
          \`skill\` text,
          \`schedule\` text NOT NULL,
          \`access\` text NOT NULL,
          \`status\` text NOT NULL,
          \`next_run_at\` integer,
          \`last_run_at\` integer,
          \`run_requested_at\` integer,
          \`run_count\` integer DEFAULT 0 NOT NULL,
          \`chat_session_id\` text,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL,
          CONSTRAINT \`fk_work_deployment_space_id_work_space_id_fk\` FOREIGN KEY (\`space_id\`) REFERENCES \`work_space\`(\`id\`) ON DELETE SET NULL
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_memory\` (
          \`id\` text PRIMARY KEY,
          \`content\` text NOT NULL,
          \`source\` text,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_message\` (
          \`id\` text PRIMARY KEY,
          \`deployment_id\` text,
          \`run_id\` text,
          \`session_id\` text,
          \`title\` text NOT NULL,
          \`body\` text NOT NULL,
          \`priority\` text NOT NULL,
          \`time_read\` integer,
          \`time_done\` integer,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL,
          CONSTRAINT \`fk_work_message_deployment_id_work_deployment_id_fk\` FOREIGN KEY (\`deployment_id\`) REFERENCES \`work_deployment\`(\`id\`) ON DELETE SET NULL
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_run\` (
          \`id\` text PRIMARY KEY,
          \`deployment_id\` text NOT NULL,
          \`number\` integer NOT NULL,
          \`status\` text NOT NULL,
          \`trigger\` text NOT NULL,
          \`owner_pid\` integer,
          \`session_id\` text,
          \`summary\` text,
          \`error\` text,
          \`tokens_input\` integer DEFAULT 0 NOT NULL,
          \`tokens_output\` integer DEFAULT 0 NOT NULL,
          \`tokens_reasoning\` integer DEFAULT 0 NOT NULL,
          \`tokens_cache_read\` integer DEFAULT 0 NOT NULL,
          \`tokens_cache_write\` integer DEFAULT 0 NOT NULL,
          \`cost\` real DEFAULT 0 NOT NULL,
          \`provider_id\` text,
          \`model_id\` text,
          \`time_started\` integer NOT NULL,
          \`time_finished\` integer,
          CONSTRAINT \`fk_work_run_deployment_id_work_deployment_id_fk\` FOREIGN KEY (\`deployment_id\`) REFERENCES \`work_deployment\`(\`id\`) ON DELETE CASCADE
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_setting\` (
          \`key\` text PRIMARY KEY,
          \`value\` text NOT NULL,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_space\` (
          \`id\` text PRIMARY KEY,
          \`name\` text NOT NULL,
          \`goal\` text,
          \`color\` text NOT NULL,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_todo\` (
          \`id\` text PRIMARY KEY,
          \`content\` text NOT NULL,
          \`source\` text,
          \`deployment_id\` text,
          \`position\` integer NOT NULL,
          \`time_done\` integer,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL,
          CONSTRAINT \`fk_work_todo_deployment_id_work_deployment_id_fk\` FOREIGN KEY (\`deployment_id\`) REFERENCES \`work_deployment\`(\`id\`) ON DELETE SET NULL
        );
      `)
      yield* tx.run(`CREATE INDEX \`work_agenda_starts_idx\` ON \`work_agenda\` (\`starts_at\`);`)
      yield* tx.run(`CREATE INDEX \`work_deployment_due_idx\` ON \`work_deployment\` (\`status\`,\`next_run_at\`);`)
      yield* tx.run(`CREATE INDEX \`work_run_deployment_idx\` ON \`work_run\` (\`deployment_id\`,\`number\`);`)
      yield* tx.run(`CREATE INDEX \`work_run_started_idx\` ON \`work_run\` (\`time_started\`);`)
    })
  },
} satisfies DatabaseMigration.Migration
