import { Effect } from "effect"
import type { DatabaseMigration } from "../migration"

export default {
  id: "20261010162916_work-saved-state",
  up(tx) {
    return Effect.gen(function* () {
      yield* tx.run(`
        CREATE TABLE \`work_permission\` (
          \`id\` text PRIMARY KEY,
          \`directory\` text NOT NULL,
          \`permission\` text NOT NULL,
          \`pattern\` text NOT NULL,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL
        );
      `)
      yield* tx.run(`
        CREATE TABLE \`work_resume\` (
          \`session_id\` text PRIMARY KEY,
          \`owner_pid\` integer NOT NULL,
          \`time_created\` integer NOT NULL,
          \`time_updated\` integer NOT NULL
        );
      `)
      yield* tx.run(
        `CREATE UNIQUE INDEX \`work_permission_rule_idx\` ON \`work_permission\` (\`directory\`,\`permission\`,\`pattern\`);`,
      )
    })
  },
} satisfies DatabaseMigration.Migration
