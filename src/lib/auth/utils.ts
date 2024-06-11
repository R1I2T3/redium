import { Scrypt } from "lucia";
import { GitHub, Google } from "arctic";
import { env } from "@/env";
export const scrypt = new Scrypt();
export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET
);
export const google = new Google(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URL
);
