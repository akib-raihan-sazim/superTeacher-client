export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

export interface IStudent {
  id: number;
  user: IUser;
}

export interface IEnrollment {
  id: number;
  student: IStudent;
}
