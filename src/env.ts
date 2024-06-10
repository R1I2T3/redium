import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_ID: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DB_URL,
    DATABASE_ID: process.env.DB_ID,
  },
});
