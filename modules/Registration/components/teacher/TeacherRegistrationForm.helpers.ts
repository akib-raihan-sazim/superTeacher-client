import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const TeacherFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(255, { message: "First name must be at most 255 characters" }),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(255, { message: "Last name must be at most 255 characters" }),
    gender: z
      .string()
      .min(1, "Gender is required")
      .nullish()
      .transform((value, ctx): string => {
        if (value === null)
          ctx.addIssue({
            code: "custom",
            message: "Gender is required",
          });

        return value as string;
      }),
    majorSubject: z.string().min(1, "Major subject is required"),
    highestEducationLevel: z
      .string()
      .min(1, "Highest education level is required")
      .nullish()
      .transform((value, ctx): string => {
        if (value === null)
          ctx.addIssue({
            code: "custom",
            message: "Highest education level is required",
          });

        return value as string;
      }),
    subjectsToTeach: z
      .array(z.string())
      .min(1, { message: "At least one subject to teach is required" }),
    email: z
      .string()
      .email("Invalid email")
      .min(1, "Email is required")
      .max(255, { message: "Email must be at most 255 characters" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const TeacherRegistrationSchemaResolver = zodResolver(TeacherFormSchema);

export interface ITeacherFormValues {
  code?: string;
  email: string;
  password: string;
  confirmPassword: string;
  majorSubject: string;
  highestEducationLevel: string;
  subjectsToTeach: string[];
  gender: string;
  firstName: string;
  lastName: string;
}

export const TeacherRegistrationFormInitialValues: ITeacherFormValues = {
  code: "",
  email: "",
  password: "",
  confirmPassword: "",
  majorSubject: "",
  highestEducationLevel: "",
  subjectsToTeach: [],
  gender: "",
  firstName: "",
  lastName: "",
};
