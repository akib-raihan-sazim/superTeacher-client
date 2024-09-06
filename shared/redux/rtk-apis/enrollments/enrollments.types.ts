export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IStudent {
  id: number;
  user: IUser;
}

export interface IEnrollment {
  id: number;
  student: IStudent;
}
