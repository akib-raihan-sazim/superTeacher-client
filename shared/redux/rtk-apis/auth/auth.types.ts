import { ITeacherFormValues } from "@/modules/Registration/components/teacher/TeacherRegistrationForm.helpers";

export type TLoginRequestFields = {
  email: string;
  password: string;
};

export enum EUserRole {
  STUDENT = "student",
  TEACHER = "teacher",
}

export type TTokenizedUser = {
  id: number;
  firstName: string;
  email: string;
  userType: EUserRole;
};

export type TLoginResponse = {
  accessToken: string;
  user: TTokenizedUser;
};

export type TStudentRegistrationFields = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
  educationLevel?: "school" | "college" | "university";
  password: string;
  medium?: string;
  class?: string;
  degreeType?: "Bachelors" | "Masters";
  degreeName?: string;
  semesterYear?: string;
  userType?: string;
};

export type TStudentRegistrationResponse = {
  token: string;
  user: TTokenizedUser;
};

export type TTeacherRegistrationFields = Omit<ITeacherFormValues, "confirmPassword"> & {
  userType?: "teacher";
};

export type TUser = {
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  student: null | number;
  teacher: null | number;
  id: number;
};

export type TTeacherRegistrationResponse = {
  user: TUser;
  token: string;
};

export interface ILoginResponse {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    student: number | null;
    teacher: number | null;
  };
  token: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export type TGenerateOtpResponse = string;
export type TResetPasswordResponse = boolean;
