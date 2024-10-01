import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordFormResolver = zodResolver(resetPasswordSchema);
