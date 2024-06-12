import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/lib/auth/utils";
import { cookies } from "next/headers";
import { env } from "@/env";
export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });
  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
  });
  cookies().set("google_code_verifier", codeVerifier, {
    secure: env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
  });

  return Response.redirect(url);
}
