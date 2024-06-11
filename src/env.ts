import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_ID: z.string().min(1),
    NODE_ENV: z.string().min(1),
    EMAIL_USERNAME: z.string().email(),
    EMAIL_PASSWORD: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DB_URL,
    DATABASE_ID: process.env.DB_ID,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
});
