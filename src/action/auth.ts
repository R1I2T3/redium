"use server";

import { db } from "@/lib/db";
import { userTable, verificationTable } from "@/lib/db/schema";
import { LoginType, signUpSchema, signupType } from "@/lib/schema.ts";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { SendVerificationCode } from "@/lib/mail/sendVerificationToken";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { scrypt } from "@/lib/auth/utils";
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
  await db
    .update(userTable)
    .set({ isVerified: true })
    .where(eq(userTable.id, currentUser.id));
  const session = await lucia.createSession(currentUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};

export const LoginAction = async (data: LoginType) => {
  const currentUser = (
    await db.select().from(userTable).where(eq(userTable.email, data.email))
  )[0];
  if (!currentUser) {
    return { error: "Invalid credentials" };
  }
  const isPasswordCorrect = await scrypt.verify(
    currentUser.password!,
    data.password
  );
  if (!isPasswordCorrect) {
    return { error: "Invalid credentials" };
  }
  if (!currentUser.isVerified) {
    await db
      .delete(verificationTable)
      .where(eq(verificationTable.userId, currentUser.id));
    await SendVerificationCode({
      id: currentUser.id,
      email: currentUser.email!,
      username: currentUser.username!,
      purpose: "verification code for verifying account",
    });
    return redirect(
      `/auth/verifyaccount?username=${currentUser.username?.replace(" ", "+")}`
    );
  }
  const session = await lucia.createSession(currentUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};
