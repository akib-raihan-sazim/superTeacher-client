import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IUser } from "@/shared/redux/rtk-apis/users/users.types";

export const TeacherUpdateProfileFormSchema = z.object({
  email: z.string().email("Invalid email address"),
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  majorSubject: z.string().min(1, "Major subject is required"),
  highestEducationLevel: z.string(),
  subjectsToTeach: z.array(z.string()).min(1, "Select at least one subject to teach"),
});

export type TeacherProfileFormValues = z.infer<typeof TeacherUpdateProfileFormSchema>;

export const TeacherUpdateProfileFormResolver = zodResolver(TeacherUpdateProfileFormSchema);

export interface TeacherUpdateDTO {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  teacher: {
    majorSubject: string;
    highestEducationLevel: string;
    subjectsToTeach: string[];
  };
}

export const getDefaultValues = (user: IUser): TeacherProfileFormValues => ({
  email: user.email,
  gender: user.gender,
  firstName: user.firstName,
  lastName: user.lastName,
  majorSubject: user.teacher?.majorSubject || "",
  highestEducationLevel: user.teacher?.highestEducationLevel || "",
  subjectsToTeach: user.teacher?.subjectsToTeach || [],
});

export const createTeacherUpdateDTO = (formData: TeacherProfileFormValues): TeacherUpdateDTO => ({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  gender: formData.gender,
  teacher: {
    majorSubject: formData.majorSubject,
    highestEducationLevel: formData.highestEducationLevel,
    subjectsToTeach: formData.subjectsToTeach,
  },
});
