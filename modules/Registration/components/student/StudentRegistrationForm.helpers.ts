import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TStudentRegistrationFormData } from "./StudentRegistrationForm.types";

const educationLevelEnum = z.enum(["School", "College", "University"]);
const degreeTypeEnum = z.enum(["Bachelors", "Masters"]);

export const studentRegistrationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.string().min(1, "Gender is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    educationLevel: educationLevelEnum,
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    englishBanglaMedium: z.string().optional(),
    class: z.string().optional(),
    degreeType: degreeTypeEnum.optional(),
    degreeName: z.string().optional(),
    semesterYear: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.educationLevel === "School" || data.educationLevel === "College") {
      if (!data.class) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["class"],
          message: "Class is required for School or College",
        });
      }
      if (!data.englishBanglaMedium) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["englishBanglaMedium"],
          message: "Medium is required for School or College",
        });
      }
    }

    if (data.educationLevel === "University") {
      if (!data.degreeType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["degreeType"],
          message: "Degree type is required for University",
        });
      }
      if (!data.degreeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["degreeName"],
          message: "Degree name is required for University",
        });
      }
      if (!data.semesterYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["semesterYear"],
          message: "Semester/Year is required for University",
        });
      }
    }
  });

export const StudentRegistrationSchemaResolver = zodResolver(studentRegistrationSchema);

export const defaultValues: TStudentRegistrationFormData = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phoneNumber: "",
  address: "",
  educationLevel: undefined,
  password: "",
  confirmPassword: "",
  englishBanglaMedium: undefined,
  class: undefined,
  degreeType: undefined,
  degreeName: undefined,
  semesterYear: undefined,
};
