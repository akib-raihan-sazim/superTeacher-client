import { ITeacherFormValues } from "@/modules/Registration/components/teacher/TeacherRegistrationForm.helpers";

export type TLoginRequestFields = {
  email: string;
  password: string;
};

export enum EUserRole {
  ADMIN = "ADMIN",
  SUPER_USER = "SUPER_USER",
}

export type TTokenizedUser = {
  id: number;
  claim: EUserRole;
  email: string;
  claimId: number;
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
  accessToken: string;
  user: TTokenizedUser;
};

export type TTeacherRegistrationFields = Omit<ITeacherFormValues, "confirmPassword"> & {
  userType?: "teacher";
};

export type TTeacher = {
  id: number;
  createdAt: string;
  updatedAt: string;
  highestEducationLevel: string;
  majorSubject: string;
  subjectsToTeach: string[];
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
  };
};

export type TTeacherRegistrationResponse = {
  teacher: TTeacher;
  token: string;
  codeUsage: number;
};
