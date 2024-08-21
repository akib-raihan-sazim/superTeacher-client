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
