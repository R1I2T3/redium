import { Scrypt } from "lucia";
import { GitHub, Google } from "arctic";
import { env } from "@/env";
export const scrypt = new Scrypt();
export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET
);
export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL
);
