import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IUser } from "@/shared/redux/rtk-apis/users/users.types";
import { EEducationLevel } from "@/shared/typedefs";

const bangladeshPhoneRegex = /^01[3-9]\d{8}$/;

const educationLevelEnum = z.enum(["school", "college", "university"]);
const degreeTypeEnum = z.enum(["Bachelors", "Masters", ""]);

export const StudentUpdateProfileFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.string().min(1, "Gender is required"),
    email: z.string().email("Invalid email"),
    phoneNo: z
      .string()
      .min(1, "Phone number is required")
      .regex(bangladeshPhoneRegex, "Invalid phone number"),
    address: z.string().min(1, "Address is required"),
    educationLevel: educationLevelEnum,
    medium: z.string().optional(),
    class: z.string().optional(),
    degree: degreeTypeEnum.optional(),
    degreeName: z.string().optional(),
    semester: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.educationLevel === "school" || data.educationLevel === "college") {
      if (!data.class) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["class"],
          message: "Class is required for School or College",
        });
      }
      if (!data.medium) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["medium"],
          message: "Medium is required for School or College",
        });
      }
    }

    if (data.educationLevel === "university") {
      if (!data.degree) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["degree"],
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
      if (!data.semester) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["semester"],
          message: "Semester/Year is required for University",
        });
      }
    }
  });

export type StudentProfileFormValues = z.infer<typeof StudentUpdateProfileFormSchema>;

export const studentUpdateProfileFormResolver = zodResolver(StudentUpdateProfileFormSchema);

export const getDefaultValues = (user: IUser): StudentProfileFormValues => ({
  email: user.email,
  gender: user.gender,
  firstName: user.firstName,
  lastName: user.lastName,
  address: user.student?.address || "",
  phoneNo: user.student?.phoneNo || "",
  educationLevel: (user.student?.educationLevel as EEducationLevel) || "",
  medium: user.student?.medium || "",
  class: user.student?.class || "",
  degree: user.student?.degree as "Bachelors" | "Masters" | "",
  degreeName: user.student?.degreeName || "",
  semester: user.student?.semester || "",
});

export interface UserUpdateDTO {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  student: {
    educationLevel: EEducationLevel;
    phoneNo: string;
    address: string;
    medium?: string;
    class?: string;
    degree?: "Bachelors" | "Masters" | "";
    degreeName?: string;
    semester?: string;
  };
}

export const createUserUpdateDTO = (formData: StudentProfileFormValues): UserUpdateDTO => ({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  gender: formData.gender,
  student: {
    educationLevel: formData.educationLevel as EEducationLevel,
    phoneNo: formData.phoneNo,
    address: formData.address,
    ...(formData.educationLevel === "school" || formData.educationLevel === "college"
      ? { medium: formData.medium, class: formData.class }
      : { degree: formData.degree, degreeName: formData.degreeName, semester: formData.semester }),
  },
});
