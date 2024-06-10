import type { Config } from "drizzle-kit";
import { env } from "@/env";
export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_ID,
  },
} satisfies Config;
