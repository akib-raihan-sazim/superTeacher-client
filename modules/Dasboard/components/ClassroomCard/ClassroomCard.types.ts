import { Teacher } from "../ClassroomCardList/ClassroomCardList.types";

export interface ClassroomCardProps {
  classroom: {
    id: number;
    title: string;
    subject: string;
    classTime: string;
    createdAt: string;
    updatedAt: string;
    days: string[];
    teacher: Teacher;
  };
}
