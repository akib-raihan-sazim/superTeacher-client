import { Classroom } from "@/modules/Dasboard/components/ClassroomCardList/ClassroomCardList.types";

export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IPeopleLayoutProps {
  students: IStudent[];
  classroom: Classroom;
}
