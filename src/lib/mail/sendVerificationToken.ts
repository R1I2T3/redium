import nodemailer from "nodemailer";
import { env } from "@/env";
import { render } from "@react-email/render";
import VerificationEmail from "./EmailTemplate";
import { db } from "../db";
import { verificationTable } from "../db/schema";

interface VerificationParameters {
  id: string;
  email: string;
  username: string;
  db_purpose: string;
  purpose: string;
}
export async function SendVerificationCode({
  id,
  username,
  email,
  purpose,
  db_purpose,
}: VerificationParameters) {
  const otp = (
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  ).toString();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  });
  const emailHtml = render(VerificationEmail({ username, purpose, otp }));
  const info = await transporter.sendMail({
    from: env.EMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: "Verification Code", // Subject line
    html: emailHtml,
  });
  await db.insert(verificationTable).values({
    purpose: db_purpose,
    verificationCode: otp,
    userId: id,
    expiry: new Date(Date.now() + 2 * (60 * 60 * 1000)).toString(),
  });
}
