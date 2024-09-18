import { IUser } from "../enrollments/enrollments.types";

export interface IMessage {
  id: number;
  content: string;
  attachmentURL?: string;
  sender: IUser;
  classroomId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageDto {
  content: string;
  attachmentURL?: string;
  classroomId: number;
}
