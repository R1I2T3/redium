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

export const LoginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(6, "wrong hashedPassword"),
});

export type LoginType = z.infer<typeof LoginSchema>;

const FileSchema = z
  .custom<File>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "File must be image"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2 mb");
export const CreateBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  coverImage: FileSchema,
  blog: z.string().min(1, "Required"),
});

export type CreateBlogType = z.infer<typeof CreateBlogSchema>;

export const UpdateBlogSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  coverImage: FileSchema.optional(),
  blog: z.string().min(1, "Required").optional(),
});

export type UpdateBlogType = z.infer<typeof UpdateBlogSchema>;
