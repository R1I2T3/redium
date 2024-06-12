import { lucia } from "@/lib/auth";
import { google } from "@/lib/auth/utils";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/lib/db";
import { GoogleUserTable, userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const code_verifier = cookies().get("google_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    !code_verifier ||
    state !== storedState
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, code_verifier);
    const googleResponse = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.accessToken}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await googleResponse.json();

    const existingUser = (
      await db
        .select()
        .from(GoogleUserTable)
        .where(eq(GoogleUserTable.google_id, googleUser.sub))
    )[0];

    if (existingUser) {
      const session = await lucia.createSession(existingUser.userId!, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateIdFromEntropySize(10);
    await db.insert(userTable).values({
      username: googleUser.email.slice(0, googleUser.email.indexOf("@")),
      id: userId,
    });
    await db.insert(GoogleUserTable).values({
      google_id: googleUser.sub,
      userId,
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.log(e);

    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  email: string;
}
