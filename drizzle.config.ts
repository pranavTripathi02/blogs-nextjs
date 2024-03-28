import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/db/schema/*",
  driver: "pg",
  out: "./drizzle/migrations/",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  verbose: true,
} satisfies Config;
