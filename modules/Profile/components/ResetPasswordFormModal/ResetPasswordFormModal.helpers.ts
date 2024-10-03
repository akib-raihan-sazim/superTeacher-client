import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character (!@#$%^&*)"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character (!@#$%^&*)"),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordFormResolver = zodResolver(resetPasswordSchema);
