import { IUser } from "../enrollments/enrollments.types";

export interface IMessage {
  id: number;
  content: string;
  attachmentUrl?: string;
  sender: IUser;
  classroomId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageDto {
  content: string;
  classroomId: number;
  file?: File;
}
