"use server";

import { db } from "@/lib/db";
import { userTable, verificationTable } from "@/lib/db/schema";
import { signUpSchema, signupType } from "@/lib/schema.ts";
import { eq } from "drizzle-orm";
import { scrypt } from "@/lib/auth/utils";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { SendVerificationCode } from "@/lib/mail/sendVerificationToken";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
export const signupAction = async (data: signupType) => {
  const parsedData = signUpSchema.safeParse(data);
  if (parsedData.error) {
    return { error: parsedData.error };
  }
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, data.username));
  if (existingUser.length !== 0) {
    return { error: "Account already exists" };
  }
  const hashedPassword = await scrypt.hash(data.password);
  const userId = generateIdFromEntropySize(10);
  const newUser = (
    await db
      .insert(userTable)
      .values({
        id: userId,
        email: data.email,
        username: data.username,
        password: hashedPassword,
      })
      .returning({ username: userTable.username, email: userTable.email })
  )[0];
  await SendVerificationCode({
    id: userId,
    email: newUser.email!,
    username: newUser.username!,
    purpose: "verification code for verifying account",
  });
  return redirect(
    `/auth/verifyaccount?username=${newUser.username?.replace(" ", "+")}`
  );
};

export const verifyAccountAction = async (code: string, username: string) => {
  const currentUser = (
    await db.select().from(userTable).where(eq(userTable.username, username))
  )[0];
  if (!currentUser) {
    return { error: "User not found" };
  }
  const userCode = (
    await db
      .select()
      .from(verificationTable)
      .where(eq(verificationTable.userId, currentUser.id))
  )[0];
  if (userCode.verificationCode !== code) {
    return { error: "Invalid code" };
  }
  await db
    .delete(verificationTable)
    .where(eq(verificationTable.id, userCode.id));
  const session = await lucia.createSession(currentUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};
