import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema/*",
  driver: "better-sqlite",
  out: "./src/server/db/drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
} satisfies Config;
