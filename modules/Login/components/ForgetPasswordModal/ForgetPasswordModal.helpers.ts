import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters long" }),
});

export const passwordSchema = z
  .object({
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TEmailFormValues = z.infer<typeof emailSchema>;
export type TOtpFormValues = z.infer<typeof otpSchema>;
export type TPasswordFormValues = z.infer<typeof passwordSchema>;
