"use server";

import { db } from "@/lib/db";
import {
  EmailPasswordTable,
  userTable,
  verificationTable,
} from "@/lib/db/schema";
import { LoginType, signUpSchema, signupType } from "@/lib/schema.ts";
import { and, eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { SendVerificationCode } from "@/lib/mail/sendVerificationToken";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { scrypt } from "@/lib/auth/utils";
import { env } from "@/env";

export const signupAction = async (data: signupType) => {
  const parsedData = signUpSchema.safeParse(data);
  if (parsedData.error) {
    return { error: "invalid data provided" };
  }
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, data.username));
  console.log(existingUser);

  if (existingUser.length !== 0) {
    return { error: "Account already exists" };
  }
  console.log("I am here");

  const hashedPassword = await scrypt.hash(data.password);
  const userId = generateIdFromEntropySize(10);
  const newUser = (
    await db
      .insert(userTable)
      .values({
        id: userId,
        username: data.username,
      })
      .returning({ username: userTable.username })
  )[0];

  await db
    .insert(EmailPasswordTable)
    .values({ password: hashedPassword, email: data.email, userId });
  await SendVerificationCode({
    id: userId,
    email: data.email!,
    db_purpose: "verify_account",
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
    .update(EmailPasswordTable)
    .set({ isVerified: true })
    .where(eq(EmailPasswordTable.userId, currentUser.id));
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
    await db
      .select()
      .from(EmailPasswordTable)
      .where(eq(EmailPasswordTable.email, data.email))
      .innerJoin(userTable, eq(userTable.id, EmailPasswordTable.userId))
  )[0];
  if (!currentUser) {
    return { error: "Invalid credentials" };
  }
  const isPasswordCorrect = await scrypt.verify(
    currentUser.email_user.password!,
    data.password
  );
  if (!isPasswordCorrect) {
    return { error: "Invalid credentials" };
  }
  if (!currentUser.email_user.isVerified) {
    await db
      .delete(verificationTable)
      .where(eq(verificationTable.userId, currentUser.email_user.userId!));
    await SendVerificationCode({
      id: currentUser.email_user.userId!,
      email: currentUser.email_user.email!,
      username: currentUser.users.username!,
      purpose: "verification code for verifying account",
      db_purpose: "verify_account",
    });
    return redirect(
      `/auth/verifyaccount?username=${currentUser.users.username?.replace(
        " ",
        "+"
      )}`
    );
  }
  const session = await lucia.createSession(currentUser.email_user.userId!, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};

export const SendForgotPasswordEmailAction = async (email: string) => {
  const isUserPresent = (
    await db
      .select()
      .from(EmailPasswordTable)
      .where(eq(EmailPasswordTable.email, email))
      .innerJoin(userTable, eq(userTable.id, EmailPasswordTable.userId))
  )[0];
  if (!isUserPresent) {
    return { error: "Account not found" };
  }
  await SendVerificationCode({
    id: isUserPresent.users.id,
    username: isUserPresent.users.username!,
    email: isUserPresent.email_user.email,
    purpose: "your otp for forgot password",
    db_purpose: "forgot_password",
  });
  return redirect(
    `/auth/forgot-password/verifyotp?username=${isUserPresent.users.username?.replaceAll(
      " ",
      "+"
    )}`
  );
};

export const VerifyForgotPasswordAction = async (
  code: string,
  username: string
) => {
  const currentUserOtp = (
    await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .innerJoin(
        verificationTable,
        and(
          eq(verificationTable.purpose, "forgot_password"),
          eq(verificationTable.userId, userTable.id)
        )
      )
  )[0];
  if (!currentUserOtp) {
    return { error: "User not found" };
  }
  if (currentUserOtp.verification_codes.verificationCode !== code) {
    return { error: "Please Provide correct code" };
  }
  const forgot_password_cookie = { username, userId: currentUserOtp.users.id };
  cookies().set(
    "forgot_password_cookie",
    JSON.stringify(forgot_password_cookie),
    {
      secure: env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
    }
  );
  await db
    .delete(verificationTable)
    .where(
      and(
        eq(verificationTable.userId, currentUserOtp.users.id),
        eq(verificationTable.purpose, "forgot_password")
      )
    );
  return redirect("/auth/forgot-password/new_password");
};

export const CreateNewPasswordAction = async (newPassword: string) => {
  const forgot_password_cookie = cookies().get("forgot_password_cookie");
  if (!forgot_password_cookie) {
    return { error: "You are not authorized for this task" };
  }
  const cookieDetails = JSON.parse(forgot_password_cookie.value);
  const EmailUser = (
    await db
      .select()
      .from(EmailPasswordTable)
      .where(eq(EmailPasswordTable.userId, cookieDetails.userId))
  )[0];
  if (!EmailUser) {
    return { error: "Invalid cookie" };
  }
  const newHashedPassword = await scrypt.hash(newPassword);
  await db
    .update(EmailPasswordTable)
    .set({ password: newHashedPassword })
    .where(eq(EmailPasswordTable.userId, EmailUser.userId!));
  return redirect("/auth/login");
};
