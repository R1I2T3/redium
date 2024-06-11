import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.string().min(1, "email is required").email(),
  password: z.string().min(6, "password must be at least 6 letters"),
});
export type signupType = z.infer<typeof signUpSchema>;

export const verificationCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Wrong verification code")
    .max(6, "Wrong verification code"),
});

export type verificationCodeType = z.infer<typeof verificationCodeSchema>;
