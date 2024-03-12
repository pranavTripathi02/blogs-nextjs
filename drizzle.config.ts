import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/db/schema/*",
  driver: "better-sqlite",
  out: "./src/db/drizzle/",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
} satisfies Config;
