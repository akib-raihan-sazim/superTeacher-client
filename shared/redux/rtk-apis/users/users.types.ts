import { EEducationLevel } from "@/shared/typedefs";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  userType: string;
  teacher?: ITeacher;
  student?: IStudent;
}

export interface IStudent {
  id: number;
  educationLevel: EEducationLevel;
  phoneNo: string;
  address: string;
  medium?: string;
  class?: string;
  degree?: string;
  degreeName?: string;
  semester?: string;
}

export interface ITeacher {
  id: number;
  highestEducationLevel: string;
  majorSubject: string;
  subjectsToTeach: string[];
}

export interface EditableUserFields {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  student?: Omit<IStudent, "id">;
  teacher?: Omit<ITeacher, "id">;
}
